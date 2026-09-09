# Claude Code - Pieni käytäntö opas

!!! info "Tämä on paikallispohjainen sivusto"
    Tämä dokumentaatio on luotu PDF-materiaalin *Claude Code - Täydellinen käytäntö opas* pohjalta.
    Se on tarkoitettu sekä aloittelijalle että edistuneelle kehittäjälle, joka haluaa oppia
    Claude Code -agenttikehitysympäristön käyttämään täysimääräisesti.

## Mitä tässä oppaassa opit?

Tämä opas tarkastelee Claude Codea **kehitysympäristönä** — ei pelkkänä chat-käyttöliittymänä. Keskeinen ajatus on, että Claudea voidaan ohjata **kontekstilla**, **säännöillä**, **erikoisagenteilla**, **toistettavilla prosesseilla**, **deterministisillä hookeilla** ja **ulkoisilla MCP-työkaluilla**.

Tavoitteena on saada enemmän automaatiota ilman, että turvallisuus, jäljitettävyys tai hallittavuus kärsivät.

## Sivuston rakenne

| Osa | Kuvaus |
|-----|--------|
| **Teknologian perusteet** | Lyhyt johdanto sekä aloittelijalle että edistuneemmalle käyttäjälle |
| **Luvut 1–13** | Claude Code edistynyt käyttö opiskelumeteriaalit |
| **Liitteet A–D** | Komennot, projektirakenne, lähteet ja käytännön esimerkit |
| **Harjoitukset** | 35 itsenäistä harjoitusta ratkaisuilla |

## Aloita tästä

Valitse alla olevista linkeistä:

!!! tip "Aloittelijat"
    Aloita [Teknologian perusteet → Aloittelijalle](teknologian-perusteet/aloitus.md),
    jossa selvitetään mitä Claude Code pystyy ja miksi se eroaa tavallisesta ChatGPT:stä.

!!! advanced "Edistyneet käyttäjät"
    Siirry suoraan [Luku 2: Arkkitehtuuri ja periaatteet](arkkitehtuuri/arkkitehtuuri.md),
    jossa tarkastellaan kerrosmallia ja permission engine -periaatteita.

## Teknologian perusteiden päivittäminen

!!! example "Harjoitus"
    [Harjoitus 01: Ensimmäinen read-only työ](harjoitukset/01-read-only-tyo.md)
    on helppo aloitus, jossa harjoitellaan repositoryn tutkimista ilman muutoksia.

## Mitä uutta?

PDF:n päivitysversiosta katsien:

- **Sub-agentit** → `.claude/agents/`-kansioon sijoitettavat erikoistuneet agentit
- **Skills** → `.claude/skills/`-kansioon sijoitettavat uudelleenkäytettävät työt prosessit
- **Hooks** → `.claude/hooks/`-kansioon sijoitettavat deterministiset tapahtumankäsittelijät
- **MCP** → Model Context Protocol -ulkoiset työkalut ja tietolähteet
- **Worktrees** → Erillisiä Git-checkouteja rinnakkaiseen kehittämiseen
- **Headless mode** → `claude -p` skripteissä ja CI/CD:ssä
- **Checkpoints** → `/rewind`-toiminto aiempiin tiloihin palatuksessa

---

<div class="md-admonition-wrapper">
<p align="center"><em>Tarkista aina
 versiopoikkeavuudet omasta versiosi <code>claude --help</code> -komennolla.</em></p>
</div>
