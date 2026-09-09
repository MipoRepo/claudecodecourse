# Harjoitus 09: Skillin argumenttien välitys

!!! quote "Tavoite"
    Oppia käyttämään **argumentteja skillsissä** ja päättämään, miten `$ARGUMENTS` tuottaa
    arvot.

## Taustaa

Skillit voivat ottaa argumentteja kahdesti tavalla:

1. **Positioituna** (`$ARGUMENTS[0]`, `$ARGUMENTS[1]`)
2. **Nimettynä** (`$ARGUMENTS[name]`)

### Konfiguroidaan `arguments`- ja `argument-hint`-kentillä:

```yaml
---
name: deploy
arguments: [environment]
argument-hint: [staging|production]
---
```

## Tehtävä

Luo skill `incident-triage`, joka:

✅ Ottaa argumenttina tiedostonimen  
✅ Käyttää `argument-hint`-kenttää kuvaamaan parametria  
✅ Tulostaa: *Analyzing $ARGUMENTS[0]...*

Koe sitten: `/incident-triage build.log`

## Ratkaisu

### Tiedosto: `.claude/skills/incident-triage/SKILL.md`

```yaml
---
name: incident-triage
description: Triage an application incident from a log file.
argument-hint: [logfile]
arguments: logfile
---

## Incident Triage

Analyzing **$ARGUMENTS[0]**...

1. **Classify symptom** — tarkista onko tämä build-, runtime- vai deployment-virhe
2. **Extract first failure** — löydä ensimmäinen virheviesti
3. **Identify root cause** — etsi yleinen syy
4. **List evidence** — kerää kaikki merkittävät tiedot
5. **Propose next three checks** — mitä tarkistaa seuraavaksi
6. **Never claim certainty without evidence**

---

*Lähde: Esimerkki 09, 10 [S1], [S8]*
