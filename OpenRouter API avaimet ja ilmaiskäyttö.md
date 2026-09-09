# OpenRouter API -avaimet ja ilmaiskäyttö

## Käytännön yleisohje API-avaimen luomiseen, turvalliseen käyttöön, ilmaismalleihin, käyttörajoihin ja mallin oletusvalintaan

---

## 1. Mikä OpenRouter on?

[OpenRouter](https://openrouter.ai/) on palvelu, joka tarjoaa yhden API-rajapinnan useiden eri tekoälymallien käyttämiseen.

Sen sijaan, että jokaiselle mallipalvelulle tarvitsisi rakentaa erillinen integraatio, OpenRouter toimii välikerroksena:

```text
OMA SOVELLUS / AGENTTI / TYÖKALU
              │
              │ API
              ▼
         OPENROUTER
              │
       ┌──────┼──────────────┐
       ▼      ▼              ▼
     Model A Model B       Model C
```

Tämä mahdollistaa saman API-yhteyden käyttämisen useiden eri mallien kanssa.

Mallia voidaan vaihtaa yleensä muuttamalla vain mallin tunnistetta.

Esimerkiksi:

```text
google/gemma-4-31b-it:free
```

voidaan vaihtaa:

```text
nex-agi/nex-n2.5-pro:free
```

ilman, että koko sovelluksen API-integraatiota tarvitsee rakentaa uudelleen.

---

# 2. Mitä API-avain tarkoittaa?

API-avain on salainen tunniste, jolla OpenRouter tunnistaa API-pyynnön lähettäjän.

Yksinkertaistettuna:

```text
Sovellus
   │
   │ API-avain
   ▼
OpenRouter
   │
   │ tunnistaa tilin
   ▼
LLM
```

API-avain ei ole tekoälymalli.

Se ei myöskään itsessään määrittele, mikä malli vastaa.

Mallin valinta tehdään erikseen.

Esimerkiksi:

```text
API KEY
   │
   ├── Gemma
   ├── Nex
   ├── Nemotron
   ├── Claude
   └── jokin muu malli
```

---

# 3. API-avain ja mallin tunniste ovat eri asioita

Tämä ero on erittäin tärkeä.

### API-avain

Esimerkiksi:

```text
sk-or-v1-xxxxxxxxxxxxxxxx
```

### Mallin tunniste

Esimerkiksi:

```text
nex-agi/nex-n2.5-pro:free
```

Nämä eivät saa mennä sekaisin.

Sovelluksen asetuksissa voi esimerkiksi olla:

```json
{
  "api_key": "sk-or-v1-xxxxxxxx",
  "model": "nex-agi/nex-n2.5-pro:free"
}
```

Ensimmäinen liittyy tunnistautumiseen.

Toinen määrittää käytettävän mallin.

---

# 4. Tarvitaanko OpenRouterin käyttöön API-avain?

Kyllä, kun OpenRouteria käytetään API:n kautta.

API-avainta tarvitaan esimerkiksi:

* omissa Python-ohjelmissa
* Node.js-sovelluksissa
* agenteissa
* automaatioissa
* ohjelmointityökaluissa
* Claude Code -tyyppisissä kehitystyökaluissa
* muissa OpenRouteria tukevissa sovelluksissa

API-avain luodaan OpenRouterin asetuksista.

---

# 5. API-avaimen luominen

Siirry OpenRouteriin:

https://openrouter.ai/settings/keys

Kirjaudu sisään.

Luo uusi API-avain.

Avain näyttää suunnilleen tältä:

```text
sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx
```

**Älä julkaise tätä avainta.**

Älä esimerkiksi laita sitä:

```text
GitHubiin
GitLabiin
README.md-tiedostoon
Markdown-tiedostoon
verkkosivulle
JavaScript-lähdekoodiin
Discordiin
kuvakaappaukseen
julkiseen keskusteluun
```

---

# 6. Miksi API-avainta pitää suojata?

API-avain antaa mahdollisuuden tehdä API-pyyntöjä OpenRouter-tilisi kautta.

Jos avain joutuu vääriin käsiin, joku toinen voi käyttää sitä.

Perusriski on:

```text
API-avain vuotaa
      │
      ▼
Joku saa avaimen
      │
      ▼
API-pyyntöjä tehdään
      │
      ▼
Tilin käyttörajoja voidaan kuluttaa
```

Siksi API-avainta kannattaa käsitellä samalla tavalla kuin salasanaa.

---

# 7. Älä kirjoita API-avainta suoraan lähdekoodiin

Huono tapa:

```javascript
const apiKey = "sk-or-v1-xxxxxxxx";
```

Tai:

```python
OPENROUTER_API_KEY = "sk-or-v1-xxxxxxxx"
```

Tai:

```json
{
  "api_key": "sk-or-v1-xxxxxxxx"
}
```

Jos tiedosto päätyy versionhallintaan, avain voi samalla päätyä Git-repositorioon.

---

# 8. Parempi tapa: ympäristömuuttuja

Yleinen ratkaisu on käyttää ympäristömuuttujaa:

```text
OPENROUTER_API_KEY
```

Linux/macOS:

```bash
export OPENROUTER_API_KEY="sk-or-v1-xxxxxxxx"
```

Python:

```python
import os

api_key = os.environ["OPENROUTER_API_KEY"]
```

Node.js:

```javascript
const apiKey = process.env.OPENROUTER_API_KEY;
```

Tällöin API-avain ei tarvitse olla lähdekoodissa.

---

# 9. Windowsissa ympäristömuuttuja

PowerShellissä voidaan käyttää:

```powershell
$env:OPENROUTER_API_KEY="sk-or-v1-xxxxxxxx"
```

Sovellus voi sen jälkeen lukea muuttujan ympäristöstä.

Turvallisempi tarkistus kuin avaimen tulostaminen:

```powershell
if ($env:OPENROUTER_API_KEY) {
    Write-Host "API-avain on asetettu"
} else {
    Write-Host "API-avainta ei ole asetettu"
}
```

API-avainta ei yleensä ole hyvä tulostaa kokonaisuudessaan terminaaliin.

---

# 10. `.env`-tiedosto

Monissa ohjelmistoprojekteissa käytetään `.env`-tiedostoa:

```text
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx
```

Tällöin `.env` kannattaa lisätä `.gitignore`-tiedostoon:

```gitignore
.env
.env.*
```

Näin paikallinen salaisuus ei päädy vahingossa versionhallintaan.

---

# 11. Claude Code ja OpenRouter

Claude Code voidaan yhdistää OpenRouteriin Anthropic API -yhteensopivuuden kautta.

Tyypillinen ympäristöasetusten kokonaisuus on esimerkiksi:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
    "ANTHROPIC_AUTH_TOKEN": "sk-or-v1-xxxxxxxx",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_MODEL": "nex-agi/nex-n2.5-pro:free"
  }
}
```

Tässä:

```text
ANTHROPIC_BASE_URL
        │
        └── API-pyynnöt OpenRouteriin

