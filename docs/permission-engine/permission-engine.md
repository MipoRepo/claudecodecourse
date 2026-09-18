# 2. Permission Engine (Lupa-moottori)

## 2.1 Johdanto

Claude Coden **Permission Engine** on kerroksinen lupajärjestelmä, joka määrittää, mitä toimintoja agentti saa suorittaa projektissa. 

Jokainen agentin ehdottama toiminto — kuten tiedoston luku, koodin kirjoitus, Bash-komennon suoritus tai MCP-kutsu — kulkee aina **kolmen peräkkäisen kerroksen** läpi tässä ehdottomassa järjestyksessä:

1. **Deny (Estä):** Estetään toiminto välittömästi ilman käyttäjältä kysymistä.
2. **Ask (Kysy):** Pysäytetään suoritus ja pyydetään käyttäjältä eksplisiittinen hyväksyntä.
3. **Allow (Salli):** Sallitaan toiminnon suoritus automaattisesti.

---

## 2.2 Kerrosmallinen lupajärjestelmä

Tarkistusjärjestys `Deny → Ask → Allow` takaa **deterministisen turvallisuuden**: vaaralliset toiminnot pysäytetään välittömästi, epäselvissä tilanteissa siirretään päätös ihmiselle ja ennalta turvalliset rutiinit etenevät sujuvasti.

### 1. Deny (Estä) — Ylin prioriteetti
* Tarkistetaan ensimmäisenä, onko toiminto määritelty **kielletyksi**.
* Jos kielto löytyy, pyyntö pysäytetään välittömästi.
* *Deny*-säännöt ovat ehdottomia: ne voittavat aina *Ask*- ja *Allow*-säännöt.

### 2. Ask (Kysy) — Varmistusvaihe
* Jos suoraa kieltoa ei ole, tarkistetaan, vaatiiko toiminto **ihmisen vahvistuksen**.
* Agentti ei suorita komentoa automaattisesti, vaan näyttää käyttäjälle vahvistuspyynnön.
* Tämä estää hallitsemattomat tai odottamattomat sivuvaikutukset.

### 3. Allow (Salli) — Automaattinen suoritus
* Jos pyyntöä ei ole kielletty eikä se vaadi erillistä vahvistusta, se siirtyy *Allow*-kerrokseen.
* Toiminto hyväksytään ja suoritetaan taustalla ilman keskeytyksiä.

---

## 2.3 Vertauskuva aloittelijalle: Kolmitasoinen kulkuoikeus

Ajattele Permission Engineä kuin **kolmitasoista turvatarkastusta toimistossa**:

* **Deny = Turvamies ovella:**  
  Jos sinulla on porttikielto tai kulkulupasi puuttuu, sinut käännytetään heti takaisin. Et pääse pidemmälle, vaikka sinulla olisi kutsu.
* **Ask = Vastaanotto:**  
  Jos alueelle menolle ei ole suoraa estettä, mutta kyseessä on vierailijakohde, vastaanotto soittaa isännälle ja kysyy luvan ennen pääsyä.
* **Allow = Avoin toimistotila:**  
  Kun olet ohittanut turvamiehen ja saanut tarvittaessa luvan vastaanotosta, voit liikkua sallitulla alueella vapaasti.

Claude Code toimii täsmälleen samalla logiikalla: se tarkistaa aina ensin **"onko tämä kielletty?"**, sitten **"pitääkö tästä kysyä?"**, ja vasta lopuksi **"suoritetaanko tämä automaattisesti?"**.

---
| Käytännön esimerkki: Miten lupa-moottori käsittelee eri komentoja |
|---|
| **Määritellyt säännöt:**<br>* **Deny (Estä):** `rm -rf *` ja `.env`-tiedostojen muokkaus<br>* **Allow (Salli):** `npm test` ja `src/`-kansion lukeminen<br>* **Oletus:** Kaikki muut toiminnot vaativat vahvistuksen (**Ask**). |
| **Tapaus 1: Vaarallinen komento (`rm -rf build`)**<br><br>1. **Deny:** Täsmää kiellettyyn komentokaavaan `rm -rf *`.<br>2. **Tulos:** **Pysäytetty välittömästi.** Komentoa ei ajeta, eikä käyttäjältä kysytä. Agentti saa ilmoituksen, että toiminto on kielletty. |
| **Tapaus 2: Rutiininomainen automaattitesti (`npm test`)**<br><br>1. **Deny:** Ei kieltoa.<br>2. **Ask:** Ei vaadi erillistä kysymystä.<br>3. **Allow:** Täsmää sallittujen komentojen listaan.<br>4. **Tulos:** **Suoritetaan automaattisesti.** Testit ajetaan taustalla keskeyttämättä kehittäjän työvuoa. |
| **Tapaus 3: Uuden kirjaston asennus (`npm install lodash`)**<br><br>1. **Deny:** Ei kieltoa.<br>2. **Ask:** Komennolle ei ole suoraa automaattilupaa, joten se pysähtyy tähän kerrokseen.<br>3. **Tulos:** **Kysytään käyttäjältä.** Päätteelle ilmestyy vahvistuspyyntö:<br>
***Claude Code wants to run: npm install lodash <br> [Allow once] [Allow for session] [Deny]<br>***|

