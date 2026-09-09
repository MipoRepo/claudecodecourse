# 1. Johdanto Claude Codeen

> Tämä opas käsittelee **Claude Codea kehitysympäristönä**, eikä pelkkänä chat-käyttöliittymänä.

## 1.1 Mikä Claude Code on?

!!! abstract "Määritelmä"

    **Claude Code** on agenttityyppinen ohjelmistokehitysympäristö, jossa kielimalli:

    - voi **lukea** projektia (tiedostot, testit, asetukset)
    - voi **hakea tietoa** (Grep, Glob, MCP-resurssit)
    - voi **muokkata tiedostoja** (Edit, Write)
    - voi **suorittaa komentoja** (Bash)
    - voi **käyttää MCP-palveluiden tarjoamia työkaluja**
    - voi **orkestroida erillisiä agentteja** (sub-agentit)

### Tärkeimmät eroavaisuudet chat-käyttöliittymiin verrattuna

| Ominaisuus | Chat-käyttöliittymä (web) | Claude Code (CLI Agent) |
|------------|--------------------------|------------------------|
| Toimintalaajuus | ✅ vain tekstivastauksia | ✅ teksti + tiedostot + Bash + työkalut |
| Projektiin integroituminen | ❌ ei pääsyä tiedostoihin | ✅ lukee koko projektin |
| Automaation mahdollisuus | ❌ rajoittunut | ✅ hooks, MCP, sub-agentit |
| Hallinta | ❌ ei tarkkaa kontrollia | ✅ permission rules + hookit |
| Headless-tila | ❌ ei tue | ✅ `claude -p` -tila |

## 1.2 Videoaikaisen ja nykyisen terminologian ero

| Videon termi/komento | Nykyinen dokumentaatio | Käytännön tulkinta |
|---------------------|----------------------|-------------------|
| `doc/.claude/agents` | `.claude/agents/` | Projektin custom sub-agentit |
| `/re` | `/rewind` | Palauta checkpointiin |
| `claude -continue` | `claude --continue` / `claude -c` | Jatka viimeisintä sessiota |
| `claude -res NAME` | `claude --resume NAME` / `claude -r NAME` | Jatka nimettyä sessiota |

!!! note "Tärkeä huomio"
    Videon käyttämä lyhyt `/re`-komento on säilytetty, mutta virallisen dokumentaation
    mukaan käytetään nykyään `/rewind`. Molemmissa lähteissä idea on sama: jatka
    edellistä istuntoa tai palauta aikaisempiin tilaan.

## 1.3 Mielenmalli

Claude Code voidaan ajatella kerroksisena kokonaisuutena:

```
Käyttäjä (sinä)
  │
  ▼
prompt / tehtävä
  │
  ▼
Claude Code - pääsessio
  ├── CLAUDE.md + säännöt       ← pysyvä konteksti
  ├── Skills                   ← toistettavat työprosessit
  ├── Subagents                ← erillinen konteksti ja erikoisrooli
  ├── Hooks                    ← deterministiset tarkistukset
  ├── MCP                      ← ulkoiset työkalut ja tietolähteet
  └── Worktrees                ← fyysisesti erotetut työskentelypuut
```

### Tärkeä periaate

> **Kielimalli tekee päätöksiä todennäköisyysperusteisesti, mutta hookit, permissionsäännöt, Git ja CI voivat tehdä kriittisistä kohdista deterministisiä.**

Claude Code toimii parhaiten, kun nämä vastuut erotellaan toisistaan.

## Esimerkki 01: Ensimmäinen hallittu työ

```bash
claude --permission-mode plan
```

### Esimerkkikomento

> *Kartoita tämä repository. Älä muokkaa tiedostoja. Kerro: 1) arkkitehtuuri 2) entry pointit 3) build/test-komennot 3) riskialueet 5) ehdotus seuraavista muutoksista.*

Tämä on turvallinen tapa aloittaa — **plan-moodissa Claude voi vain lukea tiedostoja**, eikä missään nimessä muokata niitä.

## Esimerkki 02: Kontekstin kulutuksen seuranta

Kun työskentely alkaa pitkitella, tarkista, mitä kontekstiin oikeasti kertyy:

```bash
/context
/compact keskitytään API-muutosten päätöksiin ja avoimiin riskeihin
```

- `/context` näyttää kontekstin kulumisen
- `/compact` voi tiivistää keskustelua

!!! warning "VAROITUS 01"
    Älä ajattele checkpointtia Gitin korvikkeena. Checkpointit seuraavat Claude Code -
    muokkausten tilaa, mutta **eivät suojaa** ulkopuolisten prosessien tekemiltä muutoksilta.
    Git on edelleen oikea versionhallinta.

## Seuraavaksi

- [Luku 2: Arkkitehtuuri ja toimintaperiaatteet](../arkkitehtuuri/arkkitehtuuri.md)

---

*Lähde: Käyttäjän toimistelma [S1], Features Overview [S2]*