ANTHROPIC_AUTH_TOKEN
        │
        └── OpenRouter API-avain

ANTHROPIC_MODEL
        │
        └── käytettävä malli
```

OpenRouter tarjoaa Claude Code -integraation Anthropic Messages API -yhteensopivuuden kautta.

On kuitenkin hyvä huomata, että Claude Code on suunniteltu ensisijaisesti Anthropic-malleille. Muiden palveluntarjoajien mallien yhteensopivuus voi vaihdella.

---

# 12. OpenRouterin ilmaiskäyttö – miten se toimii?

Tämä on kohta, jossa OpenRouterin nykyinen käyttörajoitus on erityisen tärkeä.

OpenRouterilla on ilmaismalleja, joiden token-hinta on:

```text
$0 input
$0 output
```

Ilmaismallit tunnistaa yleensä mallin nimen lopussa olevasta:

```text
:free
```

Esimerkiksi:

```text
malli/nimi:free
```

### Nykyinen ilmaismallien pyyntöraja

OpenRouterin nykyisen virallisen dokumentaation mukaan:

| Tilanne                                  | Ilmaiset mallikutsut / vrk | Kutsut / min |
| ---------------------------------------- | -------------------------: | -----------: |
| Tili ilman ostettuja krediittejä         |                     **50** |       **20** |
| Tilille lisätty vähintään $10 krediittiä |                  **1 000** |       **20** |

OpenRouter ilmoittaa siis tällä hetkellä **1 000**, ei 5 000 ilmaista mallikutsua vuorokaudessa $10 krediitillä.

$10 krediitti on kertaluonteinen krediittiosto, ei kuukausimaksu. Ostettu krediitti jää tilille käytettäväksi myös maksullisiin malleihin.

### Tärkeä huomio

Ilmaisen mallin:

```text
$0 / token
```

ei siis tarkoita:

```text
rajattomasti API-kutsuja
```

Ilmaisilla malleilla on erilliset pyyntörajat.

---

# 13. Onko OpenRouter täysin ilmainen?

Ei kokonaisuutena.

OpenRouterissa on sekä:

```text
ILMAISIA MALLEJA
```

että:

```text
MAKSULLISIA MALLEJA
```

Ilmaisella mallilla voidaan käyttää APIa ilman mallikohtaista token-hintaa, mutta ilmaismallien käyttöä rajoitetaan pyyntömäärillä.

Maksullisissa malleissa käyttö veloitetaan mallin ja palveluntarjoajan hinnaston perusteella.

---

# 14. Mitä `:free` tarkoittaa?

Jos mallin tunniste päättyy:

```text
:free
```

se tarkoittaa, että kyseessä on mallin ilmainen variantti.

Esimerkiksi:

```text
google/gemma-4-26b-a4b:free
```

Ilmaismallien valikoima muuttuu ajan myötä, joten mallin nykyinen saatavuus kannattaa aina tarkistaa OpenRouterin mallilistasta.

---

# 15. Ilmaismalli ei tarkoita rajatonta käyttöä

Tärkeä periaate:

```text
FREE
≠
UNLIMITED
```

Esimerkiksi 50 päivittäistä kutsua voi kulua nopeasti agenttityökalussa.

Jos yksi tehtävä aiheuttaa:

```text
10 API-kutsua
```

niin:

```text
50 / 10 = 5 tehtävää
```

teoreettisesti kuluttaisi koko päivän 50 pyynnön kiintiön.

Agentin todellinen kulutus riippuu kuitenkin tehtävästä.

---

# 16. Miksi agentti kuluttaa paljon API-kutsuja?

Tavallinen chatbot:

```text
Käyttäjä
   │
   ▼
