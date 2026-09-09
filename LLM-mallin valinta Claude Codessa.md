# LLM-mallin valinta Claude Codessa OpenRouterin kautta

## Käytännön opas agenttikehitykseen

Kun Claude Codea käytetään OpenRouterin kautta, LLM-mallin valinta ei ole sama asia kuin parhaan keskustelumallin valitseminen.

Claude Code toimii **agenttiharnessina**, joka käyttää LLM:ää päätöksentekoon ja hyödyntää työkaluja esimerkiksi tiedostojen lukemiseen, muuttamiseen, komentojen suorittamiseen ja projektin tutkimiseen.

Siksi mallin pitää olla paitsi hyvä koodaamaan ja perustelemaan myös **yhteensopiva Claude Coden työkalujen ja OpenRouterin API-rajapinnan kanssa**.

---

## 1. Claude Code + OpenRouter + LLM

Perusrakenne voidaan esittää näin:

```text
┌─────────────────────────┐
│       CLAUDE CODE       │
│                         │
│  Agenttiharness         │
│  Tools                  │
│  File operations        │
│  Shell                  │
│  Git                    │
│  MCP                    │
└────────────┬────────────┘
             │
             │ Anthropic Messages API
             ▼
┌─────────────────────────┐
│       OPENROUTER        │
│                         │
│  API / routing          │
│  Provider selection     │
│  Model routing          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│           LLM           │
│                         │
│  Reasoning              │
│  Coding                 │
│  Tool calling           │
│  Planning               │
│  Context handling       │
│  Finnish language       │
└─────────────────────────┘
```

### Keskeinen periaate

**Claude Code on agentin toimintaympäristö. LLM toimii agentin päätöksenteon ytimenä.**

Tästä seuraa tärkeä ero:

> Hyvä keskustelumalli ei automaattisesti ole hyvä agenttimalli.

---

# 2. Miksi tavallinen LLM-vertailu ei riitä?

LLM:ää voidaan arvioida esimerkiksi seuraavilla ominaisuuksilla:

* päättelykyky
* koodaus
* kielitaito
* konteksti-ikkuna
* nopeus
* benchmark-tulokset

Agenttikäytössä tarvitaan kuitenkin lisäksi:

* tool calling
* tool argumenttien oikea muodostaminen
* JSON Schema -yhteensopivuus
* tiedostojen käsittely
* komentojen suorittaminen
* monen tiedoston muutokset
* virheistä palautuminen
* työn verifiointi
* ohjeiden pitkäjänteinen noudattaminen

Agenttimallia valittaessa kannattaa siis ajatella kokonaisuutta:

```text
                    LLM-AGENTTI
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    Reasoning        Tool calling      Coding
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                  Agent execution
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Context handling       Reliability
              │                     │
              └──────────┬──────────┘
                         ▼
                    FINAL RESULT
```

---

# 3. Ensimmäinen tarkistus: Tool Calling

Claude Code -agentissa **tool calling on käytännössä pakollinen ominaisuus**.

OpenRouterin mallikohtaisista tiedoista kannattaa tarkistaa, tukeeko malli esimerkiksi:

* `tools`
* `tool_choice`
* `reasoning`
* `structured_outputs`

Erityisesti:

```text
tools = YES
```

on tärkeä lähtökohta.

Jos mallilta puuttuu tarvittava tool calling -tuki, sitä ei kannata valita Claude Code -agentiksi.

---

# 4. Tool calling -tuki ei kuitenkaan takaa yhteensopivuutta

Tämä on erittäin tärkeä havainto.

Malli voi OpenRouterin tietojen perusteella tukea:

```text
Function calling
```

mutta silti epäonnistua Claude Codessa.

Arkkitehtuuri on:

```text
Claude Code
      │
      │ Tool schema
      ▼
OpenRouter
      │
      │ API / schema compatibility
      ▼
LLM
```

Ongelma voi syntyä missä tahansa näistä kerroksista.

Siksi mallin tekninen ilmoitus:

> "Supports function calling"

ei yksin riitä.

### Todellinen kysymys on:

