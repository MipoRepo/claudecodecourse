# 1. Mikä Claude Code on?

Claude Code on **CLI-pohjainen kehitysympäristö**, jossa kielimalli toimii kuin ohjelmistokehittäjä suoraan päätelaitteessasi (terminal). Se ei ole vain perinteinen tekstipohjainen "chatbot", vaan autonominen agentti, joka kykenee toimimaan suoraan projektisi koodikannassa.

> **Määritelmä: Agentti**
> Claude Code on agenttityyppinen kehitysympäristö, joka voi lukea tiedostoja, suorittaa Bash-komentoja, muokata koodia ja käyttää ulkoisia työkaluja itsenäisesti annettujen ohjeiden rajoissa.

---

## 1.2 Miten Claude Code eroaa chat-käyttöliittymistä?

| Ominaisuus | Chat-käyttöliittymä (Web / Desktop) | Claude Code (CLI Agent) |
|---|---|---|
| **Toimintalaajuus** | Vain tekstivastaukset ja koodipätkät | Teksti + Tiedostomuokkaukset + Bash-komennot |
| **Konteksti** | Käyttäjän liittämien tiedostojen varassa | Lukee ja ymmärtää koko Git-projektin rakennetta |
| **Automaatio** | Rajoittunut | Laajennettavissa työkaluilla, säännöillä ja sub-agenteilla |
| **Turvallisuus** | Ei suoraa pääsyä järjestelmään | Vahvistuspyynnöt (Permissions) ja deterministiset säännöt |

---

## 1.3 Miksi tämä muuttaa kehitystyötä?

Claude Code siirtää tekoälyavustuksen koodin kopioinnista ja liittämisestä (*copy-paste*) kokonaisvaltaiseen tehtävien hallintaan:

* **Kokonaisvaltainen kehitys:** Agentti voi etsiä bugin, kirjoittaa korjauksen, ajaa testit ja todentaa korjauksen toimivuuden.
* **Järjestelmällinen automaatio:** Rutiinitehtävät (kuten refaktorointi ja testien generointi) voidaan antaa agentin hoidettavaksi.
* **Tiimimäinen työskentely:** Agentille voidaan antaa selkeä rooli ja rajoitetut oikeudet projektin sisällä.

> **Tärkeä periaate:**
> Kielimalli tekee päätöksiä todennäköisyysperusteisesti, mutta projektin säännöt, lupa-asetukset ja Git-versionhallinta pitävät kriittiset toiminnot turvallisen deterministisinä.

---

### Seuraavaksi
→ **Luku 2: Claude Coden arkkitehtuuri ja rakenne** *(Sivulla syvennytään kerroksittaiseen rakenteeseen, kuten Hooks-, MCP- ja Sub-agent -mekanismeihin)*