# 1. Arkkitehtuuri ja toimintaperiaatteet

Nykyaikainen tekoälyavusteinen ohjelmistokehitys ei perustu yksittäiseen erilliseen työkaluun, vaan modulaariseen järjestelmäarkkitehtuuriin. Tässä luvussa tarkastellaan, miten tekoälymallit, sovellusrajapinnat ja kehitysympäristöt kytkeytyvät toisiinsa hallittavaksi ja turvalliseksi kokonaisuudeksi.

## 1.1 Kerrosmalli (Layer model)

Jotta tekoälyagenttien toimintaa ja riippuvuuksia voidaan hallita tehokkaasti, ohjelmistoarkkitehtuuri jaetaan selkeisiin vastuualueisiin. Kerrosmalli erottaa toisistaan käyttölittymän, reititys- ja valvontakerroksen sekä taustalla vaikuttavat kielimallit.

```
PROJECT REPO
│
├── CLAUDE.md               # jatkuva projektikonteksti
├── .claude/
│   ├── agents/             # custom subagents
│   ├── skills/             # Skills / uudelleenkäytettävät työprosessit
│   ├── hooks/              # komentoskriptit
│   ├── settings.json       # projektin asetukset
│   └── settings.local.json # paikallinen konekohtainen asetus
├── .mcp.json               # projektin MCP-palvelut
└── src/ ...

Claude Code runtime
│
├── session/context
├── permission engine
├── agent loop
├── tool execution
└── external integrations (MCP)
```

### Projektin komponentit selitetynä:

| Komponentti | Tarkoitus | Käsittelytaso |
|------------|-----------|---------------|
| `CLAUDE.md` | Pysyvä teksti kontekstiksi | Projekti- tai tiimitason |
| `agents/` | Custom sub-agentit | Eriytetty rooli ja konteksti |
| `skills/` | Uudelleenkäytettävät työprosessit | Toistettava workflow |
| `hooks/` | Automatisoitu reagointi | Deterministinen |
| `settings.json` | Projektin permission-asetukset | Globaali |
| `.mcp.json` | MCP-palveluiden konfiguraatio | Projektikohtainen |

!!! info "settings.local.json"
    `settings.local.json` on **konekohtainen** asetus, joka pysyy paikallisella koneella.
    Se käytetään usein salaisten ympäristömuuttujien (esim. API-avaimien) säilyttämiseen,
    eikä sitä tulisi koskaan commitata versionhallintaan.

## 1.2 Konteksti vs. toimet (Action)

Kielimallipohjaisissa järjestelmissä ja agenttiarkkitehtuureissa on kriittistä erottaa toisistaan **passiivinen tietoisuus** (konteksti) ja **aktiivinen vaikuttaminen** (toimet/action). 

Tekoäly ei tee mitään itsenäisesti reaaliajassa, vaan sen koko toiminta pohjautuu syötteenä annetun kontekstin käsittelyyn ja sen perusteella muodostettuihin suorituspyyntöihin.

---

### Konteksti (Context Window)

Konteksti muodostaa mallin "työmuistin". Se sisältää kaiken sen datan, jonka perusteella malli tekee seuraavan tilastollisen ennustuksensa:

* **Järjestelmäohjeet (System Prompt):** Roolitus, toimintasäännöt ja reunaehdot.
* **Keskusteluhistoria:** Aiemmat viestit, pyynnöt ja annetut vastaukset.
* **Luettu koodi ja tiedostot:** Työalueelta ladatut tiedostosisällöt, virhelogit ja rajapintakuvaukset.

---

### Toimet (Action / Tool Use)

Toimet ovat agentin keino vaikuttaa ulkopuoliseen maailmaan eli järjestelmän tilaan. Kielimalli ei suorita koodia tai muokkaa tiedostoja suoraan, vaan se ilmoittaa rakenteisella muodolla (esim. JSON/JSON-schema) aikeensa suorittaa komennon. 

Suorittava sovelluskehys (kuten Claude Code) lukee tämän aikeen ja toteuttaa sen:

* **Tiedostojärjestelmätoiminnot:** Tiedostojen luominen, lukeminen, muokkaaminen ja poistaminen.
* **Komentorivikomennot (CLI):** Koodin kääntäminen, testien ajaminen tai Git-komennot.
* **API-kutsut:** Ulkopuolisten palveluiden kyselyt ja datan haku.

---

### Ihminen validoijana

Agenttijärjestelmässä kriittisin rajapinta syntyy kontekstin ja toimen väliin. Ennen kuin mallin ehdottama **toimi (action)** toteutetaan kehitysympäristössä, ihmisen kehittäjän tehtävänä on toimia semanttisena validoijana ja hyväksyä tai hylätä ehdotettu toimenpide.

