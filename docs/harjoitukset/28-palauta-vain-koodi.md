# Harjoitus 28: Palauta vain koodi

!!! quote "Tavoite"
    Käyttää `/rewind`-toimintoa **palauttamaan tiedostomuutokset**,
    kunnes Claude teki virheen — mutta säilyttämään **keskustelun päättökset** näkyvissä.

## Taustaa

Usein tilanne on tällainen:

✅ Claude antoi **hyviä päätöksiä** keskustelussa  
❌ Mutta **yksi tiedostomuutos** oli väärä

Tässä tapauksessa:

- **Säilytä keskustelu** (päättelmat pysyvät näkyvänä kontekstina)
- **Palauta koodi** (vain virheellinen muutos poistetaan)

## Tehtävä

Claude teki 3 tiedostoa, joista 1 oli väärin. Miten palautat vain virheellisen tiedoston,
ilman että menetät keskustelun historian?

## Ratkaisu

### Vaihe 1: Avaa /rewind-valikko

```
/wind
```

Tai paina `Esc` kaksi kertaa.

### Vaihe 2: Valitse "Restore code"

Tämä palauttaa **vain tiedostomuutokset** ajan pisteeseen, johon päättelit
 että koodi oli oikein.

### Esimerkkikäyttö

```
Claudelle:
"Tee kolme muutosta projektiin:
1. Lisää validointi UserSchemaen
2. Päivitä README
3. Poista vanha cache-tiedosto"

Claude tekee kaikki kolme muutosta → testit hajoavat.

/rewind → "Restore code" (valitse aika, jolloin numero 1 ja 2 olivat valmiita, mutta 3 ei vielä)

✅ Koodi paluu tarkalleen siihen tilanteeseen
✅ Keskustelu säilyy
✅ Voit jatkaa keskustelua tarkentamalla: "Älä koskaan poista tiedostoja ilman tarkistusta!"
```

### Mikä ero?

| Toimenpide | Palautettu | Säilytetty |
|-----------|------------|------------|
| Restore code and conversation | Koodi + keskustelu | — |
| Restore conversation | ❌ Koodi | ✅ Keskustelu |
| **Restore code** | ✅ Koodi | ✅ Keskustelu |

!!! tip
    Tämän avulla voit **virittää** uudelleen sen osan koodista, joka meni pieleen —
    säilyttäen samalla keskustelun, jossa päätit mistä on kyse.

---

*Lähde: Esimerkki 28 [S1], [S4]*