---------
# Käytännön esimerkki: CI/CD-putken korjaaminen ja turvallisuus

## 1. Projektin lupasäännöt (`.claude/settings.json`)

Kehitystiimi on määritellyt ohjelmistoprojektin juureen seuraavan konfiguraation:

```json
{
  "permissions": {
    "deny": [
      "Bash(git push*)",
      "Edit(.env*)"
    ],
    "allow": [
      "Bash(npm test)",
      "Bash(npm run lint)",
      "Read(src/**)"
    ]
  }
}
```

> **Tärkeä huomio: Asetustiedostojen tallennuspaikka ja laajuus**
>
> **Käyttäjäkohtainen (Globaali)**
> * **Tallennuspaikka:** Käyttäjän kotihakemisto (`~/.claude.json`)
> * **Pätevyys:** Kaikissa tietokoneellasi ajettavissa projekteissa.
> * **Git-versiointi:** Ei versioida (henkilökohtainen konekohtainen asetus).
>
> **Projektikohtainen (Tiimi)**
> * **Tallennuspaikka:** Projektin juurihakemisto (`.claude/settings.json`)
> * **Pätevyys:** Vain kyseisessä koodiprojektissa kaikille tiimin kehittäjille.
> * **Git-versiointi:** Kyllä (tallennetaan Gitiin ja jaetaan tiimin kesken).
---

## 2. Tilanne ja agentin tehtävä

Kehittäjä antaa Claude Coodelle tehtävän:
"Korjaa epäonnistuva yksikkötesti ja varmista, että koodi menee läpi linteristä."

Tämän tehtävän aikana agentti pyytää suorittamaan neljä eri toimintoa.

---

## 3. Toimintojen käsittely Permission Enginessä

| Vaihe | Agentin ehdottama toiminto | Permission Engining tarkistusketju | Lopullinen päätös ja seuraus |
|---|---|---|---|
| 1. Koodin lukeminen | Read(src/utils/calculator.js) | 1. Deny: Ei täsmää kieltoihin.<br>2. Ask: Ei vaadi vahvistusta.<br>3. Allow: Täsmää sääntöön Read(src/**). | Sallittu automaattisesti<br>Agentti lukee tiedostonsisällön viiveettä. |
| 2. Testien ajaminen | Bash(npm test) | 1. Deny: Ei täsmää kieltoihin.<br>2. Ask: Ei vaadi vahvistusta.<br>3. Allow: Täsmää sääntöön Bash(npm test). | Sallittu automaattisesti<br>Testit ajetaan taustalla ja agentti näkee virheilmoituksen. |
| 3. Ympäristömuuttujien lukeminen | Edit(.env.local) | 1. Deny: Täsmää kieltoon Edit(.env*). | Estetty välittömästi<br>Toiminto pysähtyy eka kerrokseen. Agentti saa virheilmoituksen ja etsii korjauksen muualta. |
| 4. Muutosten vienti etäpalvelimelle | Bash(git push origin main) | 1. Deny: Täsmää kieltoon Bash(git push*). | Estetty välittömästi<br>Agentti ei voi vahingossakaan viestiä koodia tuotantoon. |
| 5. Uuden korjaustiedoston luonti | Write(src/utils/calculator.test.js) | 1. Deny: Ei täsmää kieltoihin.<br>2. Ask: Ei automaattilupaa, siirtyy kyselyvaiheeseen. | Kysytään käyttäjältä<br>Päätteelle ilmestyy vahvistuspyyntö ihmiselle. |

---

## 4. Käyttäjän näkemä vahvistuspyyntö (Vaihe 5)

Kun toiminto pysähtyy Ask-kerrokseen, kehittäjän päätteelle tulostuu seuraava valikko:

```text
Claude Code wants to write to a file:
  File: src/utils/calculator.test.js

Do you want to allow this action?
  [y] Yes (Allow once)
  [s] Session (Allow for this session)
  [n] No (Deny)
```

Jos kehittäjä valitsee y tai s, tiedosto kirjoitetaan ja agentti jatkaa työtään. Jos kehittäjä valitsee n, toiminto estetään ja agentti mukauttaa toimintaansa vastauksen perusteella.