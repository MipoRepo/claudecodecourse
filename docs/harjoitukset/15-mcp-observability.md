# Harjoitus 15: MCP + Observability

!!! quote "Tavoite"
    Yhdistää **MCP-palvelin, joka tarjoaa observabisuusdatan** (logit, metriikat, hälytykset)
    ja käyttää sitä diagnostiikan yhteydessä.

## Taustaa

Observability tarkoittaa:

- **Lokeja** (log)
- **Metriikoita** (metrics)
- **Hälytyksiä** (alerts)

Kun MCP-yhteyttä on olemassa, Claude voi:

✅ Hakea tuotantometriikoita suoraan  
✅ Tullaamaan lokit koodin kanssa  
✅ Hälytykset diagnoosin yhteydessä

## Tehtävä

1. **Rekisteröi observability-MCP-palvelin:**
   ```bash
   claude mcp add --transport http observability http://localhost:8080/mcp
   ```
2. **Kysy:**
   > *"Näytä CPU-metrinen viimeisten 30 minuutin aikana, ja yhdistä se src/worker.ts -tiedostoon."*

---

## Ratkaisu

### MCP-konfiguurointi: `.mcp.json`

```json
{
  "mcpServers": {
    "observability": {
      "transport": "http",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

### Diagnostinen esimerkki

```bash
claude "MCP:n avulla näytä CPU-metrinen 30 min, ja etsi korkeiden käyttöasteen aiheuttama koodiosa"
```

Claude vastaa:

```
## Diagnostinen analyysi

### CPU-metrics (viimeiset 30 min)
- Keskimääräinen käyttö: 72%
- Huippukäyttö: 100% klo 14:32
- Yhteys: src/services/worker.js, rivi 85

### Koodi
src/services/worker.js:85:
```javascript
// Tämä silmukta kaatuu 10 000 kierroksessä
for (let i = 0; i < items.length; i++) {
  process(items[i]); // Tämä on O(n²)
}
```

### Suositus
Käytä `Promise.all()` tai rajaa kierrosten määrä batch-käsittelyyn.
```

### Esimerkkikomento

```bash
cat build.log | claude -p "Etsi virheiden syyt tämän buildin takia" \
  --output-format json > analysis.json
```

!!! tip "ADVANCED-VINKKI 07"
    Rajoita MCP-palveluiden **output-koko**. Claude varoittaa suurista tuloksista 10 000 tokenin
    kohdalla, ja oletusmaksimi on 25 000 tokenia. Tämän `MAX_MCP_OUTPUT_TOKENS`-yhteyksillä säädetään.

---

*Lähde: Esimerkki 15 [S1], [S13]*
