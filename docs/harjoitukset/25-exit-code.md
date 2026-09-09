# Harjoitus 25: Exit code -ajattelu

!!! quote "Tavoite"
    Ymmärtää, miksi **exit-koodit ja JSON-validointi** ovat tärkeitä automaatiossa,
    eikä luonnollisen kielen tulkinnan perusteella.

## Taustaa

Kun automatisoitu agentti päättää toimenpiteet:

❌ "Luonnollisen kielen" analyysi → epätarkka ja rajaton  
✅ **JSON + validaatio** → tarkka, rajallinen ja testattavissa

Esimerkiksi tämä on **väärin**:

```bash
# Viallista:
claude -p "Onko tämä build OK?" → "Joo, näyttää hyvältä."
```

Mutta tämä on **oikein**:

```bash
# Hyvin:
claude -p \
  "Return JSON: {status: 'ok'|'fail', error?: string}" \
  --output-format json | jq -r '.status' | grep 'ok'
# exit 0 = OK, exit 1 = FAIL
```

## Tehtävä

Muuta tämä skripti täysin validoituksi JSON-analyysiksi:

```bash
# Alkuperä (puutteellinen):
cat results.txt | claude -p "Onko virheit?"
```

## Ratkaisu

### Vaihe 1: Määritä tarkka JSON-rakenne

```bash
cat results.txt | claude -p \
  "Return ONLY valid JSON. Fields: status (OK|FAIL), error_count (int), first_error (string|null), recommendations (array)" \
  --output-format json > analysis.json
```

### Vaihe 2: Validoi JSON

```bash
# Tarkista että JSON on kelvollinen
jq '.status' analysis.json || exit 1
```

### Vaihe 3: Päätöksenteko exit-codella

```bash
# Kokonaiskäsky:
RESULT=$(jq -r '.status' analysis.json)
if [ "$RESULT" = "FAIL" ]; then
    echo "🔴 Build FAILED — tarkista analysis.json"
    exit 1
fi
echo "✅ Build OK"
exit 0
```

### Esimerkkikäyttö

```bash
$ cat errors.txt | claude -p "..." --output-format json | jq '.status'
"FAIL"
$ echo "Exit code: $?"
1
```

### Miksi tämä on tärkeä?

| Esimerkkimenetelmä | Ongelma |
|---------------------|--------|
| Tekstivastaus "joo" | Ei ole konekäsiteltävissä |
| Epävalidi JSON | Ei voi tarkistua raketta |
| Ei exit-codea | CI ei tietää, onko se OK vai ei |

!!! tip "ADVANCED-VINKKI 10"
    Käytä `--bare`-tilannetta silloin, kun haluat erittäin nopean script-ajon ja tiedät
    tarkasti mitä tarvitset. Se ohittaa hooks, skills, plugins, MCP, auto-memory ja CLAUDE.md-
    autodiscoveryn.

---

*Lähde: Esimerkki 25 [S1], [S18]*
