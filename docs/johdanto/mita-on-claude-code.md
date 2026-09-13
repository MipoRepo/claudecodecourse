# 1.0 Johdanto Claude Codeen

## 1.1 Mikä Claude Code on?

Claude Code on **CLI-pohjainen kehitysympäristö**, jossa kielimalli toimii kuin ohjelmistokehittäjä, jolla on pääsy projektin rakenteeseen, tiedostoihin ja työkaluihin. Se ei ole “chatbot”, vaan agentti, joka voi:

!!! abstract "Määritelmä"

    **Claude Code** on agenttityyppinen ohjelmistokehitysympäristö, jossa kielimalli:

    - voi **lukea** projektia (tiedostot, testit, asetukset)
    - voi **hakea tietoa** (Grep, Glob, MCP-resurssit)
    - voi **muokkata tiedostoja** (Edit, Write)
    - voi **suorittaa komentoja** (Bash)
    - voi **käyttää MCP-palveluiden tarjoamia työkaluja**
    - voi **orkestroida erillisiä agentteja** (sub-agentit)

### Tärkeimmät eroavaisuudet chat-käyttöliittymiin verrattuna

| Ominaisuus | Chat-käyttöliittymä (web/työpöytö) | Claude Code (CLI Agent) |
|------------|--------------------------|------------------------|
| Toimintalaajuus | ✅ vain tekstivastauksia | ✅ teksti + tiedostot + Bash + työkalut |
| Projektiin integroituminen | ❌ ei pääsyä tiedostoihin | ✅ lukee koko projektin |
| Automaation mahdollisuus | ❌ rajoittunut | ✅ hooks, MCP, sub-agentit |
| Hallinta | ❌ ei tarkkaa kontrollia | ✅ permission rules + hookit |
| Headless-tila | ❌ ei tue | ✅ `claude -p` -tila |


## Claude Code -malli

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

## Miksi tämä on merkittävää? Claude Code muuttaa kehitystyön luonnetta:

- Agentit voivat hoitaa kokonaisia kehitystehtäviä (debuggaus, refaktorointi, testien generointi).
- Projektin sisäinen automaatio (hooks, permission rules) mahdollistaa turvallisen ja kontrolloidun työnkulun.
- Headless-tila mahdollistaa CI/CD-integraatiot ja automaattiset tarkistukset.
- Sub-agentit tuovat rinnakkaisen työn ja roolijaon (reviewer, debugger, security-agentti).
- Käytännössä se on kuin tiimi kehittäjiä, jotka toimivat projektin sisällä — mutta agentteina.

### Tärkeä periaate

> **Kielimalli tekee päätöksiä todennäköisyysperusteisesti, mutta hookit, permissionsäännöt, Git ja CI voivat tehdä kriittisistä kohdista deterministisiä.**

Claude Code toimii parhaiten, kun nämä vastuut erotellaan toisistaan.

## Esimerkki 01: Ensimmäinen hallittu työ

```bash
claude --permission-mode plan
```

### Esimerkkikomento

> *Kartoita tämä repository. Älä muokkaa tiedostoja. 
> Kerro: 
> 1) arkkitehtuuri 
> 2) entry pointit 
> 3) build/test-komennot 
> 3) riskialueet 
> 5) ehdotus seuraavista muutoksista.*

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
