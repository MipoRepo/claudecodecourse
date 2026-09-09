# MkDocs Material -verkkosivu Claude Code -oppaasta

## Konteksti

Käyttäjä on projektipäällikkö, arkkitehti ja kouluttaja, joka työskentelee Claude Code -kurssin parissa. Hän on saanut PDF-materiaalin (*Claude Code - Täydellinen käytäntö opas*, 27 sivua, suomeksi) jonka sisällöstä on lajadeltava MkDocs Material -verkkosivu paikallista/offline-käyttöä varten. PDF sisältää 13 päälukua, 4 liitettä, joista Liite D:ssä on 35 käytännönvälitystä (esim. 01–35) eri aiheissa (sub-agents, skills, hooks, MCP, worktrees, headless, checkpoints, turvallisuus).

Sivuston tavoitteena on toimia sekä aloittelijalle että edistyneelle käyttäjälle: alussa on tiivis *teknologian perusteet*-osuus, jonka jälkeen siirrytään syvempään aiheeseen. PDF:n käytännönvälitykset muutetaan itsenäisiksi harjoitustehtäviksi, joilla on omat ratkaisunsa. Navigointi sijoitetaan selaimen ylätoolbaarin (top navigation), ja ulkoasu viimeistellään lisä-CSS:llä.

## Rakenne ja tiedostot

### Projektin juurrakenteisuunnitelma

```
f:/00. AIDE/ClaudeCodekurssi/
├── mkdocs.yml              # MkDocs Material -konfiguraatio
├── docs/
│   ├── index.md            # Aloitussivu
│   ├── teknologian-perusteet/
│   │   ├── aloitus.md      # Teknologian perusteet aloittelijalle
│   │   └── edistyneelle.md # Teknologian perusteet edistyneemmälle
│   ├── johdanto/
│   │   ├── mitä-on-claude-code.md
│   │   ├── mielenmalli.md
│   │   └── permission-engine.md
│   ├── arkkitehtuuri/
│   │   ├── kernelayer-malli.md
│   │   └── konteksti-vs-toiminta.md
│   ├── sub-agents/
│   │   ├── index.md
│   │   ├── määritys.md
│   │   ├── hakemistorakenne.md
│   │   └── esimerkit/
│   │       ├── reviewer.md
│   │       ├── debugger.md
│   │       └── security-auditor.md
│   ├── skills/
│   │   ├── index.md
│   │   ├── rakenne.md
│   │   ├── frontmatter.md
│   │   ├── disable-model-invocation.md
│   │   └── esimerkit/
│   │       ├── manual-deploy.md
│   │       ├── argumentinvälitty.md
│   │       └── incident-triage.md
│   ├── hooks/
│   │   ├── index.md
│   │   ├── tapahtumat.md
│   │   ├── elinkaari.md
│   │   ├── pre-post-tooluse.md
│   │   └── esimerkit/
│   │       ├── formatointi.md
│   │       ├── vaaralliset-komennot.md
│   │       └── sessionstart-compact.md
│   ├── mcp/
│   │   ├── index.md
│   │   ├── asennus.md
│   │   ├── granola-esimerkki.md
│   │   └── esimerkit/
│   │       ├── issue-tracker.md
│   │       ├── observability.md
│   │       └── readonly-db.md
│   ├── parallel-sessions/
│   │   ├── index.md
│   │   ├── nimeäminen.md
│   │   └── haaroittaminen.md
│   ├── git-worktrees/
│   │   ├── index.md
│   │   ├── luominen.md
│   │   ├── worktreeinclude.md
│   │   └── esimerkit/
│   │       ├── bugfix-feature-parallel.md
│   │       ├── agentti-worktree.md
│   │       └── yhdistäminen.md
│   ├── headless-mode/
│   │   ├── index.md
│   │   ├── claude-p.md
│   │   ├── json-output.md
│   │   └── esimerkit/
│   │       ├── ci-triage.md
│   │       ├── read-only-pipeline.md
│   │       └── exit-code.md
│   ├── checkpoints/
│   │   ├── index.md
│   │   ├── rewind.md
│   │   └── esimerkit/
│   │       ├── rikkinäinen-build.md
│   │       ├── säilytä-keskustelu.md
│   │       └── palauta-vain-koodi.md
│   ├── parhaat-käytännit/
│   │   ├── 12-periaatetta.md
│   │   ├── kehityspolku.md
│   │   └── esimerkit/
│   │       ├── tdd.md
│   │       ├── definition-of-done.md
│   │       ├── review-gate.md
│   │       └── release-pipeline.md
│   ├── turvallisuus/
│   │   ├── index.md
│   │   ├── uhkamalli.md
│   ├── permission-strategia.md
│   │   └── esimerkit/
│   │       ├── production-deploy.md
│   │       ├── secrets-audit.md
│   │       └── prompt-injection.md
│   ├── yhteenveto.md
│   └── liitteet/
│       ├── liite-a-komennot.md     # Kaavioita / taulukoita
│       ├── liite-b-projektarakenne.md
│       ├── liite-c-lähteet.md
│       └── liite-d-esimerkit/
│           ├── index.md            # Kaikkien esimerkkien luettelo
│           ├── 01-read-only-tyo.md
│           ├── 02-kontekstin-seuranta.md
│           ├── ...                 # 03–35
│           └── 35-prompt-injection.md
├── extra/
│   └── css/
│       ├── extra.css               # Oma tyylit (toolbar navigointi yms.)
│   └── js/
│       └── extra.js                # Tarvittaessa pienet interaktiiviset efektit
└── assets/                          # Kuviot, kaaviot (generoituina)
    └── diagrams/
```

