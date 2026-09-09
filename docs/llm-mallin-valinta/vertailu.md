# Vertailu ja suositukset

Tällä sivulla käydään läpi käytännön testausmenetelmä uuden LLM-mallin arvioimiseksi Claude Code -käytössä sekä ilmaisten OpenRouter-mallien erityispiirteet.

---

## Mallin arviointiprosessi

```text
                 UUSI MALLI
                     │
                     ▼
          ┌────────────────────┐
          │ 1. Tool support?   │
          └─────────┬──────────┘
                    │ YES
                    ▼
          ┌────────────────────┐
          │ 2. OpenRouter      │
          │    supports it?    │
          └─────────┬──────────┘
                    │ YES
                    ▼
          ┌────────────────────┐
          │ 3. Claude Code     │
          │    compatibility?  │
          └─────────┬──────────┘
                    │ YES
                    ▼
          ┌────────────────────┐
          │ 4. Tool test       │
          └─────────┬──────────┘
                    │ PASS
                    ▼
          ┌────────────────────┐
          │ 5. File test       │
          └─────────┬──────────┘
                    │ PASS
                    ▼
          ┌────────────────────┐
          │ 6. Multi-file      │
          └─────────┬──────────┘
                    │ PASS
                    ▼
          ┌────────────────────┐
          │ 7. Reasoning       │
          └─────────┬──────────┘
                    │ PASS
                    ▼
          ┌────────────────────┐
          │ 8. Finnish test    │
          └─────────┬──────────┘
                    │ PASS
                    ▼
                 TUOTANTOKÄYTTÖ
```

---

## Käytännön testitapaukset

### Testi 1: Tiedoston lukeminen

```text
Lue README.md.
Älä muuta mitään.
Kerro kolme tärkeintä asiaa.
```

**Hyväksyttävä tulos (PASS):** Agentti käyttää tiedostonlukutyökalua ja perustaa vastauksensa todelliseen sisältöön.

**Hylätty tulos (FAIL):** Agentti arvaa tiedoston sisällön tai antaa yleisen vastauksen lukematta tiedostoa.

---

### Testi 2: Tiedoston luominen

```text
Luo agent-test.md, jonka sisältönä on:

# Agenttitesti

Claude Code tool calling toimii.
```

Tarkista:
- agentti käyttää työkalua
- tiedosto luodaan oikeasti levylle
- sisältö kirjoitetaan tiedostoon

Pelkkä tekstivastaus `"Tässä on tiedoston sisältö..."` **ei** ole onnistunut agenttitesti.

---

### Testi 3: Tiedoston muokkaaminen

```text
Lisää agent-test.md-tiedoston loppuun:

## Toinen testi
```

Tarkista:
```text
✓ alkuperäinen sisältö säilyy
✓ uusi sisältö lisätään
✓ tiedosto tallennetaan
✓ agentti ei korvaa tiedostoa tarpeettomasti
```

---

### Testi 4: Monen tiedoston käsittely

```text
Luo:
test/
├── README.md
├── config.md
└── notes.md

Muokkaa sitten kaikkia kolmea tiedostoa siten,
että jokaisessa on projektin nimi.
```

Tarkista:
```text
✓ kaikki tiedostot löytyvät
✓ kaikki kolme muokataan
✓ tiedostoja ei unohdeta
✓ muutokset tehdään oikeisiin tiedostoihin
```

---

### Testi 5: Virheenkäsittely

```text
Muokkaa tiedostoa, jota ei ole olemassa.

Jos tiedostoa ei löydy,
selvitä ensin projektista,
onko vastaava tiedosto olemassa.
```

**Hyvä agentti:** `File not found → Search → Find alternative → Continue`

**Huono agentti:** `File not found → ERROR → STOP`

---

### Testi 6: Työn tarkistaminen (Verification loop)

```text
Muuta README.md:n otsikko.

Kun olet tehnyt muutoksen,
lue tiedosto uudelleen ja varmista,
että otsikko muuttui.
```

Tavoiteltu toimintaketju: `Modify → Read → Verify → Done`

---

### Testi 7: Suomen kieli ja terminologia

```text
Kirjoita suomeksi tekninen kappale,
jossa selität Claude Coden sub-agentin,
skillin, hookin ja MCP:n erot.
```

Tarkista:

- kielioppi ja oikeinkirjoitus
- lauserakenne
- tekninen täsmällisyys
- terminologian johdonmukaisuus

Vakiintuneet termit säilyvät englanniksi:
```text
✓ sub-agentti, skill, hook, MCP, worktree
✗ työpuu, taito, koukku  (ellei asiayhteydessä tarkoituksenmukaista)
```

---

### Testi 8: Laaja agenttitehtävä

