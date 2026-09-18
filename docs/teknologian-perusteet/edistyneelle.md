#  Claude Code ja viisi keskeistä mekanismia

Claude Codea voi ajatella kuin **projektissa työskentelevänä analysoivana järjestelmänä**, joka käyttää viittä erillistä mekanismia tehdäkseen päätöksiä turvallisesti ja ennustettavasti. Nämä mekanismit ovat **rakenteellisia osia**, jotka määrittävät mitä tietoa järjestelmä käyttää ja millä oikeuksilla se toimii.

!!! tip "Claude Coden arkkitehtuurin viisi keskeistä mekanismia."
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

## Miksi tämä arkkitehtuuri on tärkeä?

Nämä viisi mekanismia muodostavat hallitun ja turvallisen agenttialustan, jossa:

- agentti voi toimia itsenäisesti  
- mutta kaikki toiminta on rajattua ja valvottua  
- ulkoiset työkalut integroidaan turvallisesti  
- tehtävät voidaan jakaa erillisiin rooleihin  
- projektin säännöt pysyvät aina mukana kontekstissa

**Claude Coden eri mekanismit toimivat näin kuin tiimin jäsenet — kontrolloidusti ja ennustettavasti.**