LLM
   │
   ▼
Vastaus
```

Agentti voi toimia näin:

```text
Käyttäjä
   │
   ▼
LLM
   │
   ├── lue tiedosto
   │
   ├── analysoi
   │
   ├── suorita komento
   │
   ├── lue tulos
   │
   ├── muuta tiedostoa
   │
   ├── suorita testi
   │
   ├── analysoi virhe
   │
   ├── korjaa
   │
   └── testaa uudelleen
   │
   ▼
Valmis
```

Yksi käyttäjän tehtävä voi siis synnyttää suuren määrän mallikutsuja.

---

# 17. Jos haluat pitää OpenRouter-käytön täysin ilmaisena

Hyvä käytäntö on yhdistää kaksi eri suojausta:

```text
1. API-avaimen käyttöraja = $0
2. Käytettäväksi oletusmalliksi määritetään :free-malli
```

Näillä on eri tarkoitus.

### API-avaimen $0-raja

API-avaimelle voidaan määrittää käyttöraja:

```text
$0
```

Tällöin avain ei saa synnyttää maksullista käyttöä.

### Tärkeä huomio tyhjästä kentästä

Jos käyttörajan kenttä jätetään tyhjäksi, se **ei tarkoita nollaa**.

Se tarkoittaa:

```text
ei asetettua käyttörajaa
```

eli rajoittamatonta kyseisen asetuksen näkökulmasta.

Siksi täysin ilmaiseen käyttöön tarkoitettu avain kannattaa määrittää eksplisiittisesti:

```text
Limit = $0
```

eikä jättää kenttää tyhjäksi.

---

# 18. Miksi $0-raja on hyvä käytäntö?

Ajatellaan tilannetta:

```text
API-avain
   │
   ├── Free model
   │
   └── Paid model
```

Jos sovellus tai käyttäjä vahingossa vaihtaa maksulliseen malliin, ilman kulutusrajaa pyyntö voi teoriassa siirtyä maksulliseen käyttöön.

Jos avaimelle on asetettu:

```text
$0
```

maksullinen käyttö estetään käyttörajan saavuttamisen vuoksi.

Tämä on erityisen hyödyllistä:

* opiskelussa
* kokeilussa
* opetuksessa
* testiprojekteissa
* uusien työkalujen arvioinnissa
* lasten tai opiskelijoiden käyttöön tarkoitetuissa ympäristöissä
* tilanteissa, joissa kustannusten on ehdottomasti pysyttävä nollassa

---

# 19. API-avaimen käyttöraja ja ilmaismallien pyyntöraja ovat eri asioita

Näitä ei pidä sekoittaa.

### API-avaimen kulutusraja

```text
$0
```

rajoittaa rahallista käyttöä.

### Free-mallien päivittäinen pyyntöraja

Esimerkiksi:

```text
50 / vrk
```

tai vähintään $10 krediittiä lisänneellä tilillä:

```text
1 000 / vrk
```

rajoittaa ilmaismallien pyyntömäärää.

Näin ollen:

```text
$0 API-key limit
        +
:free model
        =
maksullinen käyttö estetty
```

mutta:

```text
päivittäinen free-request limit
        =
