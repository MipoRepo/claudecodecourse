# Mitä on tekoälyavusteinen koodaus?

Kuvitellaan, että sinulla on erittäin älykäs ohjelmoijaystävä. Tämä ystävä voi:

- **lukea** projektissasi olevia tiedostoja — koodia, testejä ja asetuksia
- **yhdistää** tietoja eri lähteistä, kuten tietokannoista, muistiinpanoista ja ulkoisista palveluista
- **kirjoittaa** uusia tiedostoja ja muuttaa olemassa olevia
- **ajaa** komentoja, ohjelmia ja testejä paikallisessa ympäristössä
- **keskustella** kanssasi luonnollisella kielellä

Tämä ystävä ei kyllä koskaan nuku, eikä kahvikaan pääse loppumaan kesken. Hänellä on kuitenkin tärkeä ero tavalliseen ohjelmoijaan verrattuna:

> **Sinä määrittelet, mitä tehdään, ja järjestelmän käyttöoikeudet määrittävät, mitä tekoäly saa tehdä.**

Tässä on kyse **Claude Codesta** — Anthropic-yhtiön kehittämästä komentorivipohjaisesta tekoälytyökalusta, joka on suunniteltu ohjelmistokehitystehtäviin.

## Miten Claude Code eroaa tavallisesta chat-AI:sta?

| Ominaisuus | Tavallinen chat-AI (ChatGPT / Claude Web) | Claude Code |
|-----------|-------------------------------------------|-------------|
| Vastaustyyppi | Pääasiassa tekstiä | Tekstiä + työkalujen käyttöä |
| Projektin tiedostot | Ei yleensä suoraa pääsyä paikalliseen projektiin | Voi lukea ja muokata projektin tiedostoja käyttöoikeuksien mukaan |
| Komennot | Ei yleensä pääse paikalliseen komentoriviin | Voi suorittaa komentoja käyttöoikeuksien mukaan |
| Työskentelytapa | Keskustelupainotteinen | Agenttinen työskentely |
| Hookit | Ei yleensä käytettävissä samalla tavalla | Tapahtumiin voidaan liittää automaattisia toimintoja |
| Ulkoiset työkalut | Riippuu palvelusta ja sen integraatioista | MCP:n avulla voidaan yhdistää ulkoisiin palveluihin |
| Sub-agentit | Ei yleensä samalla tavalla | Voi käyttää erillisiä sub-agentteja tehtävien suorittamiseen |

!!! warning "Tärkeitä huomioita"
    - Claude Code on **komentoriviohjelma (CLI)**, joten sen käyttö edellyttää ainakin komentorivin perusteiden ymmärtämistä.
    - Se ei ole pelkkä chatbot — se on **työkalu, joka voi käyttää tietokoneesi tiedostoja ja muita työkaluja sille myönnettyjen käyttöoikeuksien puitteissa**.
    - Tekoälyn tuottama koodi ja sen tekemät muutokset pitää aina tarkistaa.
    - Käyttäjä vastaa siitä, millaiset käyttöoikeudet ja toimintamahdollisuudet Claude Codella on projektissa.

## Mitä Claude Code pystyy tekemään?

### 1. Projektin tutkiminen ja suunnittelu

Claude Codea voidaan käyttää ensin projektin tutkimiseen ennen muutosten tekemistä.

Esimerkiksi:

    claude --permission-mode plan

Plan-tilassa Claude voi analysoida projektia ja muodostaa suunnitelman ennen muutosten tekemistä.

Tällainen työskentelytapa on hyödyllinen esimerkiksi silloin, kun haluat ensin:

1. ymmärtää projektin rakenteen
2. selvittää, miten nykyinen koodi toimii
3. tunnistaa riippuvuudet ja mahdolliset ongelmat
4. muodostaa muutossuunnitelman
5. hyväksyä suunnitelman ennen varsinaista toteutusta

!!! note
    Käytettävissä olevat toiminnot ja käyttöoikeudet riippuvat Claude Coden
    versiosta, asetuksista ja käytetystä permission-moodesta.

### 2. Koodin kirjoittaminen ja muuttaminen

Kun tarvittavat käyttöoikeudet ovat käytössä, Claude Code voi esimerkiksi:

- luoda uusia tiedostoja
- muuttaa olemassa olevia tiedostoja
- refaktoroida koodia
- kirjoittaa testejä
- korjata virheitä
- ajaa testit ja analysoida niiden tuloksia
- auttaa dokumentoinnissa

Tärkeä periaate on, että tekoäly ei korvaa ohjelmistokehityksen laadunvarmistusta. Muutokset pitää tarkistaa ja testata.

### 3. Työkalujen käyttäminen (tools)

Claude Code voi käyttää erilaisia työkaluja tehtävän suorittamiseen.

Esimerkiksi:

| Työkalu | Mitä se tekee? |
|--------|-----------------|
| **Read** | Lukee tiedoston sisältöä |
| **Grep** | Etsii tekstiä tiedostoista |
| **Glob** | Etsii tiedostoja tiedostonimen tai kuvion perusteella |
| **Edit** | Muokkaa olemassa olevaa tiedostoa |
| **Write** | Luo tai kirjoittaa tiedoston |
| **Bash** | Suorittaa komentoja komentorivillä |
| **Agent** | Käynnistää erillisen agentin tehtävää varten |

!!! tip "Ajattele työkaluja tekoälyn käsinä"
    Kielimalli tuottaa päätöksiä ja tekstiä, mutta työkalujen avulla Claude Code
    voi olla vuorovaikutuksessa projektin ja käyttöympäristön kanssa.

    Esimerkiksi:

        Claude → Read → tiedosto → Claude → Edit → tiedosto

    tai:

        Claude → Bash → testit → tulokset → Claude → analyysi

