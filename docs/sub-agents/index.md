# 3. Custom Sub-Agents

## 3.1 Mikä sub-agentti on?

!!! abstract "Määritelmä"

    Sub-agentti on erikoistunut AI-avustaja, joka saa oman konteksti-ikkunansa, oman
    system prompttinsa, omat työkalurajoituksensa ja halutessaan oman mallinsa.

Se on erityisen hyödyllinen silloin, kun sivutehtävä tuottaisi paljon lokia, hakutuntoksia tai
tiedostosisältöä pääkeskusteluun. Sub-agentti palauttaa pääsessioon **tiivistelmän**.

### Miksi sub-agentit ovat tärkeitä?

1. **Kontekin erottelu** — Sub-agentti käsittelee oman osa-alueen ilman pääsession keskustelulogin sekaantumista.
2. **Turvallisuus** — Sub-agentin työkalut voidaan rajoittaa tiukemmin (esim. vain luku).
3. **Rinnakkaisuus** — Useampi sub-agentti voi toimia samanaikaisesti erillisissä worktreissa.
4. **Kehittävyys** — Jokainen sub-agentti voi käyttää erillistä mallia (haiku vs sonnet vs opus).

## 3.2 Hakemistorakenne

```
.claude/
  agents/
    ├── reviewer.md
    ├── debugger.md
    ├── security-auditor.md
    └── test-engineer.md
```

## 3.3 Agentin Markdown-määrittely

Jokainen sub-agentti on `.md`-tiedosto, jossa on YAML-frontmatter ja system prompt:

=== "Reviewer-agentti"

    ```yaml
    ---
    name: reviewer
    description: Review changed code for correctness, security and maintainability.
    tools: Read, Grep, Glob
    model: sonnet
    permissionMode: plan
    ---
    ```

    **System prompt:**
    ```markdown
    You are a strict code reviewer.

    Rules:
    - Do not edit files.
    - Inspect tests and error paths.
    - Separate confirmed defects from hypotheses.
    - Return findings with severity and file/line references.
    ```

### Tuetut asetukset (YAML)

| Kenttä | Selitys | Esimerkki |
|--------|---------|-----------|
| `name` | Agentin nimi (pakollinen) | `reviewer` |
| `description` | Lyhyt kuvaus käyttötarkasta | `Audittaa turvallisuus` |
| `tools` | Sallitut työkalut | `Read, Grep, Glob` |
| `disallowedTools` | Kielletyt työkalut | `Write, Edit` |
| `model` | Mallin valinta | `haiku`, `sonnet`, `opus` |
| `permissionMode` | Rajoitusmoodi | `plan`, `default` |
| `isolation` | Työskentelyerottelu | `worktree` (omaa worktreea varten) |

!!! tip "ADVANCED-VINKKI 02"
    Pidä agentin `description` lyhyenä mutta osuvana — Claude käyttää sitä päätellessään,
    milloin agentille kannattaa delegated. Huono kuvaus tekee hyvästä agentista
    käytännössä näkymättömän tai väkisin käytetyn.

!!! tip "ADVANCED-VINKKI 03"
    Käytä “halvempaa/nopeampaa” mallia tutkimus- ja triage-agentille, mutta pidä
    korkeampi päättelykyky arkkitehtuuripäätöksissä ja vaikeissa korjauksissa.

## 3.4 Työkalurajoitukset

| Asetus | Sallittu työkalupinta | Merkitys | Käyttö |
|--------|-----------------------|----------|--------|
| `tools` | Reviewer: Read/Grep/Glob | Mitkä työkalut sallitaan | Tutkimusagentti ilman Write/Edit |
| `disallowedTools` | — | Mitkä työkalut estetään | Tietyn työn estominen |
| `permissionMode` | `plan` | Rajoita read-onlyon | Turvallinen auditointi |
| `isolation: worktree` | Oma worktree | Eristä koodi | Rinnakkaiset muokkaukset |

### Esimerkki 05: Koodireview-agentti

```yaml
---
name: reviewer
description: Review diffs and identify correctness, security and test gaps.
tools: Read, Grep, Glob
permissionMode: plan
---
Review only. Never edit. Return:
- Critical / High / Medium / Low
- evidence
- recommendation
- missing tests
```

### Esimerkki 06: Debugger-agentti

```yaml
---
name: debugger
description: Reproduce and diagnose runtime failures.
tools: Read, Grep, Glob, Bash
model: haiku
---
1. Reproduce.
2. Minimize.
3. Find root cause.
4. Propose fix.
5. Only edit if explicitly asked.
```

### Esimerkki 07: Security-auditori

Turvallisuusauditointiin kannattaa tehdä agentti, joka **ei kirjoita tiedostoja**.

!!! warning "VAROITUS 03"
    Älä anna reviewer-agentille Write/Edit-oikeuksia vain siksi, että "ehkä niitä tarvitaan".
    Minimaalinen työkalupinta vähentää vahingoitumisriskiä.

---

## Seuraavaksi

- [Luku 4: Skills](../skills/index.md)
- [Harjoitus 05: Reviewer-agentti](../harjoitukset/05-reviewer-agentti.md)
