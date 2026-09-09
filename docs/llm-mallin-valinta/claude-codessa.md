# LLM-mallin valinta Claude Codessa

Kun Claude Codea käytetään OpenRouterin kautta, LLM-mallin valinta ei ole sama asia kuin parhaan keskustelumallin valitseminen.

Claude Code toimii **agenttiharnessina**, joka käyttää LLM:ää päätöksentekoon ja hyödyntää työkaluja esimerkiksi tiedostojen lukemiseen, muuttamiseen, komentojen suorittamiseen ja projektin tutkimiseen.

Siksi mallin pitää olla paitsi hyvä koodaamaan ja perustelemaan myös **yhteensopiva Claude Coden työkalujen ja OpenRouterin API-rajapinnan kanssa**.

---

## Arkkitehtuuri: Claude Code + OpenRouter + LLM

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
└─────────────────────────┘
```

!!! important "Keskeinen periaate"
    **Claude Code on agentin toimintaympäristö. LLM toimii agentin päätöksenteon ytimenä.**
    
    > Hyvä keskustelumalli ei automaattisesti ole hyvä agenttimalli.

---

## Miksi tavallinen LLM-vertailu ei riitä?

Tavallisessa LLM-arvioinnissa katsotaan:

- päättelykykyä
- koodaustaitoa
- kielitaitoa
- konteksti-ikkunan kokoa
- nopeutta
- benchmark-tuloksia

Agenttikäytössä tarvitaan lisäksi:

- **tool calling** — työkalujen käyttäminen (tiedostot, bash, MCP)
- oikeamuotoiset JSON-argumentit työkalukutsuille
- JSON Schema -yhteensopivuus
- tiedostojen käsittely useilla operaatioilla
- komentojen suorittaminen
- monen tiedoston samanaikainen muutos
- virheistä palautuminen
- työn verifiointi
- ohjeiden pitkäjänteinen noudattaminen

---

## Tool calling — tärkein yksittäinen ominaisuus

Claude Code -agentissa **tool calling on käytännössä pakollinen ominaisuus**.

OpenRouterin mallikohtaisista tiedoista kannattaa tarkistaa:

```text
tools         = YES  ← tärkein
tool_choice   = YES
structured_outputs = YES  (hyödyllinen)
```

Jos mallilta puuttuu tool calling -tuki, sitä ei kannata valita Claude Code -agentiksi.

### Tool calling -tuki ei silti takaa yhteensopivuutta

Malli voi OpenRouterin tietojen perusteella tukea function calling -ominaisuutta, mutta silti epäonnistua Claude Codessa. Ongelma voi syntyä missä tahansa kerroksessa:

```text
Claude Code  →  Tool schema
OpenRouter   →  API / schema compatibility
LLM          →  Actual tool execution
```

### Kolme eri yhteensopivuustasoa

1. **Malli tukee tool callingia** — `tools = YES`
2. **OpenRouter tukee mallin tool callingia** — varmistettava erikseen
3. **Claude Code + OpenRouter + kyseinen malli toimii yhdessä** — ratkaiseva käytännön testi

!!! tip "Kohta 3 ratkaisee"
    Tekninen dokumentaatio on vasta lähtökohta. Todellinen käyttökelpoisuus selviää vain testaamalla.

---

## Claude Coden asetukset OpenRouteria varten

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_OPENROUTER_KEY",
    "ANTHROPIC_MODEL": "YOUR_MODEL"
  }
}
```

Claude Code tarjoaa useita tapoja valita käytettävä malli:

- `/model`-komento interaktiivisessa sessiossa
- `--model`-parametri käynnistyksen yhteydessä
- `ANTHROPIC_MODEL`-ympäristömuuttuja

---

## Mitä hyvältä agenttimallilta vaaditaan?

Hyvä agenttimalli pystyy suorittamaan toimintaketjun:

```text
TASK → Explore → Understand → Plan → Modify → Verify → Report
```

Agentin ei pitäisi hypätä suoraan muuttamaan tiedostoja ymmärtämättä ensin projektin rakennetta.

### Context window

Pitkissä agenttitehtävissä tarvitaan riittävä konteksti-ikkuna. Suuri context window on hyödyllinen etenkin kun agentti käsittelee suurta koodipohjaa, useita tiedostoja tai dokumentaatiota.

```
Suuri konteksti  +  hyvä reasoning  +  luotettava tool calling  =  hyvä agentti
```

---

## Mallin valinnan hierarkia Claude Codessa

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

## Lopullinen tarkistuslista

### API

```text
[ ] OpenRouter tukee mallia
[ ] Anthropic Messages API toimii
[ ] Autentikointi toimii
[ ] Model ID on oikea
```

### Tool calling

```text
[ ] tools
[ ] tool_choice
[ ] JSON Schema
[ ] Tool-argumentit muodostuvat oikein
[ ] Tool-tulokset käsitellään oikein
```

### Agenttikäyttäytyminen

```text
[ ] Osaa suunnitella ennen toimintaa
[ ] Osaa käyttää työkaluja
[ ] Osaa lukea tiedostoja
[ ] Osaa muokata tiedostoja
[ ] Osaa käyttää shelliä
[ ] Osaa tehdä multi-file-muutoksia
[ ] Osaa jatkaa virheestä
[ ] Osaa tarkistaa oman työnsä
```

### Luotettavuus

```text
[ ] Sama testi onnistuu toistuvasti
[ ] Ei jää silmukkaan
[ ] Ei tee tarpeettomia muutoksia
[ ] Ei keksi tiedostojen sisältöjä
[ ] Ei väitä tehneensä muutoksia, joita ei tehnyt
[ ] Tarkistaa omat muutoksensa
```

---

## Seuraavaksi

- [Vertailu ja suositukset](vertailu.md) — käytännön testausohje ja mallien pisteytys
- [Johdanto OpenRouteriin](../openrouter/johdanto.md) — OpenRouterin perusteet
- [API-avaimet ja ilmaiskäyttö](../openrouter/api-avaimet.md) — API-avaimen luominen ja käyttörajojen hallinta