### 4. Erillisten agenttien käyttö (sub-agents)

**Sub-agentti** on erillinen agentti, jolle voidaan antaa oma tehtävä, konteksti ja työkalujen käyttöoikeudet.

Sub-agenttia voidaan ajatella erikoistuneena "työntekijänä".

Esimerkiksi:

- **Reviewer-agentti**: tarkistaa koodia ja etsii ongelmia
- **Debugger-agentti**: tutkii virheitä ja yrittää toistaa ongelman
- **Security-auditor**: etsii turvallisuusongelmia
- **Tester-agentti**: suunnittelee ja suorittaa testejä
- **Documentation-agentti**: auttaa dokumentaation tuottamisessa

Sub-agenttien etuna on, että kaikki tehtävät eivät tarvitse tapahtua samassa pääkontekstissa.

!!! note
    Sub-agentti ei ole automaattisesti täysin itsenäinen ohjelma.
    Se toimii sille annetun tehtävän, kontekstin, työkalujen ja käyttöoikeuksien puitteissa.

### 5. Ulkoisten palveluiden yhdistäminen (MCP)

**MCP (Model Context Protocol)** on avoin standardi, jonka avulla tekoälyjärjestelmään voidaan liittää ulkoisia työkaluja ja tietolähteitä.

Claude Codea voidaan MCP:n avulla yhdistää esimerkiksi:

- GitHub-repositorioihin
- Jira-issuehallintaan
- Notioniin
- tietokantoihin
- monitorointipalveluihin
- muihin MCP-palvelimia tarjoaviin järjestelmiin

MCP:n perusidea on erottaa tekoälymalli ja ulkoiset työkalut toisistaan:

    Claude Code
         │
         ▼
        MCP
         │
         ├── GitHub
         ├── Jira
         ├── Database
         └── Other services

### 6. Headless-toiminta skripteissä ja CI/CD:ssä

Claude Codea voidaan käyttää myös ilman interaktiivista työskentelyä.

Esimerkiksi:

    claude -p "Miksi tämä build epäonnistui?" --output-format json

Tällaista toimintatapaa voidaan hyödyntää esimerkiksi:

- skripteissä
- automaatiossa
- CI/CD-putkissa
- lokien analysoinnissa
- automaattisissa tarkistuksissa

Headless-käytössä Claude Code toimii osana muuta ohjelmistokehityksen automaatioympäristöä.

---

## Miksi kurssilla painotetaan agenttikehitystä?

Usein tekoälystä ajatellaan näin:

> "Tekoäly auttaa minua kirjoittamaan koodia."

Tämä on kuitenkin vain yksi käyttötapa.

Agenttipohjaisessa kehityksessä tavoitteena on rakentaa järjestelmä, joka pystyy suorittamaan kokonaisia tehtäväketjuja hallitusti.

Esimerkiksi:

    Tavoite
       │
       ▼
    Suunnittelu
       │
       ▼
    Toteutus
       │
       ▼
    Testaus
       │
       ▼
    Tarkistus
       │
       ▼
    Raportointi

Tällaisessa järjestelmässä voidaan hyödyntää esimerkiksi:

- **Claude Codea** tehtävien suorittamiseen
- **Sub-agentteja** erikoistuneisiin tehtäviin
- **Hookeja** automaattisiin tarkistuksiin ja toimintoihin
- **MCP:tä** ulkoisten työkalujen yhdistämiseen
- **Checkpointeja ja Git-versiohallintaa** palautumiseen
- **Testejä** muutosten varmistamiseen

Tämä muuttaa ajattelutapaa:

> **"Käytän tekoälyä koodin kirjoittamiseen."**

→

> **"Rakennan hallitun kehitysprosessin, jossa tekoälyagentit suorittavat tehtäviä yhdessä ihmisen kanssa."**

Tämä ero on yksi koko agenttipohjaisen ohjelmistokehityksen tärkeimmistä perusideoista.

---

## Ihminen pysyy päätöksentekijänä

Agenttipohjainen kehitys ei tarkoita sitä, että tekoälylle pitäisi antaa rajaton pääsy kaikkeen.

Turvallinen toimintamalli perustuu esimerkiksi seuraavaan ajatukseen:

    Ihminen
       │
       │ määrittelee tavoitteen
       ▼
    AI-agentti
       │
       │ suunnittelee ja ehdottaa
       ▼
    Työkalut
       │
       │ suorittavat sallitut toiminnot
       ▼
    Projektin ympäristö

Käyttöoikeudet, testit, versionhallinta ja muut suojaukset muodostavat rajoja sille, mitä agentti voi tehdä.

!!! warning "Muista"
    Mitä enemmän toimintaa automatisoidaan, sitä tärkeämpää ovat:

    - rajatut käyttöoikeudet
    - versionhallinta
    - testit
    - lokitus
    - tarkistuspisteet
    - ihmisen hyväksyntä kriittisissä vaiheissa

---

## Seuraavaksi

!!! question "Jos olet täysin aloittelija"
    Siirry [Lukuun 1: Johdanto Claude Codeen](../johdanto/mita-on-claude-code.md),
    jossa tarkastellaan tarkemmin, miten Claude Code toimii ja miten sitä käytetään.

!!! tip "Jos olet jo tuttu CLI:n kanssa"
    Voit siirtyä suoraan [Lukuun 2: Arkkitehtuuri](../arkkitehtuuri/arkkitehtuuri.md)

    tai kokeilla

    [Harjoitus 01: Ensimmäinen read-only-työ](../harjoitukset/01-read-only-tyo.md).
