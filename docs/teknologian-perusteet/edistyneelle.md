# Claude Coden sisäinen arkkitehtuuri — lyhyesti

Claude Code ei ole pelkkä komentorivityökalu, vaan kerroksinen agenttiarkkitehtuuri. Sen toiminta perustuu viiteen mekanismiin, jotka yhdessä määrittävät, mitä agentti näkee, mitä se saa tehdä, miten se tekee päätöksiä ja miten se käyttää ulkoisia resursseja.

!!! tip "Aloittelijalle: Miten Claude Coden arkkitehtuuri kannattaa ajatella?"
    Claude Codea voi ajatella kuin **projektissa työskentelevänä analysoivana
    järjestelmänä**, joka käyttää viittä eri “tietolähdettä” ja “turvakerrosta”
    tehdäkseen päätöksiä.

    **Context** on kuin *työpöytä, jolle kaikki tarvittava tieto kerätään*:  
    projektin säännöt, keskustelun aiemmat vaiheet ja työkalujen tulokset
    kootaan yhteen paikkaan, jotta agentti voi käyttää niitä päätöksenteossa.

    **Permission Engine** on kuin *pääsynhallinta*:  
    se määrittää, saako agentti vain lukea, kysyä lupaa vai myös muokata
    tiedostoja.

    **Hooks** ovat kuin *automaattiset tarkistuspisteet*:  
    ne suorittavat ennalta määritettyjä komentoja ennen riskialttiita toimintoja.

    **Sub‑agentit** ovat kuin *erillisiä työhuoneita*:  
    jokaisella on oma rajattu työtila ja omat työkalut, jotta tehtävät pysyvät
    erillään ja turvallisina.

    **MCP** on kuin *turvallinen rajapinta ulkoisiin järjestelmiin*:  
    sen kautta Claude voi hakea tietoa tai käyttää palveluita, mutta vain
    tarkasti rajatuilla oikeuksilla.

    Näiden mekanismien ansiosta Claude Code voi toimia tehokkaasti ja
    autonomisesti — mutta aina hallitusti ja ennustettavasti.


## 1. Context — mitä agentti näkee
Context on agentin “näköaisti”. Se koostuu projektin pysyvistä säännöistä (CLAUDE.md), istunnon keskusteluhistoriasta ja työkalujen tuottamista tuloksista. Konteksti on rajallinen, joten sitä tiivistetään automaattisesti.

## 2. Permission Engine — mitä agentti saa tehdä
Permission Engine määrittää agentin oikeudet: lukea, kysyä lupaa tai kirjoittaa suoraan. Tämä kerros estää ei‑toivotut muutokset ja varmistaa hallitun automaation.

## 3. Hooks — automaattiset tarkistukset
Hookit ovat deterministisiä tarkistuksia, jotka suoritetaan ennen tiettyjä toimintoja. Niillä voidaan estää vaarallisia komentoja, lisätä auditointia tai muokata pyyntöjä ennen kuin agentti toimii.

## 4. Sub‑agentit — eristetyt roolit ja kontekstit
Sub‑agentit ovat erillisiä “työntekijöitä”, joilla on omat kontekstit ja rajatut oikeudet. Ne mahdollistavat turvallisen rinnakkaisen työn ilman, että pääagentti saa liikaa valtaa.

## 5. MCP — ulkoisten tietolähteiden integraatio
Model Context Protocol yhdistää Claude Coden ulkoisiin järjestelmiin, kuten tietokantoihin, GitHubiin ja Jiraan. MCP toimii hallitusti ja noudattaa vähimmän oikeuden periaatetta.

---

## Miksi tämä arkkitehtuuri on tärkeä?
Nämä viisi mekanismia muodostavat hallitun ja turvallisen agenttialustan, jossa:

- agentti voi toimia itsenäisesti  
- mutta kaikki toiminta on rajattua ja valvottua  
- ulkoiset työkalut integroidaan turvallisesti  
- tehtävät voidaan jakaa erillisiin rooleihin  
- projektin säännöt pysyvät aina mukana kontekstissa

Claude Code toimii näin kuin tiimin jäsen — mutta kontrolloidusti ja ennustettavasti.
