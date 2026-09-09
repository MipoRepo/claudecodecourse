# Teknologian perusteet: Edistuneelle

!!! info "Kenelle tämä osio on kirjoitettu?"
    Sinä tiedät paremmin terminaalista ja CLI:stä, ja haluat ymmärtää
    Claude Code -agentin sisäisten mekanismien — context, permission engine, hookit ja sub-agentit.

## Agentti vs. kääntäjä vs. CLI-työkalu

Klassinen CLI-työkalu (esim. `git`) on **tila- tai komentopohjäinen**: yksi komento = yksi selkeästi määritelty toiminto. Agenttimallinen työkalu (kuten Claude Code) on **todennäköisyysperusteinen päätöksentekojärjestelmä** (LLM-agentti), jossa kielimalli päättää, mitä toimia tehdä.

### Miksi tämä on tärkeä?

- Kielimalli pystyy **yhdistelemään toisiinsa liittyviä tietoja** (context)
- Se voi **iteroida** — kokeilla, tarkistaa, korjata
- Se voi **delegoida** osan työstä sub-agenteille

Mutta tämä tarkoittaa myös:

- Päätökset ovat **epävarmoja** (todennäköisyysjakauma)
- Työkalu- ja oikeusrajaukset ovat **elintärkeitä** turvallisuuden kannalta

## Claude Code -agenttiarkkitehtuuri

### Konteksti (context)

- **CLAUDE.md**: pysyvä projekti- tai käyttäjätason konteksti
- **Keskusteluloki (transcript)**: nykyisen istunnon keskusteluhistoria
- **Työkalujen tulokset**: jokainen Read/Grep/Bash/Bash-tulos lisätään kontekstiin

Tärkeä rajoitus: **context-ikkuna** on rajoitetun kokoinen — tyypillisesti 200k–1M tokenia. Kun se täyttyy, käynnistyy **compact** (tiivistys) tai istunto jaetaan uusiin osiin.

### Permission engine

Clauden käyttö oikeuksissa on **kerrostettu** järjestelmä:

| Taso | Kuvaus | Käytännössä |
|------|--------|-------------|
| `plan` | Vain luku — ei kirjoita | Alkuanalyysi / turvallinen tarkastus |
| `default` | Kysyy joka kirjoitustoimenpiteessä | Tyypillinen kehitystyö |
| `acceptEdits` | Hyväksyy tiedostomuutokset automaattisesti | Nopeampi kirjoittelu |
| `bypassPermissions` | Kaikki sallittu ilman kyselyä | Vain CI/testiympäristöön |

**Säännökset arvioidaan tässä järjestyksessä:** `deny` → `ask` → `allow`

### Hooks — deterministinen päätöksenteko

Hookit ovat **shell-komentoja**, jotka suoritetaan tiettyä agentin elinkaaren tapahtumaa vastaen. Ne toimivat **ennen** permission-enginein arviointia (esim. PreToolUse), joka voi:

- Estää toiminnon kokonaan (esim. estää vaarallisen komennon)
- Lisätä auditointilokeja
- Laukaista CI-jobeja

Esimerkki:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "./.claude/hooks/lint-before-bash.sh"
      }]
    }]
  }
}
```

### Sub-agentit — eristettyjen kontekstien orkesterointi

Sub-agentti saa:
- Oman konteksti-ikkunansa
- Oman system promptinsa
- Rajoitetun työkalupinnansa
- Halutessaan oman mallinsa (`haiku`, `sonnet`, `opus`)

Tärkein turvallisuusperiaate: **sub-agenttia ei koskaan anneta laajoja oikeuksia "koska joku saattaa tulla tarvitsemaan"** — oikeuksia tulee antaa vain nimenomaiset tarvittavat.

### MCP — ulkoisen tiedon integrointi

Model Context Protocol mahdollistaa Clauden:

- **Resurssien** lukemisen (tietokannat, tiedostot, API:t)
- **Promptien** käyttämisen (esim. "anna vastine tähän kysymykseen")
- **Työkalujen** kutsumisen (esim. "luo uusi GitHub PR")

Turva vaatii:
- Pienimmän tarvittavan oikeuden periaatetta (least privilege)
- Ihmisen hyväksyntää korkean vaikutuksen toimille
- Tuotanto- ja staging-ympäristöjen erottelua

---

## Miksi tämä on tärkeä aloitettavaksi?

Kun opit näitä periaatteita, voit:

| Tehty | Mahdollistaja | Lopputulos |
|-------|---------------|------------|
| CLAUDE.md | Context | Projekti “muistaa” säännöt automaattisesti |
| Hooks | Determinismi | Kaikki commitit automaattisesti formatoidaan |
| Sub-agentit | Eristys | Turvallinen koodin tarkastus ilman pääsession lupaa |
| MCP | Ulkoiset tiedot | Tiedot Jirasta/GitHubista/seurantajärjestelmistä ilman kopioimista chatiin |
| Worktrees | Erillisyys | Kaksi rinnakkaista kehityslinjaa ilman konflikteja |

---

## Seuraavaksi

- [Luku 1: Johdanto Claude Codeen](../johdanto/mita-on-claude-code.md) — tarkempi terminologia
- [Harjoitus 04: Headless-agentin työkalujen rajoittaminen](../harjoitukset/04-headless-työkalut.md) — harjoita `--tools`-rajausta