> Toimiiko kyseinen malli juuri Claude Coden työkalujen kanssa OpenRouterin kautta?

Tämä pitää testata käytännössä.

---

# 5. Kolme eri yhteensopivuustasoa

Mallin valinnassa kannattaa erottaa kolme asiaa.

## A. Malli tukee tool callingia

Esimerkiksi:

```text
tools = YES
```

## B. OpenRouter tukee mallin tool callingia

Myös tämä pitää varmistaa.

## C. Claude Code + OpenRouter + kyseinen malli toimii yhdessä

Tämä on ratkaiseva testi.

Esimerkiksi:

```text
Gemma
    ✓ function calling
    ✓ OpenRouter
    ✗ Claude Code -testi

North Mini Code
    ✓ tool calling
    ✓ OpenRouter
    ✗ Claude Code -testi

Nex-N2.5-Pro
    ✓ agent capabilities
    ✓ OpenRouter
    ✓ Claude Code -testi
```

**C-kohta ratkaisee käytännön käyttökelpoisuuden.**

---

# 6. Mitä Claude Code -agentin pitää osata?

Hyvä agenttimalli pystyy suorittamaan seuraavan kaltaisen toimintaketjun:

```text
TASK
 │
 ▼
Explore
 │
 ▼
Understand
 │
 ▼
Plan
 │
 ▼
Modify
 │
 ▼
Verify
 │
 ▼
Report
```

Agentin ei pitäisi hypätä suoraan muuttamaan tiedostoja ymmärtämättä ensin projektin rakennetta.

---

# 7. Tiedostojen lukeminen

Ensimmäinen käytännön testi voidaan tehdä näin:

```text
Lue README.md.
Älä muuta mitään.
Kerro kolme tärkeintä asiaa.
```

### PASS

Agentti käyttää tiedostonlukutyökalua ja perustaa vastauksensa todelliseen sisältöön.

### FAIL

Agentti arvaa tiedoston sisällön tai antaa yleisen vastauksen lukematta tiedostoa.

---

# 8. Tiedoston luominen

Seuraava testi:

```text
Luo agent-test.md, jonka sisältönä on:

# Agenttitesti

Claude Code tool calling toimii.
```

Testissä pitää tarkistaa, että:

1. agentti käyttää työkalua
2. tiedosto luodaan oikeasti
3. sisältö kirjoitetaan tiedostoon
4. tiedosto löytyy levyltä

Pelkkä tekstivastaus:

> "Tässä on tiedoston sisältö..."

ei ole onnistunut agenttitesti.

---

# 9. Tiedoston muokkaaminen

Testaa seuraavaksi:

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

# 10. Monen tiedoston käsittely

Todellisen agentin pitää pystyä työskentelemään usean tiedoston kanssa.

Testi:

```text
Luo:

test/
├── README.md
├── config.md
└── notes.md
```

Sen jälkeen:

```text
Muokkaa kaikkia kolmea tiedostoa siten,
että jokaisessa on projektin nimi.
```

Tarkista:

```text
✓ kaikki tiedostot löytyvät
✓ kaikki kolme muokataan
✓ tiedostoja ei unohdeta
✓ muutokset tehdään oikeisiin tiedostoihin
✓ agentti ei tee tarpeettomia muutoksia
```

---

# 11. Projektin tutkiminen

Agentin pitää osata tutkia olemassa olevaa projektia.

Hyvä toimintamalli:

```text
TASK
 │
 ▼
Explore project
 │
 ▼
Identify relevant files
 │
 ▼
Read content
 │
 ▼
Understand dependencies
 │
 ▼
Plan changes
 │
 ▼
Modify
 │
 ▼
Verify
```

Huono agentti:

```text
TASK
 │
 ▼
Immediate modification
 │
 ▼
Errors
 │
 ▼
Confusion
```

---

# 12. Shell ja komentorivi

Claude Code -agentin kannattaa osata käyttää komentoriviä silloin, kun tehtävä sitä edellyttää.

Esimerkiksi:

```text
Tarkista projektin Git-status ja kerro,
onko työhakemistossa muuttamattomia tiedostoja.
```