---

## Toteutussukave elimi

### Vaihe 1: Ympäristön valmistelu

1. Asenna Python 3.10+ (jos ei vielä asennettuna).
2. Asenna MkDocs ja MkDocs Material paikallisesti:
   ```bash
   pip install mkdocs-material
   ```
3. Luo projektin juurihakemistoon tiedostot `mkdocs.yml` ja `docs/index.md`.
4. Varmista, että sivusto renderöidään paikallisuudessa: `mkdocs serve`.

### Vaihe 2: Teknologian perusteet -osio (aloittelijalle + edistyneelle)

- Luo `docs/teknologian-perusteet/` -kansio.
- `aloitus.md`: Lyhyt selitys siitä, mikä on tekoälyavusteinen koodaustuki, mitä Claude Code pystyy tekemään (luku, kirjoitus, testaus, MCP, sub-agents) ja miksi se eroaa tavallisesta ChatGPT:stä. Käytä yksinkertaisia analogyita.
- `edistyneelle.md`: Syvempi katsaus agenttitekniikkaan: konteksti-ikkuna, permission-engine, hookit ja determinismi. Kohdistuskohde: kehittäjät, jotka hallitsevat CLAUDE.md- ja hook-konfiguraatiota.
- Listaatut verkko-ohjeet jaetaan näistä osioista.

### Vaihe 3: Pääsisältö – käännetään PDF:stä

Käännetään PDF:stä saatut tekstit osaksi `docs/` -kansiota. Jokainen PDF-luku saa oman markdown-tiedoston. Säilytetään kaikki koodiesimerkit, taulukot ja kaaviot.

**Huomioitavaa:**
- PDF:n termistö (esim. "custom subagents") päivitetään nykyiseen MkDocs-versioon mukaisesti.
- Liitteet A–D sijoitetaan `docs/liitteet/` -kansioon. Liitteessä D (35 esimerettiä) jokainen esimerkki saa oman sivun.

### Vaihe 4: Harjoitukset Liitteessä D – itsenäiset sivut ratkaisuilla

Jokainen Liitteessä D oleva esimerkki muutetaan harjoitustehtäväksi seuraavassa muodossa:

```markdown
## Tehtävä: [Esimerkin nimi]

**Tavoite:** Selitä lyhyesti, mitä on toteutettu ja miksi.

**Taustaa:** [Lyhyt kuvaus käytännöstä]

**Tehtävä:**
1. [Kuvaa mitä opiskelija tekee]
2. ...

**Vinkki (valinnainen):** [Vinkki aloittelijalle]

---

## Ratkaisu

[Täydellinen ratkaisu, esim. koodi, komento, selitys.]
```

Esimerkiksi esimerkki 05 "Reviewer-agentti":
- **Tehtävä:** Luo `.claude/agents/reviewer.md`-tiedosto, joka rajottaa työkalut `Read, Grep, Glob` ja asettaa `permissionMode: plan`. Selitä miksi tämä on turvallinen.
- **Ratkaisu:** [Näytä täydellinen YAML-frontmatter + prompt]

Kaikista 35 esimerkistä luodaan näin oma sivu.

### Vaihe 5: Navigointi – ylätoolbarin konfigurointi

Käytetään MkDocs Materialin `navigation.tabs`-ominaisuutta yläpalkin navigointiin.

**`mkdocs.yml`-konfiguraatio:**

