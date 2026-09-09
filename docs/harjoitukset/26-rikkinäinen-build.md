# Harjoitus 26: Rikkinäinen build → paluu (Rewind)

!!! quote "Tavoite"
    Käyttää `/rewind`-toimintoa palataksesi **aiempaan, toimivaan tilaan**,
    kun Claude on tehnyt muutoksen joka rikkoi buildin.

## Taustaa

Kun refaktorointi rikkoo testit:

❌ Sinun täytyy manuaalisesti palata takaisin  
✅ `/rewind` palauttaa aikaisemman tilan nopeasti  

## Tehtävä

1. Claude tekee refaktoroinnin
2. Testit hajoavat (`npm test` → `EXIT 1`)
3. Sinä päätät palata ennen refaktorointia

Miten?

## Ratkaisu

### Vaihe 1: Tunnista ongelma

```bash
npm test  # → FAIL: 5 testiä epäonnistuneet
```

### Vaihe 2: Käynnistä /rewind

```
/rewind
```

Tai paina `Esc` kaksi kertaa → avautuu valikko.

### Vaihe 3: Valitse paluu-aika

Valitse: **"Restore code and conversation"** — tämä palauttaa:

✅ Kokonaan tiedostomuutokset  
✅ Keskustelun edelliseen kohtaan  

### Esimerkkikäyttö

```
Claude: Teen refactoroinnin utils/ -kansiolle

[Muutetut tiedostot: 12 kpl]

$ npm test
FAIL src/utils/__tests__/date.test.js

/rewind  →  Valitse "Restore code and conversation"

✅ Build on jälleen vihreä
```

### Valinnat /rewind -valikosta

| Vaihtoehto | Mitä palautaa? |
|-----------|----------------|
| **Restore code and conversation** | ✅ Koodi ja ✅ keskustelu |
| **Restore conversation** | ❌ Koodi, ✅ keskustelu |
| **Restore code** | ✅ Koodi, ❌ keskustelu |
| **Summary** | ❌ ei mitään palauta |

!!! warning "VAROITUS 12"
    Rewind ei palauta **ulkoisia vaikutuksia** kuten:
    - jo ajetut deployat
    - tietokantamuutokset
    - kolmannen osapuolen API-kutsut

    Korkeita vaikutuksia vaativat erilliset **hyväksyntä- ja rollback-strategiat**.

!!! tip "ADVANCED-VINKKI 11"
    Pidä aina Git-commitit palautuspisteiksi suurissa refaktoroinneissa — vaikka Claude
    tarjoakaan checkpointit. Paras malli on kolmekerroksinen turva:
    **Claude checkpoint + Git commit + testit**.

---

*Lähde: Esimerkki 26 [S1], [S4]*
