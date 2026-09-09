# Välitallennus – päivitysraportti

**Päivitetty:** 2026-09-09

---

## ✅ TEHTY

### 1. Uudet sivut – OpenRouter ja LLM-mallin valinta

Luotu neljä uutta markdown-sivua lähdetiedostojen pohjalta:

| Tiedosto | Kuvaus |
|----------|--------|
| `docs/openrouter/johdanto.md` | Johdanto OpenRouteriin: mikä se on, arkkitehtuuri, Claude Code -integraatio, ilmaiskäyttö |
| `docs/openrouter/api-avaimet.md` | API-avaimen luominen, suojaaminen, ympäristömuuttujat, ilmaismallien käyttörajat, $0-raja |
| `docs/llm-mallin-valinta/claude-codessa.md` | LLM-mallin valinta agenttikäyttöä varten: tool calling, arkkitehtuuri, tarkistuslistat |
| `docs/llm-mallin-valinta/vertailu.md` | Käytännön testitapaukset, pisteytysmalli, ilmaismallien erityispiirteet |

---

### 2. mkdocs.yml – uusi valikkorakenne

Uudelleen rakennettu kolmitasoinen navigaatio:

- **Etusivu** (tab): Aloitussivu, Johdanto, Teknologian perusteet, **OpenRouter**, **LLM-mallin valinta**
- **Kurssi** (tab): Arkkitehtuuri → Turvallisuus → Yhteenveto → Liitteet
- **Harjoitukset** (tab): Kaikki 35 harjoitusta omina alasivuina

Lisäksi korjattu:
- `navigation.trail` (ei-validi) → `navigation.tracking`
- `content.code.linenumbers` (ei-validi) poistettu
- Teeman toggle-tekstit korjattu (`tumman teeman käyttööön` → `tummaan teemaan`)
- Harjoitusnimissä pieniä kielikorjauksia (`Bugfix-session` → `Bugfix-sessio`, `TDD työskentely` → `TDD-työskentely`)

---

### 3. Merkistöongelma – arkkitehtuuri.md

`docs/arkkitehtuuri/arkkitehtuuri.md` oli kaksinkertaisesti koodattu UTF-8 → Windows-1252 → UTF-8. Korjattu PowerShellillä ohjelmallisesti. Tiedosto on nyt oikein UTF-8-koodattu.

---

### 4. Kielioppi- ja teknisten virheiden korjaukset

#### docs/index.md
- `erikoagenteilla` → `erikoisagenteilla`
- `uusittavilla prosesseilla` → `toistettavilla prosesseilla`
- `ettet turvallisuus` → `että turvallisuus`
- `Erillittyjä Git-checkoutit` → `Erillisiä Git-checkouteja`

#### docs/johdanto/mita-on-claude-code.md
- `chat-käyttöliittämänä` → `chat-käyttöliittymänä` (useita kohtia)
- `Ulapisuus` → `Toimintalaajuus` (taulukko)
- `vain teksti vastaukse` → `vain tekstivastauksia`
- `rajoittua` → `rajoittunut`
- `ei tarkkaa kontroleja` → `ei tarkkaa kontrollia`
- `keruksi yhteyskäsitteistä` → `kerroksisena kokonaisuutena`
- `Tärkeää periaate` → `Tärkeä periaate`

#### docs/johdanto/terminologia.md
- `Käytäntö tulkinta` → `Käytännön tulkinta`
- `paluu aikaisempaan tilaan` → `palauta aiempaan tilaan`
- `Parhaat käytännit` → `Parhaat käytännöt`

#### docs/johdanto/mielenmalli.md
- `Arkkkitehtuurinäkymä` → `Arkkitehtuurinäkymä`
- `toistettavat työt prosessit` → `toistettavat työprosessit`
- `Erotti **fyysisesti** koodit` → `Erottaa **fyysisesti** koodit`

#### docs/johdanto/permission-engine.md
- `Keruuslupa järjestelmä` → `Kerrosmallinen lupajärjestelmä`
- `Rajoita vain read-only` → `Rajoittuu vain read-only`
- `kontrollidoissa` → `kontrolloiduissa`

