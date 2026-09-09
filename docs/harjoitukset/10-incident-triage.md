# Harjoitus 10: Incident triage-skill

!!! quote "Tavoite"
    Luoda toistettava **incident-triage-skill**, joka aina suorittaa saman diagonnoserun.

## Taustaa

Incident triage on erityisen hyvä skill-esimerkki, koska se:

- Ottaa tilanteen mukaan (esim. login tiedosto)
- Suorittaa aina saman analyysiputken
- Palauttaa rakenteksen tuloksen

Tämä vähentää **kontekstin kulumista** ja **tarjoaa yhtenäisen prosessin**.

## Tehtävä

Luo skill, joka:

✅ Ottaa login tiedoston argumenttina  
✅ Tekee 4 vaihetta: parse → classify → reproduce → recommend  
✅ Ei koskaan väitä varmuutta ilman näyttöä  

## Ratkaisu

### Tiedosto: `.claude/skills/incident-triage/SKILL.md`

```yaml
---
name: incident-triage
description: Triage an application incident from a log file.
argument-hint: [logfile]
arguments: logfile
---

Analyzing $logfile...
- classify symptom
- extract first failure
- identify probable root cause
- list evidence
- propose next three checks
- never claim certainty without evidence
```

### Esimerkkikäytänto

```
/incident-triage logs/production-error.log
```

Claude vastaa:

```
## Incident Triage: logs/production-error.log

1. **Symptom classification**: ERROR — tietokantayhteyden ajanloppu
2. **First failure**: 
   ```
   ERROR [2025-01-15 14:32:01] Connection refused: database timeout
   ```
3. **Root cause (hypoteesi)**: Yhteyspoolin enimmäiskoko on liian pieni kuormituksen aiheuttamana.
4. **Evidence**:
   - `src/db/pool.js:15` — poolSize = 10
   - logs → 150 samanaikasta yhteyttä 14:31–14:32
   - CPU 95% palvelimen aikana
5. **Next three checks**:
   - (1) Tarkista poolin konfiguraatio `src/db/pool.js`-ssä
   - (2) Analysoi yhteyksien määrä `/metrics`-endpointistä
   - (3) Kokeile suuremmalla poolilla QA-ympäristössä
```

!!! tip "ADVANCED-VINKKI 04"
    Pidä skillin `description` lyhyenä ja osuvana — se näkyy 1 536 merkin rajan sisällä.
    `description + when_to_use` on tärkeä.

---

*Lähde: Esimerkki 10 [S1], [S8]*