Agentin pitää suorittaa tarvittava komento eikä arvata vastausta.

---

# 13. Reasoning eli päättelykyky

Agentin reasoning on tärkeämpi kuin tavallisessa keskustelussa.

Esimerkiksi:

```text
Projektissa on 30 Markdown-tiedostoa.

Etsi ristiriitaiset Claude Code -komennot,
tarkista niiden oikeellisuus ja korjaa virheet.
```

Agentin pitää pystyä etenemään suunnilleen näin:

```text
1. löydä tiedostot
2. lue sisältö
3. tunnista väitteet
4. tunnista mahdolliset ristiriidat
5. arvioi niiden oikeellisuus
6. päätä tarvittavat muutokset
7. muokkaa tiedostoja
8. tarkista muutokset
```

---

# 14. Context window

Pitkissä agenttitehtävissä tarvitaan riittävä konteksti-ikkuna.

Tarkista mallin:

```text
Context length
```

Esimerkiksi:

```text
32K
128K
256K
1M
```

Suuri konteksti on hyödyllinen esimerkiksi silloin, kun agentti käsittelee:

* suurta koodipohjaa
* useita Markdown-tiedostoja
* dokumentaatiota
* lokitiedostoja
* PDF-materiaalia
* useita lähteitä

Mutta:

> Suuri context window ei yksin tee mallista hyvää agenttia.

Parempi yhdistelmä on:

```text
Suuri konteksti
+
hyvä reasoning
+
luotettava tool calling
```

---

# 15. Suomen kielen testaaminen

Jos agenttia käytetään suomenkielisen dokumentaation tekemiseen, mallin suomen kielen laatu kannattaa testata erikseen.

Esimerkiksi:

```text
Kirjoita suomeksi tekninen kappale,
jossa selität Claude Coden sub-agentin,
skillin, hookin ja MCP:n erot.
```

Tarkista:

* kielioppi
* oikeinkirjoitus
* lauserakenne
* tekninen täsmällisyys
* terminologia
* johdonmukaisuus

---

# 16. Teknisen terminologian testi

Vakiintuneita teknisiä termejä ei pidä kääntää sattumanvaraisesti.

Esimerkiksi:

```text
sub-agentti
skill
hook
MCP
worktree
tool calling
function calling
API
```

Mallin pitäisi käyttää termejä johdonmukaisesti.

Esimerkiksi:

```text
✓ sub-agentti
✓ skill
✓ hook
✓ MCP
✓ worktree
```

eikä esimerkiksi:

```text
✗ työpuu
✗ taito
✗ koukku
```

ellei käännös ole kyseisessä asiayhteydessä tarkoituksellinen.

---

# 17. Monikielisen toiminnan testi

Hyvä testi:

```text
Analyze the following technical requirement,
but produce the final answer in Finnish.

Use established English technical terms where appropriate.
Do not translate established software terminology unnecessarily.
```

Tällä voidaan testata:

```text
English input
      ↓
Reasoning
      ↓
Finnish output
      ↓
Correct technical terminology
```

---

# 18. Structured Output

Structured output ei ole Claude Code -agentin tärkein ominaisuus, mutta se voi olla erittäin hyödyllinen laajemmissa agenttijärjestelmissä.

Esimerkiksi:

```json
{
  "status": "completed",
  "files_changed": 12,
  "errors": 0,
  "next_action": null
}
```

Tämä on erityisen hyödyllistä, jos rakennetaan:

```text
Agent
  ↓
JSON
  ↓
Orchestrator
  ↓
Another Agent
```

---

# 19. Virheenkäsittely

Agentin pitää pystyä käsittelemään virheitä eikä pysähtyä ensimmäiseen ongelmaan.

Testi:

```text
Muokkaa tiedostoa, jota ei ole olemassa.

Jos tiedostoa ei löydy,
selvitä ensin projektista,
onko vastaava tiedosto olemassa.
```

Hyvä agentti:

```text
File not found
      ↓
Search
      ↓
Find alternative
      ↓
Continue
```

Huono agentti:

```text
File not found
      ↓
ERROR
      ↓
STOP
```

---