#### docs/arkkitehtuuri/arkkitehtuuri.md (lisäksi merkistökorjauksen jälkeen)
- `Keruusmodeli` → `Kerrosmalli`
- `komentoskriptidit` → `komentoskriptit`
- `Uudelleenkäytettävät työt prosessit` → `Uudelleenkäytettävät työprosessit`
- `joka saa paikallisen konefilun` → `joka pysyy paikallisella koneella`
- `Projekti- tai tiimosäännöt` → `Projekti- tai tiimikohtaiset säännöt`
- Subagent/Hook -rivit olivat sekoittuneet taulukossa — korjattu oikeisiin rooleihin
- `keruusmallinen` → `kerrosmallinen`
- `EXCITEUTE` → `EXECUTE`
- `Kysyy jokaiselta toimiolle` → `Kysyy jokaisesta toiminnosta`
- `Rajoita vain` → `Rajoittuu vain`
- `tarittaessa` → `tarvittaessa`

#### docs/teknologian-perusteet/aloitus.md
- `tietokannit` → `tietokannat`
- `hän ei oikeuta ikinä itse itseään` → `hän ei ikinä tee mitään ilman lupaasi`
- `siltainen tekoälyavustaja` → `tekoälyavustaja`
- `Työtyytyväisyys` → `Työskentelytapa`
- `Erillitila` → `Sub-agentit`
- `plani-moodissa` → `plan-moodissa`
- `Kun sallit vastoin` → `Kun sallit muutokset`
- `nimimällä` → `nimellä`
- `erityistoimteinen` → `erikoistunut`
- `tilapuhtaan (context)` → `oman konteksti-ikkunan`
- `Ominaistyömateriaalien yhdistäminen` → `Ulkoisten palveluiden yhdistäminen`
- `skrippeissä` → `skripteissä`
- `agenttikehittelyä` → `agenttikehitystä`
- `yhtehtiloina` → `konteksteissaan`
- `rakendamme` → `rakennetaan`
- `täysin aloitto` → `täysin aloittelija`
- `jo tutut kanssa CLI:llä` → `jo tuttu CLI:n kanssa`

#### docs/teknologian-perusteet/edistyneelle.md
- `tilo- tai komennopohjainen` → `tila- tai komentopohjäinen`
- `päätöksenteko järjestelmä` → `päätöksentekojärjestelmä`
- `tyhjentävää toimia` → `toimia`
- `toisiaan tapahtuvat tiedot` → `toisiinsa liittyviä tietoja`
- `epävaroja` → `epävarmoja`
- `rajoitettun koko` → `rajoitetun kokoinen`
- `Alkupuku` → `Alkuanalyysi`
- `jolka voi:` → `joka voi:`
- `Estää työmän täysin estoon` → `Estää toiminnon kokonaan`
- `Trigger-ata CI-jobeja` → `Laukaista CI-jobeja`
- `PROMPTSIEN` → `Promptien`
- `Piirin päivän oikeudet` → `Pienimmän tarvittavan oikeuden periaate`
- `Ihisen hyväksynnän` → `Ihmisen hyväksynnän`
- `Tuotantomerkkojen` → `Tuotanto- ja staging-ympäristöjen`
- `pääsession luppea` → `pääsession lupaa`
- `rinnavaista kehittelyä` → `rinnakkaista kehitystä`
- `headless työmän rajoittaminen` → `headless-agentin työkalujen rajoittaminen`

#### docs/parhaat-käytännit/12-periaatetta.md
- `Parhaat käytännit` → `Parhaat käytännöt`
- `!!! tIP` → `!!! tip`
- `rinnainen tehtävä` → `rinnakkainen tehtävä`
- `Dokumentaatiotekstuus` → `Dokumentaation tarkistus`
- `Pääkeskustelukäyttää` → `Pääkeskustelu käyttää`

#### docs/hooks/index.md
- `prompt-pohjäinen` → `prompt-pohjainen` (useita kohtia)
- `Subagent kynnistyy` → `Subagent käynnistyy`
- `Asukset muuttuvat` → `Asetukset muuttuvat`
- `kehitty nopasti` → `kehittyy nopeasti`

#### docs/turvallisuus/index.md
- `haitallinen ohjautiedosto` → `haitallisen ohjaustiedoston`
- `EI KÄYTÄ TUOANNUKSEEN tuotantoon` → `EI KÄYTÄ TUOTANTOON`
- `joka esto` → `joka estää`
- `simuloi haitallinen` → `simuloitu haitallinen`
- `itsestäään` → `itsestään`
- `requestinä` → `requestina`

#### docs/mcp/index.md
- `primitiöötiä` → `primitiivejä`

