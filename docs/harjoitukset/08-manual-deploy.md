# Harjoitus 08: Manuaalinen deploy-skill

!!! quote "Tavoite"
    Luoda **manuaalisesti laukaistava deploy-skill**, joka **ei automaattisesti** käynnistä
    deploya ilman käyttäjän hyväksyntää.

## Taustaa

Tärkein turvallisuusperiaate: **tuotantoon siirtyminen vaatii aina ihmisen hyväksynnän**.

Claude-ohjautuva deploy (model invocation) voi olla riski, joten:

- `disable-model-invocation: true` → estää Clauden itsenäisen deploy-päätöksen
- `user-invocable: true` → käyttäjä voi kutsua `/deploy` manuaalisesti

## Tehtävä

Luo `.claude/skills/deploy/SKILL.md`, joka:

✅ Nimi: `deploy`  
✅ `disable-model-invocation: true`  
✅ `user-invocable: true`  
✅ Vastaanottaa argumenttina ympäristön (`staging`, `production`)  
✅ Sallii ainoastaan `Bash(git status)`, `Bash(git diff)`

## Ratkaisu

### Tiedosto: `.claude/skills/deploy/SKILL.md`

```yaml
---
name: deploy
description: Deploy to staging or production with manual approval gate.
argument-hint: [environment]
arguments: [environment]
disable-model-invocation: true
user-invocable: true
allowed-tools:
  - Bash(git status *)
  - Bash(git diff *)
model: sonnet
---

## Deploy-prosessi

1. Tarkista siisti pöytäkirja (git status)
2. Tarkista diff (git diff)
3. Aja testit (npm test)
4. Varmista että environment on validi: $ARGUMENTS[0]
5. **Odota käyttäjän hyväksyntää ennen todellista deployia**

!!! warning
    Tuotantoon siirtyminen vaatii aina suoraan käyttäjän vahvistuksen.

### Ympäristöt

| Ympäristö | Käynnistys |
|-----------|-----------|
| `staging` | `/deploy staging` |
| `production` | `/deploy production` |

---

*Lähde: Esimerkki 08 [S1], [S8]*