```yaml
site_name: Claude Code - Opas
site_url: https://localhost/claude-code-opas/
docs_dir: docs
extra_css:
  - css/extra.css
theme:
  name: material
  icon:
    repo: fontawesome/brands/github
  features:
    - navigation.tabs
    - navigation.tabs.sticky
    - navigation.top
    - navigation.sections
    - search.highlight
    - content.code.annotate
    - content.code.copy
    - content.tooltips
nav:
  - Teknologian perusteet:
      - Aloittelijalle: teknologian-perusteet/aloitus.md
      - Edistuneelle: teknologian-perusteet/edistyneelle.md
  - Johdanto: johdanto/mitä-on-claude-code.md
  - Arkkitehtuuri: arkkitehtuuri/kerrosmalli.md
  - Sub-agents: sub-agents/index.md
  - Skills: skills/index.md
  - Hooks: hooks/index.md
  - MCP: mcp/index.md
  - ...
  - Liitteet:
      - Liite A: liitteet/liite-a-komennot.md
      - Liite B: liitteet/liite-b-projektarakenne.md
      - Liite C: liitteet/liite-c-lähteet.md
      - Liite D - esimerkit: liitteet/liite-d-esimerkit/index.md
```

**Lisä-CSS (`extra/css/extra.css`):**

```css
.md-header__list {
    /* Keskelle asettaminen */
    justify-content: center;
}

.md-header__button,
.md-header__link {
    /* Leveämmät painikkeet */
    padding: var(--md-nav-item-size) var(--md-nav-link-distance, 1rem);
}

.md-nav--primary {
    /* Mahdollisesti piilotetaan sivupalkki mobiilissa */
    display: none;
}

.md-main__inner {
    max-width: 1200px;
    margin: 0 auto;
}
```

### Vaihe 6: Offline-käytön varmistus

- Varmista, että kaikki kuviot ja koodiesimerkit on upotettu paikallisiin tiedostoihin.
- Älä käytä ulkopuolisia CDN:itä. MkDocs Material paketissa on kaikki tarvittu kirjasto.

```yaml
extra:
  static_templates:
    - 404.html
    - offline.html
```

### Vaihe 7: Testaus ja hio-minen paikallisesti

1. Aja `mkdocs serve` paikallisessa kansiossa.
2. Tarkista, että navigointiöyteet näkyvät oikein ylävalikosta.
3. Tarkista, että kaikki sivut renderöityvät tällä kirjoilla.
4. Varmista että "Ratkaisu"-osiot ovat helposti löydettävissä.

### Vaihe 8: Lisäominaisuudet (myöhemmin)

- Mahdollinen hakukenttä (`search`).
- Mahdollista kieliversiot (FI / EN).
- Mahdollista export PDF:ksi (print CSS).

---

## Tärkeitä huomioitavia seikkoja

1. **PDF-tekstin laatu:** `pdftotext -layout` antaa muodollisen ulkoaseman, mutta joissakin taulukoissa voi olla whitespace-ongelmia. Nämä korjataan manuaalisesti markdownissa.

2. **Kaaviot:** PDF:ssä on ASCII-mallit kerrosmallista, permission-engine -päätöksenteosta jne. Nämä muutetaan SVG-kuviksi tai merkitään selvästi markdownissa.

3. **Liite D esimerkit:** PDF:n Liite D:stä löytyy 35 esimerkkiä, jotka eivät ole vielä täysin eritelty PDF:ssä (ne ovat mainittu listassa). Kullakin numerolla on kuvattu aihe — nämä on itseään kirjoitettu osaksi vastaavaa päälukua.

4. **Käännösruuduklit:** PDF:ssä on taulukoita termistämisistä (esim. 1.2). Nämä säilytetään taulukkiona.

5. **Navigointi:** `navigation.tabs` + `navigation.tabs.sticky` tuottaa kiinnitetyt valikoiman ylälaidassa, joka toimii hyvänä paikallisena navigointipiirtimenä. `extra.css`-tiedoston avulla voi tarkentaa ulkoasuusta.

## Aikataulu (arvioitu)

| Vaihe | Kuvaus | Kesto |
|-------|--------|-------|
| 1 | Ympäristön valmistelu | 10 min |
| 2 | Teknologian perusteet -osio | 2 h |
| 3 | Pääsisältö (kaikki 13 lukua) | 8–10 h |
| 4 | Liitteet A–D + 35 harjoitusta ratkaisuilla | 6–8 h |
| 5 | Navigointi + CSS | 1 h |
| 6 | Offline-testaus + hio-minen | 2 h |
| **Yhteensä** | | **19–23 h** |

---

## Toteutus

- Kaikki dokumentat kirjoletaan suomeksi ja säilytetään PDF:n termistö sekä terminologia (esim. "sub-agentti", "skill", "hook", "MCP").
- Harjoitusten ratkaisut pohjataan PDF:stä ja nykyisestä MkDocs Materialin dokumentaatiosta.
- Navigointi sijoitetaan aina selaimen yläpalkkiin (ei sivupalkkia mobiiliin).
- Ulkoasu viimeistellään lisä-CSS:llä: keskeltä kohdistettu logo, kiinnitetty tykkä navigointi, selkeä typografia.
