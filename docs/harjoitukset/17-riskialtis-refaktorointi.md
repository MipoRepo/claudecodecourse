# Harjoitus 17: Riskialtis refaktorointi haarassa

!!! quote "Tavoite"
    Oppia käyttämään **sessiosta haaroittelua** (`/branch`) sallitakseen
    kokeilemisen ilman pääkäsittelyn häiritsemistä.

## Taustaa

Kun peruslinja (main branch) toimii:

✅ Voit luoda haavan (branch) uutta koodia varten  
✅ Alkuperäinen keskustelu pysyy koskemattomana  
✅ Voit helposti palata takaisin, jos kokeilu epäonnistuu  

Tämä on erityisen tärkeä **riskialtissa refaktoroinnissa**.

## Tehtävä

Olet juuri päättänyt refactoroida komponentin, joka on kriittinen tuotantoon. Miten voit:

1. Pitää pääkäsittelyn koskemattomana?
2. Kokeilla refaktorointia erikseen?
3. Palata takaisin, jos jokin hajoaa?

## Ratkaisu

### Askel 1: Varmista pääkäsittelyn tila

```bash
# Varmista, että pääkäsittelyn testit ovat vihreitä
npm test
```

### Askel 2: Luo haara

```bash
/clause

# Valitse: "Try a different approach"
# Tai suoraan:
/branch try-streaming-approach
```

### Askel 3: Kokeile refaktorointia

Uudessa haarassa:

```bash
claude "Refaktoi UserProvider-komponentti käyttäen React Kontekstia. Älä muuta child-komponentit."
```

### Askel 4: Testaa haara

```bash
npm test
```

### Askel 5: Palaa tai merge

- **Jos kaikki toimii:** `/rewind` → palaa päähaaraan → merge Gitissä
- **Jos jotain saa rikki:** `/branch` → palaa päähaaraan → aloita alusta

!!! warning "VAROITUS 08"
    Sessioiden haajoittelu on **keskustelun haaroittelu**, **ei automaattisesti Git-branchin luominen**.
    Koodin fyysinen erottelu tehdään **worktreeilla**.

!!! tip "ADVANCED-VINKKI 09"
    Asetus `baseRef: "head"` sopii tilanteeseen, jossa nykyisessä pääworktreessa on puskemattomia
    muutoksia ja agentin pitää aloittaa juuri siitä tilasta.

---

*Lähde: Esimerkki 17 [S1], [S5]*