kuinka monta ilmaista pyyntöä voidaan tehdä
```

---

# 20. Oletusmallin määrittäminen Routing / Preset -asetuksissa

OpenRouterissa mallivalinta voidaan määrittää myös Preset-asetuksella.

Presetissä voidaan määrittää esimerkiksi:

```text
Default model
System prompt
Provider preferences
Sampling parameters
```

OpenRouterin dokumentaation mukaan Presetissä voidaan määrittää oletusmalli ja muita malliasetuksia, ja Preset voidaan sen jälkeen ottaa käyttöön eri sovelluksissa.

Tämä on hyödyllinen tapa keskittää mallin oletusvalinta.

Esimerkiksi:

```text
Preset
  │
  ├── Default model
  │      └── valittu :free-malli
  │
  ├── Provider preferences
  │
  └── muut asetukset
```

---

# 21. Miksi oletusmalli kannattaa määrittää?

Jos tarkoituksena on käyttää tiettyä ilmaista mallia, kannattaa määrittää se oletusmalliksi sen sijaan, että jokaisessa sovelluksessa valinta tehdään erikseen.

Esimerkiksi:

```text
Default model:
nex-agi/nex-n2.5-pro:free
```

Tällöin mallivalinta voidaan keskittää yhteen Preset-konfiguraatioon.

Tämä vähentää tilanteita, joissa sovellus vahingossa käyttää jotakin muuta mallia.

---

# 22. Mallin oletusvalinta ja `openrouter/auto` ovat eri asia

OpenRouterissa on myös automaattinen reititys:

```text
openrouter/auto
```

Tällöin OpenRouter valitsee mallin tehtävän perusteella.

Nykyinen Auto Router käyttää muun muassa tehtävätyyppejä, OpenRouter-yhteisön viimeaikaista käyttödataa ja kustannustasoa mallin valinnassa.

Jos tavoitteena on:

```text
aina sama tietty malli
```

älä käytä automaattista mallivalintaa tähän tarkoitukseen.

Käytä:

```text
tietty oletusmalli
```

tai Presetiä, jossa tietty malli on määritetty.

---

# 23. Free Models Router ja tietyn mallin valinta

OpenRouterissa on myös ilmaisten mallien automaattinen reititys.

Tällainen ratkaisu voi olla hyödyllinen kokeiluun:

```text
openrouter/free
```

Se ei kuitenkaan tarkoita:

```text
käytä aina juuri tätä mallia
```

Vaan OpenRouter voi valita sopivan saatavilla olevan ilmaisen mallin.

Jos halutaan testata tietyn mallin suorituskykyä, käytä suoraan kyseisen mallin tunnistetta.

---

# 24. Miksi tietty malli kannattaa määrittää testeissä?

Jos vertaillaan malleja, testin pitää olla mahdollisimman vakaa.

Esimerkiksi:

```text
Testi
 │
 ├── Model A
 ├── Model B
 └── Model C
```

Jos käytetään automaattista reititystä:

```text
Testi A → Model X
Testi B → Model Y
Testi C → Model Z
```

mallien vertailusta tulee vaikeampaa.

Siksi benchmarkissa kannattaa yleensä lukita testattava malli.

---

# 25. API-avaimen turvallinen käyttö Claude Codessa tai muussa työkalussa

Älä laita API-avainta projektin dokumentaatioon:

```text
docs/openrouter.md
README.md
mkdocs.yml
config.json
```

ellei kyseessä ole tarkoituksellisesti salaisuuksilta suojattu mekanismi.

Parempi:

```text
Environment variable
        │
        ▼
Sovellus
        │
        ▼
OpenRouter
```

---

# 26. Jos API-avain vuotaa

Toimi nopeasti.

Perusprosessi:

```text
VUOTANUT AVAIN
      │
      ▼
POISTA / REVOKE
      │
      ▼
LUO UUSI AVAIN
      │
      ▼
PÄIVITÄ KÄYTTÖYMPÄRISTÖ
```

Älä jatka vuotaneen avaimen käyttöä vain siksi, että poistit sen näkyvistä Git-repositoriosta.

Jos avain on ollut julkisesti saatavilla, sitä tulee pitää kompromettoituna.

---

# 27. API-avaimen käyttö Gitissä

Huono:

```text
config.json
.env
secrets.json
settings.json
```

versionhallinnassa oikean API-avaimen kanssa.

Parempi:

```gitignore
.env
.env.*
secrets/
```

CI/CD-ympäristössä käytetään yleensä versionhallintapalvelun salaisuuksien hallintaa.

---

# 28. API-avain ja GitHub

Jos projekti julkaistaan GitHubiin:

```text
❌ API-avain lähdekoodissa
❌ API-avain README:ssä
❌ API-avain Markdownissa
❌ API-avain kuvakaappauksessa
❌ API-avain commitissa
```

Parempi:

```text
GitHub Secrets
       │
       ▼
CI/CD
       │
       ▼
