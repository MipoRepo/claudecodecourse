# 9. Headless Mode

## 9.1 `claude -p`

!!! abstract "Määritelmä"

    `claude -p` (print / non-interactive mode) mahdollistaa Claude Coden käytön **skripteissä**,
    **CI/CD:ssä** ja **yksikäsitteisessä toimenpiteessä** ilman interaktiivista terminaalinäkymää.

Kaikki CLI-optiot eivät katoa: käytettävissä esimerkiksi `--continue`, `--allowedTools` ja
`--output-format`.

```bash
claude -p "What does the auth module do?"
```

## 9.2 Build-lokin putkitus Claudeen

```bash
cat build.log | claude -p "Why did this build fail?"
```

Tämä vastaa suoraan headless-demota: build-logi putkitetaan mallille, ja Claude selittää
ensimmäisen virheen, syyn ja mahdolliset korjaukset.

!!! tip "ADVANCED-VINKKI 10"
    Käytä `--bare`-tilaa silloin, kun haluat erityisen nopean scripted-ajon ja tiedät tarkasti,
    mitä tarvitset. Se ohittaa **hooks, skills, plugins, MCP, auto-memory** ja **CLAUDE.md-autodiscovery**.
    Tämä on hyvä CI:n minimipinnalle, mutta **ei suositeltava oletukseksi** kehittäjän työympäristössä.

```bash
claude -p "Analyze build log" --bare --allowedTools "Read" --output-format json
```

## 9.3 JSON-output

```bash
cat build.log | claude -p \
  "Return JSON with status, first_failure, likely_cause, next_action" \
  --output-format json
```

Nykyinen CLI tukee **strukturoituja output-formaatteja**. Lisäksi `stream-json` mahdollistaa
streamatut tapahtumat, ja `--include-hook-events` sekä partial-message-asetukset ovat
saatavana silloin, kun tarvitset tapahtumavirran.

### Esimerkki 23: CI build failure triage

```bash
set -o pipefail
cat build.log | claude -p \
  "Return JSON with status, first_failure, likely_cause, next_action" \
  --output-format json > claude-triage.json
```

### Esimerkki 24: Read-only pipeline

```bash
claude -p "Review current diff" --tools "Read"
```

Rajaa agentille vain **Read** — Tämä mahdollistaa analysin ilman, että agentti voi muokata repoa.

### Esimerkki 25: Exit code -ajattelu

> Älä rakenna automaatiota pelkästään luonnollisen kielen perusteella.

```bash
# Käännetään selkeään JSON- ja validointistrutta
cat data.txt | claude -p \
  "Return JSON: {status, issues[]}" \
  --output-format json | jq '.status'
```

!!! warning "VAROITUS 11"
    Headless + laajat työkalut + automaattiset permission-moodit voivat muodostaa erittäin
    vahvan automaatioagentin. Testaa ensin **read-only-moodina**, rajaa työkalut, käytä
    sandboxia ja tee prod-toiminnoista erillinen hyväksyntävaihe.
