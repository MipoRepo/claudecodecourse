# Harjoitus 02: Kontekstin kulutuksen seuranta

!!! quote "Tavoite"
    Oppia tarkastamaan kontekstin kulumisen ja käyttämään `/compact`-toimintoa
    pidemmän keskustelun hallitsemiseksi.

## Taustaa

Konteksti (context) = **kaiken, mitä Claude "muistaa" kyseisessä istunnossa**. Tämä sisältää:

- keskustelun historian
- kaikki lukemasi tiedostot
- kaikki Bash-komennot ja niiden tulokset
- kaikki sub-agentin palautukset

Kun konteksti kasvaa liian suureksi, Claude alkaa **unoella aikaisempia yksityiskohtia**.

## Tehtävä

1. **Aja pitkä keskustelu:** Avaa Claude Code ja keskustele sillä ainakin 10 viestiä,
   joissa käsitellään monimutteista koodia tai virheitä.
2. **Tarkista konteksti:**
   ```bash
   /context
   ```
3. **Tiivitä keskustelu:**
   ```bash
   /compact
   ```
4. **Kysy vielä:** *Tiivitetty konteksti, keskitty API-muutosten päätöksiin ja avoimiin riskeihin.*

!!! warning "Mikä on ongelma?"
    `/compact` ei taata säilytettävyyttä — jos jokin tärkeä tieto jää "tiivistämättä", sitä menettää.

!!! tip "Vinkki"
    Säilytä kriittiset tiedot **CLI-tulostenä tiedostoihin** (esim. `--output-format json`).

---

## Ratkaisu

### Kontekstin tarkistus

Komennolla `/context` näet kolme numeroa:

```
Käytetty konteksti: 42 500 / 200 000 tokenia (21 %)
```

- **Input tokens**: kaikki syötettyä tekstiä (kesk. + tiedostot)
- **Output tokens**: kaikki Claudein vastauksia
- **Cache hit/miss**: toistuvat tiedostot vs. uudelleen ladatut

### Compact-operaatio

`/compact` toimii näin:

1. Lukee koko keskustelun.
2. Kysyy Claudeilta: "Tiivitä tämä..."
3. Korvaa keskustelun tiivistelmällä.
8. Tallentaa tiivitettu version uutena contextina.

### Esimerkki

```
/compact

Claudelle: Tiivitä tämän keskustelun salientiset tiedot:
- mitkä virheet löydettiin
- mitkä korjaukset on tehty
- mitkä seikat vaativat jatkotoimenpiteitä

Käytetty konteksti ennen: 87 900 / 200 000
Käytetty konteksti jälkeen: 12 300 / 200 000
```

### Parhaat käytännöt

| Tila | Toimenpide |
|------|-----------|
| **Konteksti < 50%** | Jatka normaalisti |
| **Konteksti 50–80%** | Pohti `/compact`-aikaa |
| **Konteksti > 80%** | Tiivitä tai jaa työ uuteen sessioon |

!!! advanced "Edistyneen osaaminen"
    Käytä `--continue`-komentoa jatkamaan samasta sessioista, ja `/branch`-komentoa
    kokeilemään eri lähtöpistemätriä ilman, että menetät keskustelun historian.

---

*Lähde: Esimerkki 02 [S1], [S5]*