OPENROUTER_API_KEY
```

---

# 29. API-avaimen käyttörajan asettaminen

Kun tavoitteena on täysin ilmainen käyttö, hyvä käytäntö on:

```text
API key
   │
   └── Usage limit: $0
```

Tärkeää:

```text
$0
```

ja:

```text
tyhjä kenttä
```

eivät tarkoita samaa asiaa.

```text
$0
=
maksullista käyttöä ei sallita

tyhjä
=
rajaa ei ole asetettu
```

Tämä ero kannattaa tarkistaa aina ennen API-avaimen käyttöönottoa.

---

# 30. Free-mallien käytön kustannusmalli

Täysin ilmaiseen käyttöön voidaan muodostaa seuraava rakenne:

```text
             OPENROUTER
                  │
          ┌───────┴────────┐
          │                │
       API KEY          MODEL
          │                │
       LIMIT $0         :free
          │                │
          └───────┬────────┘
                  │
                  ▼
             API REQUEST
                  │
                  ▼
             $0 COST
```

Tämän lisäksi ilmaismallien päivittäinen pyyntömäärä rajoittaa käyttöä.

---

# 31. $10 krediitin vaikutus

OpenRouterin nykyisen dokumentaation mukaan vähintään $10 krediitin lisääminen nostaa ilmaismallien päivittäisen pyyntökiintiön:

```text
50 / vrk
```

→

```text
1 000 / vrk
```

Per minuutti raja säilyy:

```text
20 / min
```

Krediitti ei kuitenkaan tarkoita, että kaikki OpenRouterin mallit muuttuisivat ilmaisiksi.

Se ainoastaan nostaa ilmaismallien käyttörajaa ja samalla tilille tulee krediittiä, jota voidaan käyttää maksullisiin malleihin.

---

# 32. Miksi $10 krediitti voi olla hyödyllinen?

Jos tarvitset enemmän kuin:

```text
50 ilmaista pyyntöä / vrk
```

mutta et halua vielä käyttää maksullisia malleja, $10 krediitin lisääminen nostaa ilmaismallien päivittäisen kiintiön nykyisen dokumentaation mukaan:

```text
1 000 pyyntöön / vrk
```

Koska $10 jää tilille krediitiksi, kyse ei ole pelkästään käyttömaksusta.

---

# 33. Huomio: $10 ei tarkoita 1 000 maksullista pyyntöä

Tässä on jälleen tärkeä ero.

```text
$10 credits
```

ei tarkoita:

```text
1 000 maksullista API-kutsua
```

Vaan OpenRouterin nykyinen free-tier-sääntö nostaa:

```text
free model requests/day
```

rajan 50:stä 1 000:een.

Maksulliset mallit käyttävät edelleen tilin krediittisummaa mallin hinnan mukaisesti.

---

# 34. Agentin API-kulutus

Agenttipohjaisessa käytössä kannattaa seurata:

```text
API requests
tokens
errors
rate limits
latency
model
provider
cost
```

Yksi käyttäjän antama tehtävä voi aiheuttaa:

```text
1
2
5
10
20
50+
```

API-kutsua tehtävästä riippuen.

Siksi päivittäinen pyyntökiintiö ei vastaa suoraan käyttäjän tekemien tehtävien määrää.

---

# 35. Free-mallin valinta

OpenRouterin ilmaismallien valikoima muuttuu jatkuvasti.

Mallia valittaessa kannattaa tarkistaa ainakin:

```text
[ ] :free-variantti olemassa
[ ] input-hinta
[ ] output-hinta
[ ] context window
[ ] tool calling
[ ] structured output
[ ] coding
[ ] reasoning
[ ] saatavuus
[ ] rate limits
```

Ajantasainen mallilista kannattaa tarkistaa OpenRouterin omalta Models-sivulta.

---

# 36. Mallia ei pidä arvioida pelkän tekstivastauksen perusteella

Esimerkiksi:

> Kirjoita Python-funktio.

on melko kevyt testi.

Monimutkaisemmassa käytössä kannattaa testata:

```text
Lue tiedosto
      ↓
Analysoi
      ↓
Muokkaa
      ↓
Suorita testi
      ↓
Lue virhe
      ↓
Korjaa
      ↓
