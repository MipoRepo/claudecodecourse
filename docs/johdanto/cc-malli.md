# 1.2 Claude Coden arkkitehtuurimalli  

Claude Code ei ole pelkkä komentorivityökalu, vaan **kerroksinen agenttiarkkitehtuuri**, jossa jokainen osa hoitaa oman vastuualueensa. Malli auttaa ymmärtämään, miten Claude Code käsittelee tehtäviä, miten konteksti rakentuu ja miten determinismi ja todennäköisyyspohjainen päättely erotellaan toisistaan.

Tämä rakenne on tärkeä, koska se mahdollistaa:

- turvallisen ja hallitun automaation  
- selkeän roolijaon eri agenttien välillä  
- projektin sisäisen pysyvän kontekstin  
- ulkoisten työkalujen ja tietolähteiden integroinnin  
- rinnakkaisen kehityksen ilman sotkua  

Alla oleva malli kuvaa Claude Coden sisäisen toimintalogiikan.

---

## Arkkitehtuurinäkymä

Käyttäjä antaa **promptin tai tehtävän**. Tämä kulkee seuraavan arkkitehtuurin läpi:

1. **CLAUDE.md + säännöt**  
   Pysyvä projektikohtainen konteksti, joka määrittää agentin toimintaperiaatteet.

2. **Skills**  
   Toistettavat, deterministiset työprosessit (esim. refaktorointi, analyysi, auditointi).

3. **Sub-agents**  
   Erilliset agentit omalla kontekstilla ja roolilla (reviewer, debugger, researcher).

4. **Hooks**  
   Deterministiset tarkistukset ja automaatiot, jotka suoritetaan tapahtumien yhteydessä.

5. **MCP**  
   Ulkoiset työkalut ja tietolähteet (API:t, tietokannat, hakutyökalut, integraatiot).

6. **Worktrees**  
   Fyysisesti eristetyt työskentelypuut, jotka mahdollistavat rinnakkaisen kehityksen.

---

## Tärkein periaate

> **Kielimalli tekee päätöksiä todennäköisyysperusteisesti, mutta hookit, permissionsäännöt, Git ja CI voivat tehdä kriittisistä kohdista deterministisiä.**

Claude Code toimii parhaiten, kun nämä vastuut **erotellaan** toisistaan.

---

## Selitys

| Mekanismi | Miksi se on tärkeä? |
|-----------|---------------------|
| **CLAUDE.md** | Tarjoaa **pysyvän** kontekstin ja projektin perussäännöt |
| **Skills** | Automatisoi **toistuvat työt** deterministisesti |
| **Sub-agents** | Jaa työn eri **konteksteihin ja rooleihin** |
| **Hooks** | Tarjoaa **determinististä** tarkistusta ja automaatiota |
| **MCP** | Avaa pääsyn **ulkoisiin tietoihin ja työkaluihin** |
| **Worktrees** | Erottaa **fyysisesti** koodin ja mahdollistaa rinnakkaisen työn |

---

*Lähde: [S2] Features Overview*

