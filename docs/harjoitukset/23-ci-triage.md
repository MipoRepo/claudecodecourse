# Harjoitus 23: CI build failure triage

!!! quote "Tavoite"
    Asettaa **CI-toiminto**, joka syöttää **build-lokin headless Claudeen**,
    ja tallentaa strukturoitua JSON-tulosta artifactiksi.

## Taustaa

Kun CI-jobi hajoaa:

❌ Ihmisen täytyy itse lukea build-lokin  
✅ Claude voi **automaattisesti** analysoida virheen ja palauttaa JSON-rapedin

Tämä tekee CI-putkesta **deterministisen** ja **konekäsiteltävän**.

## Tehtävä

Luo CI-skripti, joka:

1. Ottaa `build.log` -tiedoston  
2. Syöttää sen headless Claudeen  
3. Pyytää JSON-analyysin  
4. Tallentaa tulokset tiedostoihin  

## Ratkaisu

### GitHub Actions -workflow: `.github/workflows/ci-triage.yml`

```yaml
name: CI Build Triage
on: [push, pull_request]

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run build
        run: npm run build 2>&1 | tee build.log || true
      - name: Claude triage
        run: |
          set -o pipefail
          cat build.log | claude -p \
            "Return JSON: { status, first_failure, likely_cause, next_action }" \
            --output-format json > claude-triage.json
      - name: Upload analysis artifact
        uses: actions/upload-artifact@v4
        with:
          name: claude-triage
          path: claude-triage.json
```

### Esimerkkikäyttö

```bash
# Paikallinen versio:
cat build.log | claude -p \
  "Return JSON with status, first_failure, likely_cause, next_action" \
  --output-format json > claude-triage.json
```

### JSON-tulos

```json
{
  "status": "FAILED",
  "first_failure": "TypeError: Cannot read properties of undefined (reading 'name')",
  "likely_cause": "API-vastauksessa oleva `data.user.name` kenttä on undefined.",
  "next_action": "Lisää fallback-arvo tai validaatiot `src/components/UserCard.jsx`:llä"
}
```

### Miksi tämä toimii hyvin?

| Ominaisuus | Hyöty |
|-----------|-------|
| `--output-format json` | Konekäsiteltävä tulos |
| `--tools "Read"` | Rajoitettu pääsy (ei kirjoita) |
| Upload artifact | Tulos säilytetään CI:ssa |

!!! tip "ADVANCED-VINKKI 10"
    Käytä `--bare`-tilannetta, kun haluat erityisen nopean script-ajon ja tiedät tarkasti mitä tarvitset.
    Se ohittaa hooks, skills, plugins, MCP, auto-memory ja CLAUDE.md-autodiscoveryn.

---

*Lähde: Esimerkki 23 [S1], [S21]*
