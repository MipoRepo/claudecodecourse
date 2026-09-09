# Harjoitus 30: Definition of Done -skill

!!! quote "Tavoite"
    Luoda **Definition of Done -skill**, joka tarkistaa kaikki kriteerit ennen pull requestia:
    testit, lint, muutetut tiedostot, dokumentaatio ja Git-difft.

## Taustaa

**Definition of Done (DoD)** määrittelee, millaiset ehdot täytyy olla täytetty ennen kuin
työ on "valmis".

Tällä tavalla voit automatisoida tarkistuksia:

| Tarkistus | Miten? |
|----------|--------|
| Testit | `npm test` tai `pytest` |
| Lint | `npm run lint` |
| Muutetut tiedostot | `git diff --name-only` |
| Dokumentaatio | `?docs/`-tiedostomuutokset |
| Git-difft | `git log --oneline -5` |

## Tehtävä

Luo `/done`-skill, joka tarkistaa kaikki yllä olevat kriteerit ja palauttaa yhteenveton.

## Ratkaisu

### Tiedosto: `.claude/skills/done/SKILL.md`

```yaml
---
name: done
description: Check Definition of Done before PR — tests, lint, changed files, docs, git diff.
disable-model-invocation: false
user-invocable: true
allowed-tools:
  - Bash(npm test *)
  - Bash(npm run lint *)
  - Bash(git diff *)
  - Bash(git log *)
model: sonnet
---

## Definition of Done Check

1. **Testit** — aja `npm test`
2. **Lint** — aja `npm run lint`
3. **Muutetut tiedostot** — tarkista `git diff --name-only`
4. **Dokumentaatio** — onko `docs/`-kansiossa muutoksia?
5. **Git** — tarkista `git log --oneline -5`

Palauta lopuksi yhteenveto: OK / FAIL jokaiselle kohteelle.
```

### Esimerkkikäyttö

```bash
/done
```

Claude vastaa:

```
## ✅ Definition of Done

1. Tests: ✅ PASS (25/25 tests)
2. Lint: ✅ PASS (0 errors)
3. Changed files: 4 (src/api.js, src/utils.js, tests/api.test.js, docs/api.md)
4. Documentation: ✅ docs/api.md updated
5. Git: ✅ 2 commits (abc123, def456)

RESULT: ✅ READY FOR PR
```

---

*Lähde: Esimerkki 30 [S1]*