Testaa uudelleen
```

Tällöin testataan mallin todellista kykyä toimia osana työkaluketjua.

---

# 37. Tool calling

Agenttisovelluksissa mallilta voidaan edellyttää työkalujen käyttämistä.

Esimerkiksi:

```text
Read
Write
Edit
Bash
Search
Database
Web
```

Mallin hyvä tekstintuotanto ei vielä tarkoita, että sen tool calling toimii hyvin.

Siksi mallin valinnassa kannattaa tarkistaa erikseen:

```text
Tool calling support
```

OpenRouter optimoi nykyisin työkalukutsuja sisältävissä pyynnöissä provider-valintaa Auto Exacto -mekanismilla, joka huomioi muun muassa tool-callingin onnistumisasteen ja suorituskyvyn.

---

# 38. Provider on myös tärkeä

OpenRouterin kautta sama malli voi olla saatavilla useiden palveluntarjoajien kautta.

Siksi:

```text
MODEL
```

ja:

```text
PROVIDER
```

ovat eri asioita.

OpenRouterin routing voi esimerkiksi valita providerin kustannuksen, nopeuden, saatavuuden tai muiden määritettyjen ehtojen perusteella.

---

# 39. Malli- ja provider-routing

OpenRouterissa on kaksi eri routing-tasoa:

```text
1. Mikä malli?
        │
        ▼
2. Mikä provider käyttää mallia?
```

Esimerkiksi:

```text
Mallin valinta
      │
      ▼
Gemma
      │
      ▼
Provider routing
      │
 ┌────┼────┐
 ▼    ▼    ▼
 A    B    C
```

Tämä on tärkeää ymmärtää, koska mallin valitseminen ei välttämättä vielä tarkoita, että tiedät missä providerissa kyseinen pyyntö suoritetaan.

---

# 40. Fallbackit

OpenRouter tukee myös fallback-malleja.

Esimerkiksi:

```text
Primary model
      │
      ▼
Model A
      │
      │ epäonnistuu
      ▼
Model B
      │
      │ epäonnistuu
      ▼
Model C
```

OpenRouterin dokumentaation mukaan mallifallbackit voidaan määrittää mallilistana prioriteettijärjestyksessä.

**Täysin ilmaista käyttöä tavoiteltaessa fallback-mallien kanssa pitää olla tarkkana.**

Jos fallback-listassa on maksullinen malli, järjestelmä voi yrittää käyttää sitä, ellei käyttörajoitus estä sitä.

---

# 41. Täysin ilmaisen käytön suositeltu rakenne

Kun tavoitteena on ehdottomasti:

> "En halua tämän API-avaimen aiheuttavan minulle kustannuksia."

hyvä lähtökohta on:

```text
API KEY
   │
   ├── Usage limit: $0
   │
   └── käytä vain ilmaismalleja
             │
             ▼
        :free-model
```

Lisäksi:

```text
Fallbackit
   │
   └── vain :free-malleja
```

jos fallbackeja tarvitaan.

---

# 42. Oletusmallin suositeltu rakenne

Jos halutaan käyttää aina tiettyä ilmaismallia:

```text
Preset
   │
   └── Default model
          │
          ▼
       model:free
```

Esimerkiksi:

```text
Default model:
google/gemma-4-26b-a4b:free
```

Tällöin oletusmalli on selkeästi määritetty.

OpenRouterin Presets tukevat oletusmallin sekä provider-asetusten ja muiden malliasetusten määrittämistä.

---

# 43. `openrouter/auto` vai tietty malli?

### Käytä tiettyä mallia, kun:

```text
haluat toistettavan ympäristön
haluat benchmarkata mallia
haluat tietää tarkalleen mikä malli vastaa
haluat hallita kustannuksia tarkasti
```

### Käytä Auto Routeria, kun:

```text
et halua valita mallia itse
haluat OpenRouterin optimoivan mallivalinnan
tehtävät vaihtelevat paljon
```

Nykyinen Auto Router tekee mallivalinnan tehtävätyypin ja kustannustason perusteella.

---

# 44. API-avaimen turvallinen käyttö

Älä julkaise:

```text
sk-or-v1-xxxxxxxx
```

Älä myöskään julkaise API-avainta:

```text
GitHubissa
GitLabissa
README:ssä
Markdownissa
forumilla
Discordissa
videossa
kuvakaappauksessa
```

Käytä mieluummin:

```text
Environment variables
.env + .gitignore
Secrets management
CI/CD secrets
```

---

# 45. Jos API-avain vuotaa

Toimi välittömästi:

```text
1. Revoke/Delete key
        ↓
2. Tarkista käyttö
        ↓
3. Luo uusi key
        ↓
4. Päivitä ympäristö
        ↓
5. Tarkista Git-historia
```

Pelkkä tiedoston poistaminen nykyisestä Git-versiosta ei välttämättä riitä, jos avain on jo ollut commit-historiassa.

---

# 46. Free-mallien tärkeät rajoitukset

Ilmaisessa käytössä kannattaa huomioida:

```text
päivittäinen request limit
request/minute limit
mallin saatavuus
providerin saatavuus
context window
tool calling
latency
mallin vaihtuminen
```

Lisäksi OpenRouterin nykyisen ohjeen mukaan myös epäonnistuneet free-tier-pyynnöt voivat kuluttaa päivittäistä free-request-kiintiötä.

Tämä on erityisen tärkeää, jos sovelluksessa on automaattinen retry-loop.

---

# 47. Retry-loop voi kuluttaa kiintiön nopeasti

Esimerkiksi:

```text
API request
   │
   ▼
