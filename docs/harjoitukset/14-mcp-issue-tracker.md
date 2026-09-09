# Harjoitus 14: MCP + Issue Tracker

!!! quote "Tavoite"
    Konfiguroida **MCP-palvelin**, joka antaa pääsyn **issuet-trackeriin**
    ilman, että issue-teksti kopioidaan chatissa.

## Taustaa

MCP (Model Context Protocol) palaa:

- Ulkoisista tietokannoista
- Ticketing-järjestelmistä (esim. JIRA, GitHub Issues)
- Observability-työkaluista

Kun integroidit MCP:llä:

✅ Claude näkee suoraan issuen datan  
✅ Ei tarvitse kopioimaan tekstiä chatiin  
✅ Voi tehdä kehityssuunnitelman suoraan issuen perusteella  

## Tehtävä

Asenta MCP-palvelin JIRA-issuet, ja:

1. **Rekisteröi palvelin:**
   ```bash
   claude mcp add --transport http jira https://example.invalid/mcp
   ```
2. **Avaa Claude Code** uutena terminalina.
3. **Kysy:** *"Hae JIRA-issuing numero 123, lue vaatimukset ja tee kehityssuunnitelma."*

---

## Ratkaisu

### 1. MCP:n rekisteröinti

```bash
claude mcp add --transport http jira https://example.invalid/mcp
```

### 2. Autentikointi

Avaa Claude Code ja katso:

```bash
/mcp
```

Tämä avaa MCP-hallintasivun, jossa voit:

- Nähdä rekisteröidyt palvelimet
- Autentikoida OAuth-pyynnöt
- Katkaista yhteyden

### 3. Claude Code -sessio

Uudessa terminaalissa:

```bash
claude
```

Komento:

> Hae JIRA-issuing numero 123. Lue siinä mainitut vaatimukset ja tee
> kehittämissuunnitelma kolmeen viheen.

### Tuloste

```
## Issue #123: API rate limiting

### Requirements:
- Maximum 100 requests per minute per user
- Return 429 when exceeded
- Include Retry-After header

### Development Plan:

Vaihe 1: Rakenna rate-limiter middleware (src/middleware/ratelimit.js)
Vaihe 2: Lisää testit (tests/ratelimit.test.js)
Vaihe 3: Käytä middlewareä kaikissa API-reiteissä
```

!!! warning "VAROITUS 07"
    MCP ei tee ulkoisesta järjestelmästä automaattisesti turvallista.
    Käytä **minimia oikeuksia** ja **ihmisen hyväksyntä** korkeiden vaikutusten osalta.

---

*Lähde: Esimerkki 14 [S1], [S13]*
