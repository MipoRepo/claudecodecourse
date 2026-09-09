# Liite B: Esimerkkiprojektin täydellinen rakenne

## Projekti: claude-code-lab

```
claude-code-lab/
├── CLAUDE.md
├── .mcp.json
├── .worktreeinclude
├── .claude/
│   ├── settings.json
│   ├── settings.local.json
│   ├── agents/
│   │   ├── reviewer.md
│   │   ├── debugger.md
│   │   └── security-auditor.md
│   ├── skills/
│   │   ├── deploy/
│   │   │   └── SKILL.md
│   │   ├── incident-triage/
│   │   │   └── SKILL.md
│   │   └── done/
│   │       └── SKILL.md
│   └── hooks/
│       ├── protect-files.sh
│       ├── format.py
│       └── audit.py
├── src/
├── tests/
└── .github/
    └── workflows/
        └── ci.yml
```

## B.1 Esimerkin työnkulku

```bash
# 1. Discovery
claude --permission-mode plan

# 2. Feature isolation
claude --worktree feature-auth

# 3. Parallel review
claude --resume reviewer-session

# 4. Headless CI triage
cat build.log | claude -p "Return JSON triage" --output-format json

# 5. Ennen mergeä
/compact, /rewind jos tarpeen, sitten Git review + testit

# 6. Deploy vain käyttäjän laukaisemana
/deploy staging
```
