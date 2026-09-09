# Teknologian perusteet: Aloittelijalle

!!! info "Kenelle tämä osio on kirjoitettu?"
    Tuo, joka on ensimmäistä kertaa tekemässä tätä kurssia ja haluaa ymmärtää perusteet
    ennen kuin siirrytään syvempään materiaan.

## Mikä on tekoälyavusteinen koodaus?

Kuvitellaan, että sinulla on erittäin älykäs ohjelmoijaystäväsi. Tämä ystäväsi:

- **Lukee** kaikki projektissasi olevat tiedostot — koodit, testit, asetukset
- **Yhdistää** tiedot eri lähteistä (tietokannat, muistiinpanot, ulkoiset palvelut)
- **Kirjoittaa** ja muuttaa tiedostoja
- **Ajaa** komennot ja testit paikallisessa koneessasi
- **Puhuu** kanssasi luonnollisella kielellä

Tämä ystäväsi ei kyllä ikinä nuku eikä virtaa kahvia kaadukaan — mutta hänellä on yksi tärkeä rajoitus: **hän ei ikinä tee mitään ilman, että sinä annat luvan.**

Tässä on **Claude Code** — tekoälyavustaja, joka pystyy tekemään kaiken tämän ja paljon muutakin.

## Miten Claude Code eroaa tavallisesta ChatGPT:stä?

| Ominaisuus | ChatGPT / Claude web | Claude Code |
|-----------|-----------------------|-------------|
| Vastaustyyppi | Vain teksti | Vapaa teksti + tiedostojen luku/kirjoitus |
| Tiedostot | Ei pääsyä | Lue ja kirjoita projektin tiedostot |
| Komennot | Ei suorita | Aja Bash-komennot suoraan |
| Työskentelytapa | Keskustelu | Agenttinen työskentely |
| Hookit | Ei | Kytke automaatioita tapahtumiin |
| Ulkoiset työkalut | Ei | MCP-palvelut (GitHub, Jira, tietokannat) |
| Sub-agentit | Ei | Erilliset agentit omalla kontekstillaan ja työkaluillaan |

!!! warning "Tärkeitä huomioita"
    - Claude Code on **terminaaliohjelma** (CLI), joten sen käyttö edellyttää perusosaamista komentorivistä.
    - Se ei ole pelkkä chatbot — se on **ohjelmisto** joka muuttaa tiedostoja järjestelmässäsi.
    - Aina sinä olet vastuussa siitä, mitä Claude tekee projektissasi.

## Mitä Claude Code pystyy tekemään?

### 1. Projektin tutkiminen (luku)

```bash
# Aja tämä projektikansiossasi
claude --permission-mode plan
```

Tämä käynnistää Claude Code:n **plan-moodissa**, jossa se voi vain lukea tiedostoja eikä saa muokata niitä. Tällaista käytetään ensimmäisessä vaiheessa arkkitehtuurin ymmärtämiseen.

### 2. Koodin kirjoittaminen (kirjoitus)

Kun sallit muutokset, Claude voi:

- Luoda uusia tiedostoja
- Muuttaa olemassa olevia tiedostoja
- Ajaa testit ja nähdä tulokset

### 3. Työkalujen käyttäminen (tools)

Claudelle on käytettävissä seuraavat "työkalut" (tools):

| Työkalu | Mitä se tekee? |
|--------|---------------|
| **Read** | Lukee tiedoston sisällön |
| **Grep** | Etsii tekstiä tiedostoista |
| **Glob** | Etsii tiedostoja nimellä |
| **Edit** | Muuttaa tiedoston sisältöä |
| **Write** | Kirjoittaa uuden tiedoston |
| **Bash** | Suorittaa komentoja terminaalissa |
| **Agent** | Käynnistää erillisen sub-agentin |

### 4. Erillisten agenttien ohjaus (subagents)

Sub-agentti on kuin erikoistunut "työntekijä", joka saa oman konteksti-ikkunan ja siihen liittyvät rajoitetut työkalut. Esimerkiksi:

- **Reviewer-agentti**: tarkistaa koodin lukemalla vain (ei kirjoita)
- **Debugger-agentti**: yrittää toistaa virheitä ajamalla testit
- **Security-auditor**: etsii turvallisuusongelmia

### 5. Ulkoisten palveluiden yhdistäminen (MCP)

MCP (Model Context Protocol) on avoin standardi, jonka avulla Claude voi yhdistää ulkoisiin palveluihin kuten:

- GitHub-repositoriot
- Jira-issuehallinta
- Notion-tietokannat
- Tietokanta- ja monitorointipalvelut

### 6. Headless-toiminta (skripteissä ja CI:ssä)

```bash
claude -p "Miksi tämä build epäonnistui?" --output-format json
```

Tämä mahdollistaa Clauden käytön skripteissä ja CI/CD-putkissa ilman interaktiivista käyttöliittymää.

## Miksi kurssilla painotetaan "agenttikehitystä"?

Usein ajatellaan, että tekoäly auttaa "kirjoittamaan koodia". Mutta oikea voima on **ohjelmiston kehittäminen itsenäisesti**. Se tarkoittaa järjestelmää, jossa:

- **Claude** pystyy tekemään toistuvia tehtäviä (esim. koodin formatointi, testien ajo, checklistit)
- **Hooks** estävät vaaralliset toiminnot automaattisesti
- **Sub-agentit** toimivat omissa konteksteissaan ilman pääsessioita häiritsemistä
- **Checkpointit** mahdollistavat aina paluun aikaisempaan kunnon tilaan

Tämä on kuin siirtyä "tehdään töitä chatin avulla" -ajatuksesta "rakennetaan hallittu agentti, joka toimii yhdessä meidän kanssamme".

---

## Seuraavaksi

!!! question "Jos olet täysin aloittelija"
    Siirry [Lukuun 1: Johdanto Claude Codeen](../johdanto/mita-on-claude-code.md),
    jossa tarkastellaan tarkemmin miten Claude Code toimii ja miten sitä käytetään.

!!! tip "Jos olet jo tuttu CLI:n kanssa"
    Voit siirtyä suoraan [Lukuun 2: Arkkitehtuuri](../arkkitehtuuri/arkkitehtuuri.md),
    tai yrittää [Harjoituksen 01: Ensimmäinen read-only työ](../harjoitukset/01-read-only-tyo.md).
