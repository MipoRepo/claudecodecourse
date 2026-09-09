# Harjoitus 24: Read-only pipeline

!!! quote "Tavoite"
    Rajoittaa headless-agentin käyttäytyminen **pelkästään lukuun** (`--tools Read`),
    jolloin sitä voi käyttää **analyysissä** ja **auditoinnissa** ilman kirjoitusriskiä.

## Taustaa

Käännetään selkeään JSONiin ja validaatioon eikä pelkkään luonnolliseen kieleen.

Kun haluat **vain tarkastella koodia** ilman muutoksia:

✅ Rajoita työkalut `Read, Grep, Glob`  
✅ Ei tarvitse huolta koodin muuttumisesta  
✅ Tämä on täydellinen **turvallisuusauditille**

## Tehtävä

Analysoi nykyinen projekti ilman että se saa kirjoittaa mitään. Miten rajoitat työkalut?

## Ratkaisu

### Headless-komento

```bash
claude -p "Analyze the current diff for security issues" --tools "Read"
```

### Täydempää versio (JSON-outputilla)

```bash
claude -p \
  "Analyze this codebase: find all hardcoded secrets, return JSON with {file:line, type, recommendation}" \
  --tools "Read,Grep" \
  --output-format json > security-audit.json
```

### Miksi tämä on turvallinen?

| Määritys | Selitys |
|----------|---------|
| `--tools "Read"` | Rajoittaa työkalut pelkästään lukuun |
| Ei Bashia | Ei voi suorittaa komentoja |
| Ei Write/Edit | Ei voi muuttaa tiedostoja |

### Esimerkkikäyttö

```bash
$ claude -p "Review current diff" --tools "Read"

## Security Review

### Findings

⚠️ **High**: src/config/api.js:5 — Hardcoded API key
🔎 Suositus: Siirrä ympäristömuuttujaan

⚠️ **Medium**: src/utils/auth.js:22 — MD5 hash (heikko)
🔎 Suositus: Kytke bcrypt tai Argon2

## Summary

Kokonaismäärä: 2 riskiä (1 korkea, 1 keskiverto)
```

!!! warning "VAROITUS 11"
    Headless + laajat työkalut + automaattiset permission-moodit voivat muodostaa erittäin vahvan
    automaatio-agentin. Testaa ensin read-only-moodina, rajoita työkalut, käytä sandboxia
    ja tee prod-toiminnoista erillinen hyväksyntävaihe.

---

*Lähde: Esimerkki 24 [S1], [S21]*