# 20. Verification eli työn tarkistaminen

Agentin pitäisi pystyä tarkistamaan oma työnsä.

Testi:

```text
Muuta README.md:n otsikko.

Kun olet tehnyt muutoksen,
lue tiedosto uudelleen ja varmista,
että otsikko muuttui.
```

Tavoiteltu toimintaketju:

```text
Modify
  ↓
Read
  ↓
Verify
  ↓
Done
```

Tätä voidaan kutsua **verification loopiksi**.

---

# 21. Laajan agenttitehtävän testi

Kun perusominaisuudet toimivat, mallille voidaan antaa oikea tehtävä.

Esimerkiksi:

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

Tämä on paljon realistisempi agenttitesti kuin:

```text
Kirjoita Python-funktio.
```

---

# 22. Mallin valintaprosessi

Uuden mallin arviointi voidaan tehdä seuraavasti:

```text
                 UUSI MALLI
                     │
                     ▼
          ┌────────────────────┐
          │ 1. Tool support?  │
          └─────────┬──────────┘
                    │ YES
                    ▼
          ┌────────────────────┐
          │ 2. OpenRouter     │
          │    supports it?   │
          └─────────┬──────────┘
                    │ YES
                    ▼
          ┌────────────────────┐
          │ 3. Claude Code    │
          │    compatibility? │
          └─────────┬──────────┘
                    │ YES
                    ▼
          ┌────────────────────┐
          │ 4. Tool test      │
          └─────────┬──────────┘
                    │ PASS
                    ▼
          ┌────────────────────┐
          │ 5. File test      │
          └─────────┬──────────┘
                    │ PASS
                    ▼
          ┌────────────────────┐
          │ 6. Multi-file     │
          └─────────┬──────────┘
                    │ PASS
                    ▼
          ┌────────────────────┐
          │ 7. Reasoning      │
          └─────────┬──────────┘
                    │ PASS
                    ▼
          ┌────────────────────┐
          │ 8. Finnish test   │
          └─────────┬──────────┘
                    │ PASS
                    ▼
                 PRODUCTION
```

---

# 23. Claude Code -mallin asetukset

Perusasetuksen idea OpenRouteria käytettäessä on:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_OPENROUTER_KEY",
    "ANTHROPIC_MODEL": "YOUR_MODEL"
  }
}
```

Claude Code tarjoaa useita tapoja valita käytettävä malli, kuten `/model`-komennon, `--model`-parametrin sekä ympäristömuuttujan `ANTHROPIC_MODEL`.

OpenRouter tarjoaa Claude Codea varten Anthropic Messages API -yhteensopivan rajapinnan.

---

# 24. Mallin testaaminen erillisessä projektissa

Älä testaa uutta agenttimallia ensimmäisenä tärkeässä tuotantoprojektissa.

Luo esimerkiksi:

```text
claude-agent-test/
```

Rakenne:

```text
claude-agent-test/
├── README.md
├── test1.md
├── test2.md
├── test3.md
└── .claude/
```

Testaa mallia tässä ympäristössä ennen varsinaisen projektin käyttöä.

Näin mahdollinen huono agenttikäyttäytyminen ei pääse rikkomaan tärkeää projektia.

---

# 25. Mallin testausmatriisi

Mallien vertailuun voidaan käyttää pisteytystä.

| Testi                | Painoarvo |
| -------------------- | --------: |
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

Esimerkiksi:

```text
Tool calling       10/10
File operations    10/10
Multi-file          9/10
Reasoning           8/10
Verification        9/10
Error recovery      8/10
Finnish             8/10
Terminology         9/10
```

Näistä voidaan muodostaa kokonaispistemäärä.

---

# 26. Testaa sama tehtävä useita kertoja

Yksi onnistunut testi ei vielä tarkoita, että agentti on luotettava.

Testaa sama tehtävä esimerkiksi viisi kertaa:

```text
PASS
PASS
FAIL
PASS
FAIL
```

Tällöin agentti ei ole vielä riittävän luotettava.

Parempi:

```text
PASS
PASS
PASS
PASS
PASS
```

Agenttimallissa **toistettavuus** on tärkeä ominaisuus.

---

# 27. Ilmaisten OpenRouter-mallien erityispiirteet

Ilmaisissa malleissa voi esiintyä:

* rate limit -rajoituksia
* kuormitusta
* hidastumista
* provider-vaihtelua
* hetkellisiä saatavuusongelmia
* mallin päivityksiä
* vaihtelevaa agenttikäyttäytymistä

Siksi:

```text
FREE ≠ PRODUCTION RELIABILITY
```

Ilmaiset mallit sopivat erinomaisesti esimerkiksi:

* opiskeluun
* kokeiluun
* prototypointiin
* agenttiarkkitehtuurin kehittämiseen
* mallien vertailuun

Tuotantokäytössä kannattaa arvioida myös maksullisia vaihtoehtoja.

---

# 28. Provider on osa mallin valintaa

OpenRouterissa mallin valinta ei välttämättä ole koko kuva.

Arvioinnissa kannattaa tarkistaa:

```text
Model
+
Provider
+
Supported parameters
+
Tool support
+
Context
+
Latency
+
Rate limits
+
Availability
```

Sama malliperhe voi käyttäytyä eri tavalla eri provider-reitityksillä.

---

# 29. Älä valitse mallia pelkän "älykkyyden" perusteella

Älä kysy:

> Mikä on paras LLM?

Kysy:

> Mikä on paras LLM tähän agenttitehtävään?

Esimerkiksi:

```text
Chatbot
    ↓
