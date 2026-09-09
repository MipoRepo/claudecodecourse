# Harjoitukset: 35 käytäntöä Claude Codesta

!!! info
    Tämä sivu sisältää **35 itsenäistä harjoitusta**, jotka perustuvat PDF:n Liitteeseen D
    (Käytännön esimerkkien hakemisto). Jokaisessa harjoituksessa on **tehtävä** ja **ratkaisu**.

## Harjoitussarjat

| Sarja | Aihe | Harjoitukset |
|-------|------|-------------|
| **Perusteet** | Ensimmäinen käyttö, kontekstin seuranta, plan-moodi, headless | 01–04 |
| **Sub-agents** | Reviewer, debugger, security-agentti | 05–07 |
| **Skills** | Manuaalinen deploy, argumentit, incident-triage | 08–10 |
| **Hooks** | Formatointi, estä komennot, SessionStart | 11–13 |
| **MCP** | Issue tracker, observability, DB | 14–16 |
| **Sessions** | Riskialtis refaktorointi, bugfix, PR | 17–19 |
| **Worktrees** | Bugfix+feature, agentti, merge | 20–22 |
| **Headless CI** | CI triage, read-only, exit code | 23–25 |
| **Checkpoints** | Rikkinäinen build, säilytä keskustelu, palauta koodi | 26–28 |
| **CI/CD** | TDD, Definition of Done, Release | 29–32 |
| **Turvallisuus** | Production deploy, secrets audit, prompt injection | 33–35 |

---

## Kaikki harjoitukset

### 1. Johdanto & perusteet

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 01 | Ensimmäinen read-only työ | ⭐ Aloittelijan | [Avaa](01-read-only-tyo.md) |
| 02 | Kontekstin kulutuksen seuranta | ⭐⭐ Perus | [Avaa](02-kontekstin-seuranta.md) |
| 03 | Plan-mode analyysi | ⭐ Aloittelijan | [Avaa](03-plan-mode.md) |
| 04 | Headless-työkalut | ⭐⭐ Perus | [Avaa](04-headless-työkalut.md) |

### 2. Sub-agents

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 05 | Reviewer-agentti | ⭐⭐⭐ Edistynyt | [Avaa](05-reviewer-agentti.md) |
| 06 | Debugger-agentti | ⭐⭐⭐ Edistynyt | [Avaa](06-debugger-agentti.md) |
| 07 | Security-agentti | ⭐⭐⭐ Edistynyt | [Avaa](07-security-agentti.md) |

### 3. Skills

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 08 | Manuaalinen deploy | ⭐⭐ Perus | [Avaa](08-manual-deploy.md) |
| 09 | Skill-argumentit | ⭐⭐ Perus | [Avaa](09-skill-argumentit.md) |
| 10 | Incident triage skill | ⭐⭐⭐ Edistynyt | [Avaa](10-incident-triage.md) |

### 4. Hooks

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 11 | Formatoinnin hook | ⭐⭐ Perus | [Avaa](11-formatointi-hook.md) |
| 12 | Vaaralliset komennot | ⭐⭐⭐ Edistynyt | [Avaa](12-vaaralliset-komennot.md) |
| 13 | SessionStart + compact | ⭐⭐ Perus | [Avaa](13-sessionstart-compact.md) |

### 5. MCP

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 14 | MCP + issue tracker | ⭐⭐⭐ Edistynyt | [Avaa](14-mcp-issue-tracker.md) |
| 15 | MCP + observability | ⭐⭐⭐ Edistynyt | [Avaa](15-mcp-observability.md) |
| 16 | MCP + read-only DB | ⭐⭐⭐ Edistynyt | [Avaa](16-mcp-readonly-db.md) |

### 6. Sessions & Worktrees

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 17 | Riskialtis refaktorointi | ⭐⭐ Perus | [Avaa](17-riskialtis-refaktorointi.md) |
| 18 | Bugfix-session | ⭐ Perus | [Avaa](18-bugfix-session.md) |
| 19 | PR-sessio | ⭐⭐ Perus | [Avaa](19-pr-session.md) |
| 20 | Bugfix + feature rinnakkain | ⭐⭐ Perus | [Avaa](20-bugfix-feature-parallel.md) |
| 21 | Agenti worktree-eristys | ⭐⭐⭐ Edistynyt | [Avaa](21-agentti-worktree.md) |
| 22 | Worktreejen yhdistäminen | ⭐⭐ Perus | [Avaa](22-worktree-merge.md) |

### 7. Headless CI

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 23 | CI build failure triage | ⭐⭐⭐ Edistynyt | [Avaa](23-ci-triage.md) |
| 24 | Read-only pipeline | ⭐⭐ Perus | [Avaa](24-read-only-pipeline.md) |
| 25 | Exit code -ajattelu | ⭐⭐⭐ Edistynyt | [Avaa](25-exit-code.md) |

### 8. Checkpoints

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 26 | Rikkinäinen build | ⭐ Perus | [Avaa](26-rikkinäinen-build.md) |
| 27 | Säilytä keskustelu | ⭐ Perus | [Avaa](27-säilytä-keskustelu.md) |
| 28 | Palauta vain koodi | ⭐ Perus | [Avaa](28-palauta-vain-koodi.md) |

### 9. CI/CD & parhaat käytännöt

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 29 | TDD työskentely | ⭐⭐⭐ Edistynyt | [Avaa](29-tdd.md) |
| 30 | Definition of Done | ⭐⭐ Perus | [Avaa](30-definition-of-done.md) |
| 31 | Review gate | ⭐⭐ Perus | [Avaa](31-review-gate.md) |
| 32 | Release pipeline | ⭐⭐⭐ Edistynyt | [Avaa](32-release-pipeline.md) |

### 🔐 10. Turvallisuus

| Nro | Nimi | Taso | Linkki |
|-----|------|------|--------|
| 33 | Turvallinen production deploy | ⭐⭐⭐ Edistynyt | [Avaa](33-production-deploy.md) |
| 34 | Secrets audit | ⭐⭐⭐ Edistynyt | [Avaa](34-secrets-audit.md) |
| 35 | Prompt injection -testi | ⭐⭐⭐ Edistynyt | [Avaa](35-prompt-injection.md) |

---

## Aloita tästä

!!! tip
    Jos olet täysin aloittelevi, suosittelen aloittamaan:
    **[Harjoitus 01: Ensimmäinen read-only työ](01-read-only-tyo.md)**
    jossa harjoitellaan repositorion tutkimista turvallisessa plan-moodissa.

!!! advanced
    Jos olet jo tutustunut CLI:ään, kokeile:
    **[Harjoitus 05: Reviewer-agentti](05-reviewer-agentti.md)**
    jossa luodaan erillinen koodin tarkastaja.
