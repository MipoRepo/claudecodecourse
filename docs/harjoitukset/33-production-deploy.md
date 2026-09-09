# Harjoitus 33: Turvallinen production deploy

!!! quote "Tavoite"
    Luoda **turvallinen production deploy -skill**, joka:

    ✅ On `disable-model-invocation: true`  
    ✅ Vaatii testien menestyksen  
    ✅ Pysäytetään ennen varsinaista deployia ihmisen hyväksyntää  

## Taustaa

Tärkein turvallisuusperiaate:

> **Tuotantoon siirtyminen vaatii aina ihmisen hyväksynnän.**

Clauden automaattinen päätös tehdä deploy voi olla **erittäin vaarallinen**. Tämän takia:

- `disable-model-invocation: true` → estää Clauden päättämättömän deployin
- `user-invocable: true` → käyttäjä voi kutsua `/deploy production` manuaalisesti

## Tehtävä

Luo `/deploy production`-skill, joka:

1. Estää Clauden automaattisen kutsumisen
2. Varmistaa testien läpäisemisen ennen käynnistystä
3. pysäytetään ennen varsinaista cloud/API-deployia ihmisen hyväksyntää

## Ratkaisu

### Tiedosto: `.claude/skills/deploy-production/SKILL.md`

```yaml
---
name: deploy-production
description: Production deployment with manual approval gate. DISABLES auto invocation.
disable-model-invocation: true
user-invocable: true
allowed-tools:
  - Bash(npm test *)
  - Bash(git status *)
model: sonnet
---

## ⚠️ PRODUCTION DEPLOY

Tämä komento vaatii **manual approvalin** — se ei koskaan käynnisty automaattisesti.

### Prosessi:

1. ✅ Testit on läpäisty: `npm test`
2. ✅ Puutteet on selvillä: `git status`
3. ⏳ **ODO: Odotetaan käyttäjän vahvistusta ennen deployia**

Kirjoita "DEPLOY PRODUCTION" vahvistaaksesi toiminnon:

>>> Tämä on **VIIMEINEN MAHDOLLISUUS PERUUTTAA** ennen kuin koodi menee täysilleen käytöön.
```

### Permission-strategia

```
SAFE DEFAULT:    plan → review → approve → acceptEdits
CONTROLLED:      default + allow read/test + deny dangerous + hook
HIGH RISK:       never use bypassPermissions against production
```

### Miksi tämä on turvallinen?

| Mekanismi | Selitys |
|----------|---------|
| `disable-model-invocation: true` | Claude ei voi päättää deployista itse |
| `user-invocable: true` | Ainoa tapa on `/deploy production` |
| `allowed-tools` (rajoitettu) | Vain testaus ja tarkistukset sallittuja |
| Manual confirmation | Ihminen vahvistaa lopullisesti |

!!! warning "VAROITUS 15"
    `bypassPermissions` antaa erittäin laajoja oikeuksia ja vaatii erityistä varovaisuutta.
    Se sopii vain **kontrollidoissa ympäristöissä**, joissa kaikki mahdolliset operaatiot ovat hyväksyttävissä.

!!! tip "ADVANCED-VINKKI 12"
    Tee **policy-as-code**: säilytä `.claude/settings.json`, hooks, agentit ja Skills
    Gitissä, tarkistele pull requestinä ja aja niille omat smoke-testit.

---

*Lähde: Esimerkki 33 [S1], [S10]*
