# Harjoitus 27: Säilytä koodi, uudista keskustelu

!!! quote "Tavoite"
    Käyttää `/rewind`-ominaisuutta **säilyttämään koodimuutokset** samalla kun
    **kokeilee erilaista ajattelutapaa** — ilman että koodi menettää edistystään.

## Taustaa

Esimerkiksi:

✅ Claude teki koodin, joka **on oikein ja toimii**  
❌ Keskustelun jälkeen haluat kokeilla **toista lähestymistapaa**

Tässä tilanteessa:

- **Säilytä koodi** (koodimuutokset pysyvät)
- **Palauta keskustelu** (keskustelu aloitetaan alusta)

## Tehtävä

Claudella on juuri tehty fiksaani, joka korjaa testejä. Haluat kokeilla **toista korjausstrategiaa**
samassa tiedostossa — ilman että menetät edellisen korjauksen.

Miten toimia?

## Ratkaisu

### Vaihe 1: Avaa /rewind-valikko

```
/rewind
```

Paina `Esc` kaksi kertaa → avautuu valikko.

### Vaihe 2: Valitse "Restore conversation"

Tämä palaa juuri siihen pisteeseen, jossa olet päättänyt, että **koodi on oikein**,
mutta haluat kokeilla uutta **ajattelua siitä, miten jatkaa**.

### Esimerkkikäyttö

```
Claude: Korjaan bugi `formatDate()`

[EDIT] src/utils/date.js

$ npm test → ✅ ALL TESTS PASSED!

Haluan kokeilla: "Mitä tapahtuu jos käytän Intl-kirjastoa?"

/rewind → "Restore conversation"

Claudelle: "Säilytä koodi muutokset. Kokeile nyt Intl-kirjastoa samaan toimintaan."
```

### Miksi tämä on tehokasta?

| Strategia | Hyöty |
|----------|-------|
| Säilytä koodi | Ei ole kadottamista työtä |
| Uudista keskustelu | Voi kokeilla uudestaan |
| Toinen malli | Vaihtaa mallin (esim. sonnet → opus) |

!!! tip "ADVANCED-VINKKI 11"
    Tämä on erityisen hyödyllinen **A/B-testauksessa**: vertailemalla kahta erillistä lähestymistapaa
    samahan pulmaan — molemät koodiversiot säilyvät, ja voit valita parhain.

---

*Lähde: Esimerkki 27 [S1], [S4]*
