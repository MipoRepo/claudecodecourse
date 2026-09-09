# API-avaimet ja ilmaiskäyttö

## API-avaimen luominen

Siirry OpenRouteriin: [https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)

1. Kirjaudu sisään
2. Luo uusi API-avain
3. Avain näyttää suunnilleen tältä: `sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx`

!!! danger "Älä julkaise API-avainta"
    Älä laita API-avainta seuraaviin paikkoihin:
    
    - GitHub / GitLab -repositorioon
    - `README.md`- tai muuhun markdown-tiedostoon
    - JavaScript-lähdekoodiin
    - Discord-viesteihin tai julkisiin keskusteluihin
    - Kuvakaappauksiin

---

## API-avaimen suojaaminen

### Käytä ympäristömuuttujaa

Älä kirjoita API-avainta suoraan lähdekoodiin:

```python
# Vältä tätä
OPENROUTER_API_KEY = "sk-or-v1-xxxxxxxx"
```

Käytä sen sijaan ympäristömuuttujaa:

**Linux / macOS:**
```bash
export OPENROUTER_API_KEY="sk-or-v1-xxxxxxxx"
```

**Python:**
```python
import os
api_key = os.environ["OPENROUTER_API_KEY"]
```

**Node.js:**
```javascript
const apiKey = process.env.OPENROUTER_API_KEY;
```

**Windows (PowerShell):**
```powershell
$env:OPENROUTER_API_KEY="sk-or-v1-xxxxxxxx"
```

### .env-tiedosto

Monissa projekteissa käytetään `.env`-tiedostoa:

```text
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx
```

Lisää `.env` aina `.gitignore`-tiedostoon:

```gitignore
.env
.env.*
```

---

## Ilmaiskäyttö ja käyttörajat

### Miten `:free`-mallit toimivat?

Ilmaismallit tunnistaa mallin nimen lopussa olevasta `:free`-päätteestä:

```text
google/gemma-4-26b-a4b:free
nex-agi/nex-n2.5-pro:free
```

Ilmaismallien token-hinta on `$0`, mutta niiden käyttöä rajoitetaan pyyntömäärillä.

### Päivittäiset ja minuuttikohtaiset pyyntörajat

| Tilanne | Ilmaiset mallikutsut / vrk | Kutsut / min |
|---------|---------------------------:|-------------:|
| Tili ilman ostettuja krediittejä | **50** | **20** |
| Tilille lisätty vähintään $10 krediittiä | **1 000** | **20** |

!!! warning "Ilmainen ≠ rajaton"
    ```
    FREE ≠ UNLIMITED
    ```
    Esimerkiksi yksi agenttitehtävä voi kuluttaa 10–50 API-kutsua, jolloin 50 vuorokausikohtaista pyyntöä kuluu nopeasti.

### Miksi agentti kuluttaa paljon API-kutsuja?

Tavallinen chatbot tekee yhden kutsun per viesti. Agentti voi yhden tehtävän aikana:

```text
Käyttäjän tehtävä
   │
   ├── lue tiedosto
   ├── analysoi
   ├── suorita komento
   ├── lue tulos
   ├── muuta tiedostoa
   ├── suorita testi
   ├── analysoi virhe
   ├── korjaa
   └── testaa uudelleen
```

Yksi tehtävä voi aiheuttaa 10–50+ API-kutsua.

---

## API-avaimen käyttöraja

### $0-raja maksullisten yllätysten välttämiseksi

API-avaimelle voidaan määrittää käyttöraja estämään maksullinen käyttö:

```text
Usage limit: $0
```

!!! danger "Tyhjä kenttä ei tarkoita nollaa"
    ```
    $0    = maksullista käyttöä ei sallita
    tyhjä = ei asetettua rajaa (rajoittamaton)
    ```
    
    Tyhjää kenttää **ei** pidä tulkita nollarajaksi.

### $0-rajan hyödyt

Jos sovellus tai käyttäjä vahingossa vaihtaa maksulliseen malliin, `$0`-raja estää maksullisen käytön. Tämä on hyödyllistä erityisesti:

- opiskelussa ja kokeilussa
- opetusympäristöissä
- tilanteissa, joissa kustannusten on ehdottomasti pysyttävä nollassa

### Täysin ilmaisen käytön rakenne

```text
API-avain (limit: $0)
         +
:free-malli oletusmalliksi
         =
kustannukset pysyvät nollassa
```

---

## Oletusmallin määrittäminen

### Preset-asetukset

OpenRouterissa voidaan luoda Preset, johon määritetään:

```text
Preset
  │
  ├── Default model: <malli>:free
  ├── Provider preferences
  └── Sampling parameters
```

Tämä vähentää tilanteita, joissa sovellus vahingossa käyttää väärää mallia.

### `openrouter/auto` vs. tietty malli

| Käytä tiettyä mallia, kun: | Käytä Auto Routeria, kun: |
|---------------------------|--------------------------|
| haluat toistettavan ympäristön | et halua valita mallia itse |
| haluat benchmarkata | haluat OpenRouterin optimoivan valinnan |
| haluat tietää tarkalleen mikä vastaa | tehtävät vaihtelevat paljon |
| haluat hallita kustannuksia tarkasti | |

---

## Jos API-avain vuotaa

Toimi välittömästi:

```text
1. Revoke / poista vuotanut avain
        ↓
2. Tarkista käyttöhistoria
        ↓
3. Luo uusi avain
        ↓
4. Päivitä ympäristömuuttujat
        ↓
5. Tarkista Git-historia
```

!!! warning "Tärkeä huomio"
    Pelkkä tiedoston poistaminen nykyisestä Git-versiosta ei riitä, jos avain on jo ollut commit-historiassa. Sitä täytyy pitää kompromettoituna.

---

## Turvallisuuschecklista

```text
[ ] OpenRouter-tili luotu
[ ] API-avain luotu ja säilytetään salassa
[ ] API-avain ei ole Git-repositoriossa
[ ] .env on .gitignoressa
[ ] API-avaimen käyttöraja tarkistettu ($0 tai sopiva raja)
[ ] Tyhjää käyttörajakenttää ei ole tulkittu nollarajaksi
[ ] Käytettävä malli on :free (jos halutaan ilmaiskäyttö)
[ ] Oletusmalli on määritetty tarvittaessa Presetiin
[ ] Fallback-mallit tarkistettu (vain :free-malleja, jos kustannukset halutaan nollaan)
[ ] Rate limit ymmärretty (50/vrk ilman krediittejä, 1 000/vrk $10+ krediiteillä)
[ ] Päivittäinen pyyntöraja ymmärretty agenttikäytössä
[ ] Tool calling tarkistettu valitulle mallille
[ ] Context window tarkistettu
```

---

## Seuraavaksi

- [Johdanto OpenRouteriin](johdanto.md) — yleiskatsaus OpenRouteriin
- [LLM-mallin valinta Claude Codessa](../llm-mallin-valinta/claude-codessa.md) — miten valita sopiva malli
