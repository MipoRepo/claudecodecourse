# Harjoitus 03: Plan-mode analyysi

!!! quote "Tavoite"
    Oppia käyttämään Claude Coden **plan-moodia** turvalliseen, read-only-analyysiin.

## Taustaa

Plan-moodi on lupa, jossa Claude voi:

- ✅ Lukea tiedostoja (`Read`, `Grep`, `Glob`)
- ✅ Suorittaa hookit (mutta ne eivät saa kirjoittaa)
- ❌ Muuttaa tiedostoja (`Edit`, `Write`)
- ❌ Aja komentoja (`Bash` ilman estettä)

Tämä tekee siitä täydellisen moodin **ensimmäiselle tarkastelukierrokselle**.

## Tehtävä

Olet saanut projektin, jossa on seuraavat tiedostot:

```
project/
├── package.json
├── src/
│   ├── api/
│   ├── components/
│   └── index.js
├── tests/
└── README.md
```

1. **Aja plan-moodi:**
   ```bash
   claude --permission-mode plan
   ```
2. **Pyydä:** *Analysoi tämä projekti. Palauta JSON-muodossa: arkkitehtuuri, entry pointit, testikomennot, riskialueet.*
3. **Analysoi vastaus:** Onko se täydellinen?

---

## Ratkaisu

### Miksi plan-moodi on tärkeä?

Kyseessä on turvallinen tapa antaa Claudeille "tutkinnon" ilman, että se voi tehdä mitään
projektiisi. Tämä on erityisen tärkeä:

- **Uusien repositorioiden tutkittaessa**
- **CI/CD-analyysissä**
- **Turvallisuusauditoinnin alusskannalla**

### Esimerkkikäyttö

```bash
claude --permission-mode plan "Palauta JSON: {
  architecture: string,
  entry_points: string[],
  test_command: string,
  risk_areas: string[]
}"
```

### Mitä Claude palauttaa?

```json
{
  "architecture": "React-frontend + Express-backend REST API",
  "entry_points": ["src/index.js", "src/api/server.js"],
  "test_command": "npm test",
  "risk_areas": [
    "src/api/server.js: CORS-rajoitukset puutteelliset",
    "src/auth/login.js: session-hallinta puutteellista"
  ]
}
```

!!! warning
    Plan-moodi ei taata 100 % tarkkuutta — se perustuu **todennäköissyteyysperusteelliseen lukemiseen**.
    Aina tarkista kriittiset asiat itse.

### Seuraavaksi

Kun olet varma, että analyysi on oikein, voit siirtyä **default-moodiin**:

```bash
claude
# tai tarkemmin rajoitetusti:
claude --allowedTools "Read,Grep,Glob,Bash(npm*)" \
  "Korjaa riskialueet ja aja testit."
```

---

*Lähde: Esimerkki 03 [S1], [S10]*