| Mekanismi | Päätehtävä | Milloin käytetään? | Mitä se ei ole? |
|-----------|------------|---------------------|----------------|
| CLAUDE.md | Pysyvä projekti- tai tiimikonteksti | Projekti- tai tiimikohtaiset säännöt, arkkitehtuuri, build/test-ohjeet | Ei ole hyvä paikka pitkille työprosesseille |
| Skill | Toistettavat työprosessit | Build, testi, deploy | Ei korvaa CLAUDE.md:tä |
| Subagent | Erikoistunut agentti omalla kontekstilla | Review, debug, tutkimus, auditointi | Ei ole yksinään turvamekanismi |
| Hook | Deterministinen tapahtumankäsittely | Automaattiset laatu- ja turvallisuustarkistukset | Ei korvaa versionhallintaa |
| MCP | Pääsy ulkoiseen työkaluun/dataan | GitHub, Jira, Notion, monitoring, meeting notes | Ei ole automaattisesti turvallinen |

## 1.3 Permission engine (Lupa-moottori)

Koodausagentille annettava vapaus suorittaa komentoja (kuten luoda tiedostoja, ajaa komentoja tai muokata koodia) vaatii aina hallintamekanismin. Claude Coden turvallisuusmalli pohjautuu **kerrosmaiseen lupa-moottoriin (Permission engine)**, joka arvioi jokaisen ehdotetun toimenpiteen (*action*) deterministisesti ennen sen toteuttamista.

Malli arvioi toimenpidesyötteen järjestyksessä ja pysäyttää suorituksen heti ensimmäisen ehdon täyttyessä:

1. **Hook-tarkistus (`Hook?`)**
   Ennen minkään sisäänrakennetun säännön arviointia ajetaan mukautetut skriptit ja järjestelmäkoukut (*hooks*). Jos hook palauttaa virheen tai estotilan, suoritus keskeytetään välittömästi (**STOP**).

2. **Kielto-sääntö (`Deny rule?`)**
   Järjestelmä tarkistaa, täyttääkö toimenpide jonkin eksplisiittisesti määritellyistä kieltosäännöistä (esim. kriittisten tiedostojen muokkauskielto tai vaaralliset komennot). Jos kyllä, suoritus pysähtyy (**STOP**).

3. **Lupa-tila (`Permission mode`)**
   Järjestelmä tarkistaa aktiivisen suoritustilan ja sen edellyttämän turvallisuustason. Tila määrittää, vaaditaanko toimenpiteelle ihmisen manuaalinen vahvistus vai sallitaanko automaattinen arviointi.

4. **Sallinta-sääntö (`Allow rule?`)**
   Viimeisenä tarkistetaan, löytyykö toimenpiteelle täsmäävä sallintasääntö (*allow rule*) tai ihmisen antama hyväksyntä. Jos kyllä, komento suoritetaan (**EXECUTE**).

---

### Lupa-moottorin merkitys kehitystyössä

Kerrosmaisen arvioinnin ansiosta kehittäjä voi määritellä tarkat rajamarkkerit sille, mitä toimia agentti saa suorittaa itsenäisesti (esim. luku- ja testikomennot) ja mitkä vaativat aina eksplisiittisen vahvistuksen (esim. tuotantodatan poistaminen tai vaaralliset CLI-komennot).

Tämä tekee agentin toiminnasta turvallista, ennustettavaa ja auditoitavaa.

```
Tool call
  │
  ├─ Hook?  →  Estä?  →  STOP
  │
  ├─ Deny rule?  →  Kyllä?  →  STOP
  │
  ├─ Permission mode  →  tarkista
  │
  └─ Allow rule?  →  Kyllä?  →  EXECUTE
```

### Permission moodit

| Moodi | Kuvaus |
|-------|--------|
| `default` | Kysyy jokaisesta toiminnosta |
| `acceptEdits` | Hyväksyy tiedostomuutokset automaattisesti |
| `dontAsk` | Ei kysy mitään |
| `plan` | Rajoittuu vain read-only -työkaluihin |
| `bypassPermissions` | Kaikki sallittu ilman kyselyä |

## Esimerkki 01: Read-only analyysi

**Plan-moodi** sopii ensimmäiseen arkkitehtuurikierrokseen, kun haluat nähdä
muutossuunnitelman ennen kuin tiedostoja kosketaan.

```bash
claude --permission-mode plan
```

## Esimerkki 02: Rajaa headless-agentin työkalut

Headless-ajossa voit antaa tarkat työkalut, joita agentti saa käyttää:

```bash
claude -p "Analysoi build-loki" --tools "Read"
```

!!! tip "ADVANCED-VINKKI 01"
    Pidä `CLAUDE.md` lyhyenä ja siirrä pitkät työprosessit **Skillsiin**.
    Nykyisen dokumentaation mukaan CLAUDE.md tulisi pitää alle 200 rivissä,
    koska Skills ladataan tarvittaessa.

!!! warning "VAROITUS 02"
    Älä lisää repoon salaisuuksia sisältäviä paikallisia asetuksia vain siksi,
    että Claude tarvitsee ne. Käytä **ympäristömuuttujia**, **salaisuudenhallintaa** tai
    **turvallista paikallista konfiguraatiota**.

---
