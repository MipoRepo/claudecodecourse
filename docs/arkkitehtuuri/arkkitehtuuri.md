# 1. Arkkitehtuuri ja toimintaperiaatteet

## 1.1 Kerrosmalli (Layer model)

```
PROJECT REPO
│
├── CLAUDE.md               # jatkuva projektikonteksti
├── .claude/
│   ├── agents/             # custom subagents
│   ├── skills/             # Skills / uudelleenkäytettävät työprosessit
│   ├── hooks/              # komentoskriptit
│   ├── settings.json       # projektin asetukset
│   └── settings.local.json # paikallinen konekohtainen asetus
├── .mcp.json               # projektin MCP-palvelut
└── src/ ...

Claude Code runtime
│
├── session/context
├── permission engine
├── agent loop
├── tool execution
└── external integrations (MCP)
```

### Projektin komponentit selitetynä:

| Komponentti | Tarkoitus | Käsittelytaso |
|------------|-----------|---------------|
| `CLAUDE.md` | Pysyvä teksti kontekstiksi | Projekti- tai tiimitason |
| `agents/` | Custom sub-agentit | Eriytetty rooli ja konteksti |
| `skills/` | Uudelleenkäytettävät työprosessit | Toistettava workflow |
| `hooks/` | Automatisoitu reagointi | Deterministinen |
| `settings.json` | Projektin permission-asetukset | Globaali |
| `.mcp.json` | MCP-palveluiden konfiguraatio | Projektikohtainen |

!!! info "settings.local.json"
    `settings.local.json` on **konekohtainen** asetus, joka pysyy paikallisella koneella.
    Se käytetään usein salaisten ympäristömuuttujien (esim. API-avaimien) säilyttämiseen,
    eikä sitä tulisi koskaan commitata versionhallintaan.

## 1.2 Konteksti vs. toimet (Action)

| Mekanismi | Päätehtävä | Milloin käytetään? | Mitä se ei ole? |
|-----------|------------|---------------------|----------------|
| CLAUDE.md | Pysyvä projekti- tai tiimikonteksti | Projekti- tai tiimikohtaiset säännöt, arkkitehtuuri, build/test-ohjeet | Ei ole hyvä paikka pitkille työprosesseille |
| Skill | Toistettavat työprosessit | Build, testi, deploy | Ei korvaa CLAUDE.md:tä |
| Subagent | Erikoistunut agentti omalla kontekstilla | Review, debug, tutkimus, auditointi | Ei ole yksinään turvamekanismi |
| Hook | Deterministinen tapahtumankäsittely | Automaattiset laatu- ja turvallisuustarkistukset | Ei korvaa versionhallintaa |
| MCP | Pääsy ulkoiseen työkaluun/dataan | GitHub, Jira, Notion, monitoring, meeting notes | Ei ole automaattisesti turvallinen |

## 1.3 Permission engine (Lupa-moottori)

Claudessa on **kerrosmallinen** lupajärjestelmä:

1. `Hook?` — Estä (STOP)
2. `Deny rule?` — Jos kyllä, STOP
3. `Permission mode` — tarkista
4. `Allow rule?` — Jos kyllä, EXECUTE

```
Tool call
  │
  ├─ Hook?  →  Estä?  →  STOP
  │
  ├─ Deny rule?  →  Kyllä?  →  STOP
  │
  ├─ Permission mode  →  tarkista
  │
  └─ Allow rule?  →  Kyllä?  →  EXECUTE
```

### Permission moodit

| Moodi | Kuvaus |
|-------|--------|
| `default` | Kysyy jokaisesta toiminnosta |
| `acceptEdits` | Hyväksyy tiedostomuutokset automaattisesti |
| `dontAsk` | Ei kysy mitään |
| `plan` | Rajoittuu vain read-only -työkaluihin |
| `bypassPermissions` | Kaikki sallittu ilman kyselyä |

## Esimerkki 03: Read-only analyysi

**Plan-moodi** sopii ensimmäiseen arkkitehtuurikierrokseen, kun haluat nähdä
muutossuunnitelman ennen kuin tiedostoja kosketaan.

```bash
claude --permission-mode plan
```

## Esimerkki 04: Rajaa headless-agentin työkalut

Headless-ajossa voit antaa tarkat työkalut, joita agentti saa käyttää:

```bash
claude -p "Analysoi build-loki" --tools "Read"
```

!!! tip "ADVANCED-VINKKI 01"
    Pidä `CLAUDE.md` lyhyenä ja siirrä pitkät työprosessit **Skillsiin**.
    Nykyisen dokumentaation mukaan CLAUDE.md tulisi pitää alle 200 rivissä,
    koska Skills ladataan tarvittaessa.

!!! warning "VAROITUS 02"
    Älä lisää repoon salaisuuksia sisältäviä paikallisia asetuksia vain siksi,
    että Claude tarvitsee ne. Käytä **ympäristömuuttujia**, **salaisuudenhallintaa** tai
    **turvallista paikallista konfiguraatiota**.

---

## Seuraavaksi

- [Luku 3: Custom Sub-Agents](../sub-agents/index.md)
- [Harjoitus 01: Ensimmäinen read-only työ](../harjoitukset/01-read-only-tyo.md)

---

*Lähde: [S2] Features Overview, [S10] Permissions*

