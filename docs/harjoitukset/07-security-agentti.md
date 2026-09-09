# Harjoitus 07: Security-agentti

!!! quote "Tavoite"
    Luoda oma **security-auditor-sub-agentti**, joka etsii turvallisuusongelmia
    **ilman kirjoitusoikeuksia**.

## Taustaa

Turvallisuusauditointiin täydellinen sub-agentti on oma, joka:

- Ei kirjoita tiedostoja (estää vahingollisen muutoksen)
- Käyttää luku- ja hakutyökaluja
- Keskitytään: riippuvuus-kysymyksiin, autentikaatioon, input-validationiin, secret-vuotoihin

## Tehtävä

Luo `.claude/agents/security-auditor.md`, joka:

✅ Saa työkalut: `Read, Grep, Glob` (vain luku)  
✅ Ei saa: `Write, Edit, Bash`  
✅ Käytä mallia `sonnet`  
✅ Aseta `permissionMode: plan`

## Ratkaisu

### Tiedosto: `.claude/agents/security-auditor.md`

```yaml
---
name: security-auditor
description: Audit code for security vulnerabilities, secrets, and input validation issues.
tools: Read, Grep, Glob
model: sonnet
permissionMode: plan
---

You are a security-focused auditor.

Focus areas:
- Dependency vulnerabilities (check package.json, requirements.txt)
- Authentication and session management flaws
- Input validation issues (SQL injection, XSS)
- Hardcoded secrets or credentials
- MCP tool security (excessive permissions)

Report:
- Severity (Critical/High/Medium/Low)
- File:line reference
- Explanation
- Recommendation
```

### Esimerkkitulokset

```json
{
  "findings": [
    {
      "severity": "Critical",
      "file": "src/api/auth.js:15",
      "issue": "JWT secret on kovakoodattu",
      "code": "const JWT_SECRET = 'supersecret123'",
      "recommendation": "Käytä ympäristömuuttujaa JWT_SECRET"
    },
    {
      "severity": "High",
      "file": "src/db.js:42",
      "issue": "SQL-injection risk",
      "recommendation": "Käytä parameterized queries"
    }
  ]
}
```

### Miksi tämä on turvallinen?

| Elementti | Turvallisuusmekanismi |
|----------|----------------------|
| `tools: Read, Grep, Glob` | Ei voi kirjoittaa tiedostoja |
| `permissionMode: plan` | Estää Bash-komennot |
| `model: sonnet` | Korkea tarkkuus tunnistukseen |
| `description` semanttinen | Mallin päätöksenteossa saa tarkan kontekstin |

---

*Lähde: Esimerkki 07 [S1], [S3]*