#### docs/harjoitukset/01-read-only-tyo.md
- `mitän rakennetta` → `millaista rakennetta`
- `missä potentiaalisessa riskialueissa on` → `mitkä ovat potentiaaliset riskialueet`
- `öppeliä` → poistettu, korvattu luontevalla suomenkielisellä ilmauksella

#### docs/harjoitukset/05-reviewer-agentti.md
- `syntymisriskiä` → `sivuvaikutusten riskiä`
- `arvoiteluwiin` → `arveluttaviin`

#### Useissa tiedostoissa
- `käytännit` → `käytännöt` (checkpoints/index.md, harjoitukset/index.md, harjoitukset/02-kontekstin-seuranta.md)

---

## ⏳ TEKEMÄTTÄ / KESKEN

### A. Harjoitukset 03–04, 06–35 (pikaskannaus tehty vain 01, 02, 05)

Harjoituksia on 35, joista vain muutama on tarkistettu yksityiskohtaisesti. Todennäköisesti muissakin harjoituksissa on vastaavia kielioppi- ja kirjoitusvirheitä kuin tarkastetuissa. Suositeltu jatkotoimenpide: käydä läpi kaikki harjoitustiedostot samalla tavoin kuin pääsivut.

### B. Liitteet (liite-a, liite-b, liite-c, liite-d) — ei tarkistettu

Liitesivuja ei ole käyty läpi systemaattisesti. Saattaa sisältää vastaavia virheitä.

### C. Kurssisivut: skills, sub-agents, git-worktrees, parallel-sessions, headless-mode, yhteenveto — ei tarkistettu

Näitä ei ole käyty läpi tarkasti tässä sessiossa. Nopea silmäily osoitti, että sub-agents- ja skills-sivuilla teksti vaikutti luettavalta, mutta niitä ei ole tarkistettu rivi riviltä.

### D. Harjoitusten ratkaisupuoli — ei erillisiä ratkaisusivuja

Ohjeessa mainittiin, että jokaisella harjoituksella pitäisi olla oma ratkaisu omana alasivunaan. Tällä hetkellä ratkaisu on kunkin harjoitustiedoston sisällä samassa tiedostossa, ei erillisenä sivuna. Tämä on rakenteellinen puute, jota ei ole korjattu.

### E. Liitetiedostoa ei tarkistettu encoding-ongelmien varalta

Vain `docs/arkkitehtuuri/arkkitehtuuri.md` osoittautui kaksinkertaisesti koodatuksi. Muut tiedostot vaikuttivat olevan kunnossa (UTF-8-tarkistus tehty automaattisesti), mutta joissain voi olla piileviä merkkiongelmia erityisesti erikoismerkkien kohdalla.

---

## 📋 JATKOPROMPTI (liitä suoraan seuraavaan sessioon)

```
Jatka MkDocs-verkkosivujen tarkastustyötä F:\00. AIDE\ClaudeCodekurssi\ -hakemistossa.
Lue ensin paivitys.md projektin juuresta — se kertoo mitä on jo tehty.

Tekemättä ovat:
1. Harjoitukset 03–04 ja 06–35: käy läpi kaikki tiedostot docs/harjoitukset/-kansiosta,
   korjaa kielioppi- ja tekniset virheet (sama taso kuin 01, 02, 05 -harjoitusten korjauksissa).
2. Liitteet: docs/liitteet/liite-a-komennot.md, liite-b-projektarakenne.md,
   liite-c-lähteet.md, liite-d-esimerkit/index.md — tarkista ja korjaa virheet.
3. Kurssisivut: docs/skills/index.md, docs/sub-agents/index.md (pikaskannaus tehty mutta
   ei yksityiskohtaista tarkistusta), docs/git-worktrees/index.md, docs/parallel-sessions/index.md,
   docs/headless-mode/index.md, docs/yhteenveto.md — tarkista ja korjaa virheet.
4. Kun kaikki on tarkistettu, luo todo.md projektin juureen (ei docs/-kansioon)
   ohjeiden mukaisena lopullisena yhteenvetona.

Ohjeet ovat samat kuin alkuperäisessä toimeksiannossa:
- Korjaa tieto- ja kielioppivirheet suoraan tiedostoihin.
- Säilytä vakiintuneet termit: sub-agentti, skill, hook, MCP, worktree.
- Enintään 3 yritystä per ongelma, sen jälkeen merkitse kesken ja jatka eteenpäin.
- Luo lopuksi todo.md-tiedosto projektin juureen.
```