kielitaito tärkeä

Coding assistant
    ↓
coding + reasoning

Claude Code agent
    ↓
tool calling
+ reasoning
+ coding
+ context
+ file operations
+ verification
+ reliability
```

---

# 30. Käytännön esimerkki mallien vertailusta

Kun eri malleja testataan Claude Codessa, tulokset voivat näyttää esimerkiksi tältä:

```text
Gemma 4 31B
    ↓
Tool calling
    ✓
Claude Code compatibility
    ✗
    → FAIL

North Mini Code
    ↓
Tool calling
    ✓
Claude Code compatibility
    ✗
    → FAIL

Laguna XS 2.1
    ↓
Tool calling
    ✓
Agent capabilities
    ✓
Käytännön testaus
    ✗
    → FAIL

Nex-N2.5-Pro
    ↓
Tool calling
    ✓
Claude Code compatibility
    ✓
Agent execution
    ✓
    → PASS
```

Tämä osoittaa, miksi **käytännön testi on ratkaiseva**.

---

# 31. Oma LLM-agenttibenchmark

Kun agenttien käyttö laajenee, mallien testaamisesta kannattaa tehdä oma järjestelmä.

Esimerkiksi:

```text
LLM-Agent-Benchmark/
│
├── README.md
│
├── models/
│   ├── gemma.md
│   ├── nex-pro.md
│   └── north.md
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
    ├── gemma.json
    ├── nex-pro.json
    └── north.json
```

Tällöin mallien vaihtaminen ei perustu pelkkään kokemukseen tai mainospuheeseen.

Sama testisarja voidaan suorittaa jokaiselle mallille:

```text
Model A
   ↓
Test suite
   ↓
Score

Model B
   ↓
Test suite
   ↓
Score

Model C
   ↓
Test suite
   ↓
Score
```

Lopputuloksena voidaan muodostaa esimerkiksi:

```text
AGENT MODEL SCORE

