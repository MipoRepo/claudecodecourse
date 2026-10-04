# Johdanto OpenRouteriin

## Mikä OpenRouter on?

[OpenRouter](https://openrouter.ai/) on palvelu, joka tarjoaa yhden yhtenäisen API-rajapinnan useiden eri tekoälymallien käyttämiseen.

Sen sijaan, että jokaiselle mallitarjoajalle (kuten Anthropic, OpenAI tai Google) tarvitsisi rakentaa ja ylläpitää erillistä integraatiota, OpenRouter toimii älykkäänä välikerroksena sovelluksesi ja tekoälymallien välillä.

```text
OMA SOVELLUS / AGENTTI / TYÖKALU
              │
              │ API
              ▼
         OPENROUTER
              │
       ┌──────┼──────────────┐
       ▼      ▼              ▼
     Malli A  Malli B       Malli C
```

Tämä mahdollistaa saman API-yhteyden hyödyntämisen useiden eri mallien kanssa. Käytettävää mallia voidaan vaihtaa joko:

* **muuttamalla vain mallin tunnistetta** (`model: "provider/model-name"`) pyynnön konfiguraatiossa, tai
* **luomalla ja käyttämällä erillisiä malli- tai sovelluskohtaisia API-avaimia**, joille on asetettu OpenRouterin hallinnassa tiettyjä mallirajoituksia, budjettirajoja tai sovelluskohtaisia tunnisteita.

---

## API-kutsujen seuranta ja ilmaiskäyttö

OpenRouter toimii kaikkien pyyntöjen **keskitettynä valvonta- ja hallintakerroksena**. Se seuraa reaaliaikaisesti kaikkea liikennettä, token-määriä sekä mallikohtaista suorituskykyä.

Ilmaismalleja käytettäessä valvontalogiikassa on kriittinen ero maksullisiin malleihin verrattuna:

* **Maksulliset mallit:** Veloitus perustuu kulutettuihin prompt- ja completion-tokeneihin. Token-kulutus määrittelee käytön hinnan.
* **Ilmaismallit ($0 / token):** Koska token-pohjaista veloitusta ei ole, **API-kutsujen seuranta toimii käytön kovana viimeisenä rajana**. OpenRouter valvoo tiukasti kutsujen kokonaismäärää:
  * **RPM (Requests Per Minute):** Kuinka monta kutsua voit lähettää minuutissa.
  * **RPD (Requests Per Day):** Kuinka monta kutsua voit lähettää vuorokaudessa (esim. 50 tai 1 000 kutsua/vrk tilityypistä riippuen).
* **Käytön läpinäkyvyys:** Kaikki kutsuhistoriat, kutsutiheydet ja token-määrät tallentuvat OpenRouterin hallintapaneeliin (*Dashboard*). Näet sieltä suoraan, kuinka lähellä vuorokautista kutsu-rajaa agenttisi tai sovelluksesi liikkuu.

Tämä tekee ilmaiskäytöstä täysin turvallista: kun API-kutsujen vuorokautinen raja tulee täyteen, pyynnöt tyssäävät hallitusti virhekoodiin (429 Too Many Requests) ilman pelkoa yllättävistä kuluista tai luvattomasta laskutuksesta.

---

## API-avain, mallin tunniste ja provider

OpenRouterissa on tärkeää ymmärtää kolme eri käsitettä:

### API-avain

Salainen tunniste, jolla OpenRouter tunnistaa pyynnön lähettäjän. Avain näyttää suunnilleen tältä:

```text
sk-or-v1-xxxxxxxxxxxxxxxx
```

### Mallin tunniste

Määrittää, mitä tekoälymallia käytetään. Esimerkiksi:

```text
 model: "poolside/laguna-s-2.1:free"
```

### Provider

Mallia suorittava palveluntarjoaja. OpenRouter voi välittää saman mallin useiden eri providerien kautta.

!!! warning "Tärkeä ero"
    API-avain ja mallin tunniste **eivät ole sama asia**. API-avaimella tunnistaudutaan OpenRouteriin, ja mallin tunniste määrittää, mitä mallia käytetään.

---

## Claude Code ja OpenRouter

Claude Code voidaan yhdistää OpenRouteriin Anthropic API -yhteensopivuuden kautta. Tyypillinen ympäristöasetusten kokonaisuus on:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
    "ANTHROPIC_AUTH_TOKEN": "sk-or-v1-xxxxxxxx",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_MODEL": "poolside/laguna-s-2.1:free"
  }
}
```

!!! note "Huomio"
    Claude Code on suunniteltu ensisijaisesti Anthropic-malleille. Muiden palveluntarjoajien mallien yhteensopivuus voi vaihdella — katso [LLM-mallin valinta Claude Codessa](../llm-mallin-valinta/claude-codessa.md) tarkempaa ohjetta varten.

---

## Onko OpenRouter ilmainen?

OpenRouterissa on sekä ilmaisia että maksullisia malleja.

**Ilmaismallit** tunnistaa mallin nimen lopussa olevasta `:free`-päätteestä

```text
poolside/laguna-s-2.1:free
```

### Mistä ilmaismallit löytyvät?
Ilmaismalleja voi etsiä Models‑välilehdeltä käyttämällä hakutekijää: **:free**
[OpenRouter – Models](https://openrouter.ai/models)

Ilmaismallien käyttöä rajoitetaan kuitenkin pyyntömäärillä:

| Tilanne | Ilmaiset mallikutsut / vrk | Kutsut / min |
|---------|---------------------------:|-------------:|
| Tili ilman ostettuja krediittejä | **50** | **20** |
| Tilille lisätty vähintään $10 krediittiä | **1 000** | **20** |

**Maksullisissa malleissa** käyttö veloitetaan mallin ja palveluntarjoajan hinnaston perusteella.

!!! tip "Tärkeä periaate"
    Ilmainen malli (`$0 / token`) ei tarkoita rajatonta käyttöä — ilmaismallien pyyntömäärää rajoitetaan erikseen.

---

## OpenRouterin automaattinen reititys

OpenRouterissa on myös automaattinen mallireititys:

```text
openrouter/auto
```

Tässä tilassa OpenRouter valitsee mallin tehtävätyypin, käyttödatan ja kustannustason perusteella. Jos tavoitteena on käyttää aina tiettyä mallia, on parempi määrittää se suoraan.

---

## OpenRouter Default Model – Ilmaismallin asettaminen oletukseksi

OpenRouterin työtilassa (**Workspace**) on asetus nimeltä **Default Model**, joka määrittää:

- mitä mallia sovellukset käyttävät oletuksena  
- mitä mallia käytetään fallback‑mallina, jos pyydetty malli ei ole saatavilla  

---

### Miksi ilmaismalli kannattaa asettaa oletusmalliksi?

Jos käytät OpenRouteria sovelluksissa, agenteissa tai CLI‑työkaluissa, on järkevää asettaa **ilmaismalli** oletukseksi, jotta:

- **kutsut eivät kuluta krediittejä vahingossa**
- **fallback‑malli ei vaihdu maksulliseen malliin**
- **agentit ja skriptit pysyvät kustannusturvallisina**
- **malli on aina saatavilla ilman rajoituksia maksullisten mallien suhteen**

---