ERROR
   │
   ▼
retry
   │
   ▼
ERROR
   │
   ▼
retry
   │
   ▼
ERROR
```

Jos tämä tapahtuu useita kertoja, jokainen pyyntö voi kuluttaa free-tier-kiintiötä.

Siksi retry-logiikka kannattaa suunnitella huolellisesti.

---

# 48. API-avaimen tärkein suojaus

Jos käyttö halutaan pitää varmasti maksuttomana:

```text
API key
   │
   └── limit = $0
```

Älä jätä käyttörajakenttää tyhjäksi ajatellen:

```text
"Tyhjä = 0"
```

vaan:

```text
Tyhjä = ei asetettua rajaa
$0    = nollaraja
```

Tämä ero on erittäin tärkeä.

---

# 49. Käytännön täysin ilmaisen käytön asetukset

Tavoite:

> Käytän OpenRouteria ilmaiseksi enkä halua vahingossa käyttää krediittejä.

Suositeltava perusperiaate:

```text
┌──────────────────────────────┐
│ OpenRouter API Key            │
│                              │
│ Usage limit: $0              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Preset / Routing              │
│                              │
│ Default model:               │
│ <valittu-malli>:free         │
└──────────────┬───────────────┘
               │
               ▼
        Free model requests
```

Jos käytät fallbackeja, myös niiden kannattaa olla ilmaismalleja, jos kustannusten on pysyttävä ehdottomasti nollassa.

---

# 50. API-yhteyden testaaminen

API:n toiminta voidaan testata esimerkiksi OpenRouterin OpenAI-yhteensopivan rajapinnan kautta.

Perusperiaate:

```http
Authorization: Bearer $OPENROUTER_API_KEY
```

Esimerkiksi:

```powershell
$headers = @{
    Authorization = "Bearer $env:OPENROUTER_API_KEY"
    "Content-Type" = "application/json"
}
```

Tämä testaa kuitenkin ensisijaisesti:

```text
API-yhteys
+
API-avain
+
mallin saatavuus
```

Se ei vielä todista, että malli toimii hyvin agenttina.

---

# 51. API-testi ja agenttitesti ovat eri asioita

### Testi 1

```text
Saanko API-vastauksen?
```

### Testi 2

```text
Onko vastaus laadukas?
```

### Testi 3

```text
Toimiiko tool calling?
```

### Testi 4

```text
Pystyykö malli käyttämään tiedostoja ja työkaluja?
```

### Testi 5

```text
Pystyykö agentti ratkaisemaan monivaiheisen tehtävän?
```

Nämä ovat eri testejä.

---

# 52. Mallin todellinen agenttitesti

Esimerkiksi:

```text
Tutki projektin rakenne.

1. Etsi backend.
2. Selvitä käytetty tietokanta.
3. Etsi konfiguraatiotiedosto.
4. Tarkista mahdolliset virheet.
5. Tee tarvittava korjaus.
6. Suorita testit.
7. Jos testi epäonnistuu, analysoi virhe.
8. Korjaa virhe.
9. Suorita testi uudelleen.
10. Raportoi tehdyt muutokset.
```

Tämä testaa:

```text
file handling
reasoning
tool calling
planning
command execution
error recovery
verification
```

---

# 53. Mallien vertailu

Jos useita malleja verrataan, käytä samaa testiä:

```text
                  TESTI
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
      MODEL A     MODEL B     MODEL C
```

Arvioi esimerkiksi:

```text
1. Oikeellisuus
2. Tool calling
3. Nopeus
4. Virheiden määrä
5. Contextin hallinta
6. Muutosten laatu
7. Testien läpäisy
8. Virheistä palautuminen
9. API-kulutus
10. Kokonaiskustannus
```

Näin mallia voidaan arvioida todellisen käyttötarkoituksen perusteella.

---

# 54. OpenRouter + agentti – tärkeä kokonaiskuva

Yleinen arkkitehtuuri on:

```text
              SOVELLUS / AGENTTI
                       │
                       ▼
                 OPENROUTER API
                       │
              ┌────────┴────────┐
              │                 │
           MODEL             ROUTING
              │                 │
              ▼                 ▼
            LLM              PROVIDER
