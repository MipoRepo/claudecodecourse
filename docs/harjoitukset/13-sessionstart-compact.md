# Harjoitus 13: SessionStart + Compact

!!! quote "Tavoite"
    Konfiguroida **SessionStart-hook** `compact`-matcherillä, joka **palauttaa projektin
    kriittiset säännöt** kun sessio on tiivistetty (compact).

## Taustaa

Kun Claude käyttää `/compact`-toimintoa:

1. Se tiivii keskustelun tiivitelmään
2. Vanha keskusteluloki menetetään kontekstinä
3. **SessionStart-hook** käynnistyy automaattisesti uutena "sessiona"

Tämä tarkoittaa, että **SessionStart on täydellinen paikka palauttaa projektin keskeiset säännöt**.

## Tehtävä

Luo hook, joka:

✅ Kuuntelee `SessionStart`-tapahtumaa  
✅ Matchaa `compact`-tyylin  
✅ Tulostaa projektin tärkeimmät säännöt:
- aja testit
- tuotantoon vaatii reviewn
- älä committaa ilman hyväksyntää

## Ratkaisu

### Konfiguurointi: `.claude/settings.json`

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo '🔄 Session compacted. Remember: Run tests with npm test; production changes require review.'"
          }
        ]
      }
    ]
  }
}
```

### Miksi tämä on tärkeä?

Kun `/compact` suoritetaan:

1. Keskustelun keskellinen osa menetetään
2. Projektiyhteydet (esim. "tämä on production-branch") myös
3. SessionStart-hook **muistuttaa** näistä tärkeistä säännöksistä

### Esimerkki käytössä

```bash
# Käyttäjä compacttaa
/clause

# Claudelle: "Tiivitä tämä keskustelu, keskitty ennakoidumattomiin muutoksiin."

# Session alussa (uusi kom-pact-session)
# SessionStart-hook käynnistyy:
# → "🔄 Session compacted. Remember: Run tests with npm test; production changes require review."
```

!!! tip "ADVANCED-VINKKI 06"
    Käytä hookia **deterministiseen sääntöön**, ei sellaiseen päätökseen jossa mallin
    tulee ymmärtää abstraktia liiketoimintakontekstia.

---

*Lähde: Esimerkki 13 [S1], [S12]*
