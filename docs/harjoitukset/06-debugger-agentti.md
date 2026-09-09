# Harjoitus 06: Debugger-agentti

!!! quote "Tavoite"
    Luoda oma **debugger-sub-agentti**, joka voi ajaa testit, mutta saa kirjoittaa vasta kun on todistettu ongelman.

## Taustaa

Debugger-agentti tarvitsee:

- Bash-oikeudet testien ajamiseen
- Read/Grep/Glob -työkalut virheen jäljittämiseen
- Mutta kirjoitusoikeudet vasta kun juuri ongelman on todistettu

Tämä on eri tyyppinen päästö kuin reviewer, koska debugger tarvitsee **suorittaa** testit.

## Tehtävä

Luo `.claude/agents/debugger.md`, joka:

✅ Saa työkalut: `Read, Grep, Glob, Bash`  
✅ Ei saa: `Write, Edit`  
✅ Käytä mallia `haiku` (nopeampi triage)  
✅ Ei aseta `permissionMode`-a (käytä oletus `default`)

## Ratkaisu

### Tiedosto: `.claude/agents/debugger.md`

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

### Miten työkaluissa toimitaan?

Debugger:

1. **Reproduce** — Ajaa testit tai toistaa virheen
2. **Minimize** — Etsii pienimmän reproduktion
3. **Find root cause** — Etsii juurisyyn koodista
4. **Propose fix** — Ehdottaa korjaavaa koodia
5. **Only edit if explicitly asked** — Älä muokkaa ilman selkeää lupaa

### Esimerkkikäyttö

```bash
# Pääagentti pyytää diagnoosin:
Agent(debugger, "Testit hajoavat. Virheviesti: TypeError: Cannot read property 'map' of undefined. Tämä tapahtuu src/utils/formatter.js:ssä.")
```

Debugger palauttaa:

```
## Root Cause Analysis

1. **Virheellinen koodi**: src/utils/formatter.js:42
   ```javascript
   const items = data.users.map(u => u.name);
   ```

2. **Ongelmani**: `data.users` on `undefined`. Tämä tapahtuu, kun API ei palauta `users`-kenttää.

3. **Suositus**: Lisää validointi ennen map-kutsua:
   ```javascript
   const items = (data.users || []).map(u => u.name);
   ```

Löytö kohdassa 7.
```

!!! tip "ADVANCED-VINKKI 03"
    Käytä halvempaa mallia (haiku) tutkimus- ja triage-agentille, mutta pidä korkeampi
    päättelykyky arkkitehtuuripäätöksissä ja vaikeissa korjauksissa.

---

*Lähde: Esimerkki 06 [S1], [S3]*