```text
Tutki tämä MkDocs-projekti.

1. Selvitä projektin rakenne.
2. Etsi Markdown-tiedostot.
3. Tarkista niiden tekninen sisältö.
4. Tarkista suomen kieli.
5. Tarkista mkdocs.yml.
6. Korjaa havaitut virheet.
7. Luo todo.md.
8. Tarkista lopuksi tehdyt muutokset.
```

Tämä on paljon realistisempi agenttitesti kuin yksinkertainen koodinkirjoitustehtävä.

---

## Testaa sama tehtävä useita kertoja

Yksi onnistunut testi ei vielä tarkoita, että agentti on luotettava:

```text
PASS, FAIL, PASS, PASS, FAIL  →  ei riittävän luotettava
PASS, PASS, PASS, PASS, PASS  →  luotettava
```

**Toistettavuus** on agenttimallissa kriittinen ominaisuus.

---

## Mallien pisteytysmatriisi

| Testi                | Painoarvo |
|----------------------|----------:|
| Tool calling         |      25 % |
| Tiedostojen luku     |      10 % |
| Tiedostojen muokkaus |      15 % |
| Multi-file           |      10 % |
| Reasoning            |      10 % |
| Verification         |      10 % |
| Error recovery       |      10 % |
| Suomen kieli         |       5 % |
| Terminologia         |       5 % |
| **Yhteensä**         | **100 %** |

---

## Ilmaisten OpenRouter-mallien erityispiirteet

Ilmaisissa malleissa voi esiintyä:

- rate limit -rajoituksia
- kuormitusta ja hidastumista
- provider-vaihtelua
- hetkellisiä saatavuusongelmia
- mallin päivityksiä ilman varoitusta
- vaihtelevaa agenttikäyttäytymistä

!!! warning "Ilmaiset mallit eivät sovellu sellaisenaan tuotantoon"
    ```
    FREE ≠ PRODUCTION RELIABILITY
    ```
    
    Ilmaiset mallit sopivat erinomaisesti opiskeluun, kokeiluun, prototypointiin ja agenttiarkkitehtuurin kehittämiseen. Tuotantokäytössä kannattaa arvioida myös maksullisia vaihtoehtoja.

---

## Käytännön esimerkki mallien vertailusta

```text
Gemma 4 31B
    ↓ Tool calling: ✓
    ↓ Claude Code: ✗
    → FAIL

North Mini Code
    ↓ Tool calling: ✓
    ↓ Claude Code: ✗
    → FAIL

Nex-N2.5-Pro
    ↓ Tool calling: ✓
    ↓ Claude Code: ✓
    ↓ Agent execution: ✓
    → PASS
```

Tämä osoittaa, miksi käytännön testi on ratkaiseva.

---

## Testaa erillisessä testiprojektissa

Älä testaa uutta agenttimallia ensimmäisenä tärkeässä tuotantoprojektissa. Luo erillinen testiprojekti:

```text
claude-agent-test/
├── README.md
├── test1.md
├── test2.md
├── test3.md
└── .claude/
```

Testaa mallia tässä ympäristössä ennen varsinaisen projektin käyttöä.

---

## Oma LLM-agenttibenchmark

Kun agenttien käyttö laajenee, mallitestauksesta kannattaa tehdä oma järjestelmä:

```text
LLM-Agent-Benchmark/
│
├── README.md
│
├── models/
│   ├── nex-pro.md
│   └── model-b.md
│
├── tests/
│   ├── 01-tool-calling.md
│   ├── 02-file-read.md
│   ├── 03-file-write.md
│   ├── 04-multi-file.md
│   ├── 05-error-recovery.md
│   ├── 06-verification.md
│   ├── 07-reasoning.md
│   └── 08-finnish.md
│
└── results/
    ├── nex-pro.json
    └── model-b.json
```

Sama testisarja voidaan suorittaa jokaiselle mallille, jolloin vertailu perustuu dataan eikä vaikutelmiin.

---

## Tärkein periaate

Claude Code + OpenRouter -agentille mallin valinta kannattaa tehdä **empiirisesti**:

```text
OpenRouter metadata
        +
Claude Code compatibility
        +
Tool test
        +
File test
        +
Multi-file test
        +
Reasoning test
        +
Verification test
        +
Finnish test
        ↓
REAL AGENT SCORE
```

> **Mallin ilmoitettu ominaisuus on vasta lähtökohta. Todellinen käyttökelpoisuus ratkaistaan sillä, miten malli toimii sinun agenttiympäristössäsi.**

---

## Seuraavaksi

- [Mallin valinta Claude Codessa](claude-codessa.md) — valintakriteerit ja arkkitehtuuri
- [OpenRouter — johdanto](../openrouter/johdanto.md) — OpenRouterin perusteet
