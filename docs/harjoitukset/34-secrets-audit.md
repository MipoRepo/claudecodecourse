# Harjoitus 34: Secrets audit -hook

!!! quote "Tavoite"
    Luoda **hook**, joka estää `cat .env`-tyyppiset komennot, ja **review-agentti**,
    joka tarkistaa uudet tiedostot tunnetuissa secret-malleissa.

## Taustaa

**Secretit** (salaisuudet) ovat usein koodin alaisena:

❌ API-avaimet kovakoodattuna  
❌ `.env`-tiedostoja ladotusta versioon  
❌ Base64-koodatut salaisuudet merkinnöinä

Auditin tarkoitus on **estää** ja **löytää** nämä turvallisuusriskit.

## Tehtävä

Luo kaksi turvallisuusmekanismia:

1. **Hook**, joka estää `cat .env`-tyyppiset komennot
2. **Review-agentti**, joka etsii secret-mallit uudista tiedostoista

---

## Ratkaisu

### 1. Hook: Estä secretien lukeminen

#### Tiedosto: `.claude/hooks/secret-guard.py`

```python
#!/usr/bin/env python3
"""Estää secretien lukemisen ja lähettämisen ulos."""
import json, sys, re

data = json.load(sys.stdin)
tool_name = data.get("tool_name", "")
tool_input = data.get("tool_input", {})

# Tarkistus 1: Bash-komennot, jotka lukevat .env-tiedostoja
if tool_name == "Bash":
    cmd = tool_input.get("command", "")
    forbidden_patterns = [
        r'cat\s+\.env',
        r'cat\s+config/secrets\.json',
        r'cat\s+.*\.env',
        r'echo.*\$SECRET',
        r'printenv\s+API_KEY',
    ]
    for pattern in forbidden_patterns:
        if re.search(pattern, cmd):
            print(json.dumps({
                "decision": "block",
                "reason": "Command may expose secrets"
            }))
            sys.exit(2)

# Tarkistus 2: Edit-komennot, jotka kirjoittavat tunnettuja patterneja
if tool_name in ("Edit", "Write"):
    content = tool_input.get("string_to_add", "")
    secret_patterns = [
        r'AKIA[0-9A-Z]{16}',       # AWS Access Key
        r'ghp_[a-zA-Z0-9]{36}',    # GitHub PAT
        r'sk-[a-zA-Z0-9]{20,}',    # OpenAI API key
        r'glpat-[a-zA-Z0-9\-]{20}', # GitLab PAT
    ]
    for pattern in secret_patterns:
        if re.search(pattern, content):
            print(json.dumps({
                "decision": "block",
                "reason": f"Secret pattern detected: {pattern}"
            }))
            sys.exit(2)

sys.exit(0)
```

#### Konfiguurointi: `.claude/settings.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ./.claude/hooks/secret-guard.py"
          }
        ]
      }
    ]
  }
}
```

### 2. Review-agentti: Etsi secretit

#### Tiedosto: `.claude/agents/security-auditor.md`

```yaml
---
name: security-auditor
description: Scan for hardcoded secrets and credential patterns in source code.
tools: Read, Grep, Glob
permissionMode: plan
---

## Secret scanning patterns:

1. **AWS Keys**: `AKIA[0-9A-Z]{16}`
2. **GitHub PAT**: `ghp_[a-zA-Z0-9]{36}`
3. **OpenAI Keys**: `sk-[a-zA-Z0-9]{20,}`
4. **Private Keys**: `-----BEGIN (RSA|EC|DSA|OPENSSH) PRIVATE KEY-----`
5. **Generic API keys**: `api_key\s*=\s*["'][^"']+["']`
```

### Esimerkkikäyttö

```bash
# Estetty komento:
$ cat .env
❌ BLOCKED: Command may expose secrets
```

```bash
# Estetty kirjoitus:
Edit src/config.js → "api_key = 'sk-abc123...'"
❌ BLOCKED: Secret pattern detected: sk-[a-zA-Z0-9]{20,}
```

!!! tip "ADVANCED-VINKKI 07"
    Käytä myös **Secret Scanningia CI:ssa**:
    ```bash
    gitleak protect --verbose
    ```
    tai
    ```bash
    trufflehog git file://.
    ```

---

*Lähde: Esimerkki 34 [S1]*