Nex Pro       8.9 / 10
Model B       8.1 / 10
Model C       6.4 / 10
```

---

# 32. Lopullinen tarkistuslista

## API

```text
[ ] OpenRouter tukee mallia
[ ] Anthropic Messages API toimii
[ ] autentikointi toimii
[ ] model ID on oikea
```

## Tools

```text
[ ] tools
[ ] tool_choice
[ ] JSON Schema
[ ] tool arguments
[ ] tool results
```

## Agentti

```text
[ ] osaa suunnitella
[ ] osaa käyttää työkaluja
[ ] osaa lukea tiedostoja
[ ] osaa muokata tiedostoja
[ ] osaa käyttää shelliä
[ ] osaa tehdä multi-file-muutoksia
[ ] osaa jatkaa virheestä
[ ] osaa tarkistaa työnsä
```

## Malli

```text
[ ] reasoning
[ ] coding
[ ] riittävä context
[ ] hyvä instruction following
[ ] hyvä suomen kieli
[ ] hyvä tekninen terminologia
[ ] riittävä output length
```

## Luotettavuus

```text
[ ] sama testi onnistuu toistuvasti
[ ] ei jää looppiin
[ ] ei tee turhia muutoksia
[ ] ei keksi tiedostojen sisältöä
[ ] ei väitä tehneensä muutoksia joita ei tehnyt
[ ] tarkistaa omat muutoksensa
```

---

# 33. Tärkein periaate

Claude Code -agentille mallin valinta kannattaa tehdä **empiirisesti**.

Ei:

```text
"OpenRouter sanoo tämän olevan hyvä."
```

Vaan:

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

Mallin ilmoitettu ominaisuus on vasta lähtökohta.

Todellinen käyttökelpoisuus ratkaistaan sillä, **miten malli toimii sinun agenttiympäristössäsi**.

---

# 34. Claude Code -agenttimallin valinnan hierarkia

Käytännössä mallin valinta voidaan tiivistää tähän järjestykseen:

```text
1. API-YHTEENSOPIVUUS
       ↓
2. TOOL CALLING
       ↓
3. TOOL-SCHEMA-YHTEENSOPIVUUS
       ↓
4. AGENTTIKÄYTTÄYTYMINEN
       ↓
5. REASONING
       ↓
6. CODING
       ↓
7. CONTEXT
       ↓
8. INSTRUCTION FOLLOWING
       ↓
9. VERIFICATION
       ↓
10. ERROR RECOVERY
       ↓
11. SUOMEN KIELI
       ↓
12. NOPEUS
       ↓
13. KUSTANNUS
       ↓
14. SAATAVUUS / RATE LIMITS
```

Jos malli epäonnistuu kohdissa 1–3, myöhemmillä ominaisuuksilla ei ole käytännössä merkitystä.

---

# 35. Tiivistelmä

Claude Code + OpenRouter -agentille ei pidä valita mallia sen perusteella, mikä malli näyttää parhaimmalta tavallisessa keskustelussa.

Valinnan lähtökohta on:

> **Toimiiko malli luotettavasti Claude Coden työkalujen kanssa?**

Sen jälkeen arvioidaan:

```text
Tool calling
      ↓
File operations
      ↓
Multi-file operations
      ↓
Reasoning
      ↓
Error recovery
      ↓
Verification
      ↓
Coding
      ↓
Finnish
      ↓
Reliability
      ↓
Cost
```

Hyvä agenttimalli ei ole välttämättä paras keskustelumalli.

Hyvä koodausmalli ei välttämättä ole hyvä agenttimalli.

Hyvä tool-calling-malli ei välttämättä ole yhteensopiva Claude Coden kanssa.

Siksi **Claude Code + OpenRouter -mallivalinta on ennen kaikkea yhteensopivuuden, agenttikäyttäytymisen ja käytännön testauksen ongelma.**

---

## 36. Käytännön nyrkkisääntö

Kun löydät uuden OpenRouter-mallin, älä siirrä sitä suoraan tärkeään projektiin.

Tee ensin:

```text
1. Tarkista mallin metadata
        ↓
2. Tarkista tool calling
        ↓
3. Käynnistä Claude Code
        ↓
4. Testaa tiedoston luku
        ↓
5. Testaa tiedoston kirjoitus
        ↓
6. Testaa tiedoston muokkaus
        ↓
7. Testaa multi-file
        ↓
8. Testaa shell
        ↓
9. Testaa virheenkäsittely
        ↓
10. Testaa verification
        ↓
11. Testaa suomen kieli
        ↓
12. Toista testit
        ↓
13. Pisteytä
        ↓
14. Vasta sitten tuotantokäyttöön
```

Tämä muuttaa LLM:n valinnan satunnaisesta kokeilusta **systemaattiseksi agenttien evaluointiprosessiksi**.