```

Tässä on kolme eri asiaa:

```text
API
```

vastaa yhteydestä ja tunnistautumisesta.

```text
MODEL
```

määrittää tekoälymallin.

```text
ROUTING
```

määrittää, miten OpenRouter valitsee mallin ja providerin.

---

# 55. Lopullinen turvallisuuschecklist

```text
[ ] OpenRouter-tili luotu
[ ] API-avain luotu
[ ] API-avain säilytetään salassa
[ ] API-avain ei ole Git-repositoriossa
[ ] .env on .gitignoressa
[ ] API-avaimen käyttöraja tarkistettu
[ ] Jos halutaan täysin ilmainen käyttö: limit = $0
[ ] Tyhjää käyttörajakenttää ei ole tulkittu nollarajaksi
[ ] Käytettävä malli on :free
[ ] Oletusmalli on määritetty tarvittaessa Presetiin
[ ] Fallback-mallit tarkistettu
[ ] Maksullisia malleja ei ole vahingossa sallittu
[ ] Rate limit ymmärretty
[ ] Päivittäinen free-request limit ymmärretty
[ ] Tool calling tarkistettu
[ ] Context window tarkistettu
[ ] Mallin saatavuus tarkistettu
```

---

# 56. Täysin ilmaisen käytön pikaohje

Jos tavoitteena on pitää käyttö mahdollisimman yksinkertaisena ja kustannukset varmasti nollassa:

```text
1. Luo OpenRouter-tili
        ↓
2. Luo API-avain
        ↓
3. Aseta API-avaimelle käyttörajaksi $0
        ↓
4. Älä jätä käyttörajaa tyhjäksi
        ↓
5. Valitse :free-malli
        ↓
6. Aseta haluttu malli oletusmalliksi
        ↓
7. Vältä maksullisia fallback-malleja
        ↓
8. Testaa API
        ↓
9. Testaa todellinen käyttötapaus
        ↓
10. Seuraa käyttörajoja
```

Nykyisen OpenRouter-dokumentaation perusteella ilmaismallien pyyntökiintiö on tällä hetkellä **50 pyyntöä/vrk ilman krediittiostoa ja 1 000 pyyntöä/vrk, kun krediittejä on lisätty vähintään $10**.

---

# 57. Tärkeimmät asiat yhdellä silmäyksellä

| Asia               | Merkitys                                           |
| ------------------ | -------------------------------------------------- |
| API key            | Tunnistaa OpenRouter-tilin                         |
| Model              | Määrittää käytettävän LLM:n                        |
| `:free`            | Mallin ilmainen variantti                          |
| API key limit `$0` | Estää maksullisen käytön kyseisellä avaimella      |
| Tyhjä limit-kenttä | Ei aseta kulutusrajaa                              |
| Free limit         | Rajoittaa ilmaisten mallikutsujen määrää           |
| $10 credits        | Nostaa free-mallien päivärajan nykyisin 50 → 1 000 |
| Preset             | Voi sisältää oletusmallin ja muita asetuksia       |
| Routing            | Ohjaa mallin ja providerin valintaa                |
| `openrouter/auto`  | Automaattinen mallivalinta                         |
| Fallback           | Varamalli virhetilanteessa                         |
| Provider           | Mallia suorittava palveluntarjoaja                 |
| Tool calling       | Mallin kyky käyttää työkaluja                      |
| Context window     | Mallin käsittelemän kontekstin koko                |

---

# 58. Lopputiivistelmä

OpenRouteria käytettäessä kannattaa pitää mielessä neljä eri asiaa:

```text
             API KEY
                │
                ▼
        TUNNISTAUTUMINEN
                │
                ▼
             MODEL
                │
                ▼
            ROUTING
                │
                ▼
            PROVIDER
```

Jos tavoitteena on **täysin maksuton käyttö**, turvallinen lähtökohta on:

```text
API key limit = $0
        +
Default model = <haluttu>:free
        +
Ei maksullisia fallback-malleja
```

Ja erityisesti:

```text
$0
```

ei saa sekoittaa tyhjään kenttään.

```text
$0    → nollaraja
tyhjä → ei asetettua rajaa
```

Ilmaismallien tämänhetkinen OpenRouter-raja on virallisen dokumentaation mukaan:

```text
50 pyyntöä / vrk
```

ilman krediittejä ja:

```text
1 000 pyyntöä / vrk
```

kun tilille on lisätty vähintään $10 krediittiä. Molemmissa tapauksissa ilmoitettu rajoitus on tällä hetkellä 20 pyyntöä minuutissa.

OpenRouterin mallit, hinnat, saatavuus ja free-tier-säännöt voivat muuttua. Siksi ajantasainen tilanne kannattaa tarkistaa aina OpenRouterin omasta dokumentaatiosta ja mallilistasta ennen käyttöönottoa.
