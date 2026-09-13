#Opas  Claude Code kehitykseen

Tämä dokumentaatio on laaja oppaasti sekä aloittelijalle että edistuneelle kehittäjälle, joka haluaa oppia Claude Codea käyttämään täysimääräisestä agenttikehittelyympäristöstä. Opas kattaa kontekstinhallinnan, erikoagentit, säännökset, hookit, MCP-työkalut ja headless-automatisoinnin.

**Julkinen sivusto:** [miporepo.github.io/claude-code-opas](https://miporepo.github.io/claudecodecourse)

---

## Sisällysluettelo

| Osa | Kuvaus |
|-----|--------|
| **Etusivu** | Johdanto ja pika-aloitus |
| **Johdanto** | Teknologian perusteet (aloittelijalle & edistuneelle), OpenRouter-integraatio, LLM-mallin valinta |
| **Kurssi** | Arkkitehtuuri, sub-agentit, skills, hooks, MCP, worktrees, turvallisuus, parhaat käytännöt |
| **Harjoitukset** | 35 itsenäistä harjoitusta ratkaisuineen |
| **Liitteet** | Komennot, projektirakenne, lähteet ja esimerkit |

---

## Projektin rakenne

```
claude-code-opas/
├── docs/                 # Lähdemarksdown-tiedostot
│   ├── index.md          # Etusivu
│   ├── johdanto/         # Teknologian perusteet & johdanto
│   ├── arkkitehtuuri/    # Arkkitehtuuri ja periaatteet
│   ├── harjoitukset/     # 35 harjoitusta
│   ├── liitteet/         # Liitteet A–D
│   ├── css/extra.css     # Sivuston tyylien lisäykset
│   └── js/extra.js       # Navigaation lisäystavuus
├── .github/workflows/    # GitHub Actions CI/CD
├── mkdocs.yml            # MkDocs Material -konfiguraatio
├── requirements.txt      # Python-riippuvuudet
├── paivitys.md           # Päivitysraportti
└── README.md             # Tämä tiedosto
```

---

## Hyödylliset komennot

| Komento | Selitys |
|---------|---------|
| `mkdocs serve` | Käynnistä paikallinen kehityspalvelin |
| `mkdocs build` | Rakenna staattiset sivut `site/`-hakemistoon |
| `mkdocs gh-deploy` | Rakenna ja deployaa GitHub Pagesiin |
| `.venv\Scripts\mkdocs serve` | Käytä venv-versiota |

---

## Lisenssi

**MIT License** © 2026 Claude Code - Opas — katso [LICENSE](LICENSE).

---

*© 2026 Claude Code - Pieni Käytäntöopas. Kaikki oikeudet pidätetään. Teksti on laati Mikko Pohjola.*
