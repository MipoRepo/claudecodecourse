# 1.4 Permission Engine (Lupa‑moottori)

## Johdanto

Claude Coden Permission Engine on **kerroksinen lupajärjestelmä**, joka määrittää, mitä agentti saa tehdä projektissä.  
Jokainen toiminto — tiedoston luku, kirjoitus, komennon suoritus, MCP‑kutsu — kulkee **kolmen peräkkäisen kerroksen** läpi:

1. **deny** → estä  
2. **ask** → kysy lupa  
3. **allow** → salli

Tämä järjestys on ehdoton. Se takaa, että vaaralliset toiminnot pysäytetään, epäselvissä tilanteissa kysytään käyttäjältä, ja turvalliset toiminnot sallitaan automaattisesti.

---

## Kerrosmallinen lupajärjestelmä

### 1. deny (estä)

- Tarkistetaan ensin, onko olemassa sääntö, joka **kieltää toiminnon**.  
- Jos kielto löytyy, pyyntö pysäytetään välittömästi.  
- Deny‑säännöt ovat vahvimpia: ne voittavat ask‑ ja allow‑säännöt.

### 2. ask (kysy)

- Jos mitään suoraa kieltoa ei ole, tarkistetaan, vaatiiko toiminto **erillisen luvan**.  
- Claude ei tee mitään automaattisesti, vaan kysyy käyttäjältä tai konfiguraatiolta vahvistuksen.  
- Ask‑kerros toimii varmistusvaiheena.

### 3. allow (salli)

- Jos pyyntöä ei ole kielletty eikä se vaadi lisäkysymystä, se siirtyy allow‑kerrokseen.  
- Toiminto hyväksytään ja suoritetaan.

---

## Tärkeä periaate: järjestys ratkaisee

1. **deny** → jos löytyy, toiminto pysähtyy  
2. **ask** → jos vaatii vahvistusta, käyttäjä päättää  
3. **allow** → jos mikään ei estä, toiminto suoritetaan

Tämä varmistaa:

- vaaralliset toiminnot pysäytetään  
- epäselvissä tilanteissa kysytään  
- turvalliset toiminnot etenevät sujuvasti

---

## Vertauskuva aloittelijalle

Ajattele Permission Engineä kuin **kolmitasoista ovijärjestelmää toimistossa**:

- **Deny = turvamies ovella**  
  Jos kulkulupa puuttuu, hän pysäyttää sinut heti.

- **Ask = vastaanotto**  
  Jos alue ei ole selvästi merkitty, vastaanotto kysyy luvan ennen pääsyä.

- **Allow = avoin toimistotila**  
  Kun olet alueella, johon sinulla on lupa, voit liikkua vapaasti.

Claude toimii samalla logiikalla:  
ensin tarkistetaan, **onko tämä kielletty**, sitten **pitääkö tästä kysyä**, ja lopuksi **sallitaanko tämä automaattisesti**.

---
