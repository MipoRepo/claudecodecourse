# Harjoitus 01: Ensimmäinen read-only työ

!!! quote "Tavoite"
    Tutustua Claude Coden perustoimintaan **turvallisen plan-moodin** avulla,
    ennen kuin tekisit mitään muutoksia projektiisi.

## Taustaa

Kun aloitat uuden repositorin, paras lähestymistapa on ensin **tutkia** sitä. Tämä tarkoittaa:

- millaista rakennetta se sisältää
- mitkä ovat entry pointit
- mitkä ovat build- ja testikomennot
- mitkä ovat potentiaaliset riskialueet

## Tehtävä

Olet saanut uuden repositorin. Se on täynnä koodia, mutta sinulla ei ole kokemusta auki.

1. **Avaa terminalissasi** projekti kansiossa.
2. **Aja plan-moodi:**
   ```bash
   claude --permission-mode plan
   ```
3. **Komenna:**
   > *Kartoita tämä repository. Älä muokkaa tiedostoja. Kerro:
   > 1) missä arkkitehtuurissa se on
   > 2) missä entry pointit ovat
   > 3) mitkä ovat build/test-komennot
   > 4) missä potentiaaliset riskialueet ovat
   > 5) ehdota seuraavista muutoksista.*

4. **Tarkastele vastausta:**
   - Onko se selkeä?
   - Onko kaikki kysytyt tiedot saatu?

!!! tip "Vinkki aloittelijalle"
    Älä yritä vielä muuttaa mitään tässä vaiheessa. Tämä on **vain lukuaika** — kuten kirjan
    lukeminen ennen kirjoittamista.

---

## Ratkaisu

### Miksi plan-moodi?

`--permission-mode plan` on suunniteltu erityisesti **ensimmäisen tarkastelukierroksen** aikana.
Se estää kaikki kirjoitus- ja suoritustoiminnot (Edit, Write, Bash, etc.) siten, että Claude
voi vain **lukea tiedostoja** ja **raportoida takaisin**.

### Mitä Claude tekee?

1. Se lukee `CLAUDE.md` (jos se on olemassa).
2. Se käyttää `Glob` ja `Grep`-työkaluja kartoittamaan tiedostorakenteen.
3. Se etsii build-konfiguraatiot (`package.json`, `pyproject.toml`, `Makefile`, jne.).
4. Se etsii testikansioiden.
5. Se kokoaa yhteenvetoraportin.

### Esimerkkivastaus

```
## Repository Analysis

1. **Architecture**: Monialihakäyttöinen Python-palvelin FastAPI-kehyksessä.
2. **Entry points**:
   - `app/main.py` — FastAPI-sovellus
   - `app/api/routes/` — REST-endpointit
   - `app/models/` — SQLAlchemy-mallit
3. **Build/test commands**:
   - `pip install -r requirements.txt`
   - `pytest tests/` (testit)
   - `alembic upgrade head` (tietokannan migroi)
4. **Risk areas**:
   - `app/models/user.py` — käsittelee salasanoja ilman hashingia ✅
   - `app/db.py` — kiova kirjoitus SQL-stringeihin ❌
5. **Proposed changes**:
   - Lisää password hashing bcrypt-kirjastoon
   - Vaihda raaka SQL SQLAlchemy:n käyttöön
   - Lisää unit-testit `models/`-kansiolle
```

!!! success "Miksi tämä on tärkeä?"
    Tämä on **vaihe 1** jokaisessa Claude Code -projektissa. Se säästää aikaa ja estää
    virheiten tekemistä koodin muokkaamista ennen kuin ymmärrät kontekstin.

---

*Lähde: Esimerkki 01 [S1]*
