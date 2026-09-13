# Teknologian perusteet: Edistuneelle

!!! info "Kenelle tämä osio on kirjoitettu?"
    Sinulle, joka hallitset komentorivin ja haluat ymmärtää Claude Coden
    **sisäiset mekanismit**: context‑ikkunan, permission engine ‑kerrokset,
    hookit, sub‑agentit ja MCP‑integraatiot.

---

## 1. Agentti, kääntäjä ja CLI‑työkalu — mikä ero?

Perinteinen CLI‑työkalu (kuten `git`) toimii **deterministisesti**:
yksi komento → yksi tarkasti määritelty toiminto.

Claude Code on **LLM‑agentti**, joka toimii todennäköisyyspohjaisesti:

- se päättää itse, mitä työkaluja käyttää
- se yhdistää tietoa kontekstista
- se voi iteroida ja korjata omaa työtään
- se voi delegoida tehtäviä sub‑agenteille

Tämä tuo valtavan joustavuuden — mutta myös sen, että
**turvallisuus ja oikeusrajaukset ovat kriittisiä**.

---

## 2. Claude Code ‑agenttiarkkitehtuuri

Claude Code koostuu viidestä keskeisestä mekanismista:

1. **Context** — mitä agentti “näkee”
2. **Permission Engine** — mitä agentti “saa tehdä”
3. **Hooks** — deterministiset tarkistukset
4. **Sub‑agentit** — eristetyt roolit ja kontekstit
5. **MCP** — ulkoiset tiedot ja työkalut

Alla selkeä erittely.

---

## 3. Context — agentin “näköaisti”

Claude Coden konteksti muodostuu kolmesta osasta:

### **CLAUDE.md**
Pysyvä projektikohtainen konteksti:
- säännöt
- työtavat
- rajoitukset
- projektin periaatteet

### **Transcript**
Nykyisen istunnon keskusteluhistoria.

### **Työkalujen tulokset**
Kaikki Read/Grep/Glob/Edit/Bash/MCP‑tulokset lisätään kontekstiin.

### **Context‑ikkunan rajoitus**
Konteksti on rajallinen (200k–1M tokenia).  
Kun se täyttyy:

- Claude käynnistää **compact**‑tiivistyksen  
- tai jakaa istunnon uusiin osiin

---

## 4. Permission Engine — mitä agentti saa tehdä?

Permission Engine arvioi jokaisen toiminnon kerroksittain:

| Taso | Kuvaus | Käyttö |
|------|--------|--------|
| **plan** | Vain luku | Alkuanalyysi |
| **default** | Kysyy luvan kirjoituksille | Normaalikehitys |
| **acceptEdits** | Hyväksyy kirjoitukset automaattisesti | Nopeampi työ |
| **bypassPermissions** | Kaikki sallittu | CI/testiympäristö |

### Arviointijärjestys:
**deny → ask → allow**

- **deny** pysäyttää toiminnon heti  
- **ask** vaatii käyttäjän vahvistuksen  
- **allow** suorittaa toiminnon

---

## 5. Hooks — deterministinen päätöksenteko

Hookit ovat shell‑komentoja, jotka suoritetaan tiettyjen tapahtumien yhteydessä.

Esimerkki: `PreToolUse` ennen työkalun käyttöä.

Hook voi:

- estää vaarallisen komennon
- lisätä auditointilokeja
- käynnistää CI‑jobeja
- muokata pyyntöä ennen permission‑engineä

### Esimerkki:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "./.claude/hooks/lint-before-bash.sh"
          }
        ]
      }
    ]
  }
}

## 6. Sub‑agentit — eristetyt kontekstit ja roolit

Sub‑agentti on Claude Coden sisäinen “työntekijä”, joka toimii omassa eristetyssä ympäristössään.  
Jokainen sub‑agentti saa:

- **oman context‑ikkunan**  
- **oman system‑promptin**  
- **oman työkalupinnan** (vain ne työkalut, jotka sille annetaan)  
- **halutessaan oman mallin** (haiku, sonnet, opus)

### Turvallisuusperiaate

> Sub‑agentille annetaan **vain ne oikeudet, joita se tarvitsee**.  
> Ei koskaan “varmuuden vuoksi” laajoja oikeuksia.

Tämä estää tilanteet, joissa sub‑agentti voisi vahingossa muokata projektia tai ajaa komentoja, joita sen ei pitäisi.

---

## 7. MCP — ulkoisen tiedon integrointi

**Model Context Protocol (MCP)** on standardi, jonka avulla Claude Code voi käyttää ulkoisia resursseja hallitusti.

MCP mahdollistaa:

- **resurssien lukemisen** (tietokannat, API:t, tiedostot, ulkoiset palvelut)  
- **promptien suorittamisen** (esim. “anna vastine tähän kysymykseen”)  
- **työkalujen kutsumisen** (esim. “luo uusi GitHub PR”)

### Turvaperiaatteet

- **Least privilege** — anna vain pienin tarvittava oikeus  
- **Ihmisen hyväksyntä** korkean vaikutuksen toimille  
- **Staging/production‑ympäristöjen erottelu**  
  (agentti ei saa koskea tuotantoon ilman erillistä lupaa)

---

## 8. Miksi tämä on tärkeää?

Kun ymmärrät nämä mekanismit, voit rakentaa **hallittuja ja turvallisia agenttijärjestelmiä**, joissa Claude toimii kuin tiimin jäsen — mutta kontrolloidusti.

| Tehty        | Mahdollistaja | Lopputulos |
|--------------|---------------|------------|
| **CLAUDE.md** | Context       | Projekti “muistaa” säännöt automaattisesti |
| **Hooks**     | Determinismi  | Commitit formatoidaan automaattisesti |
| **Sub‑agentit** | Eristys     | Turvallinen koodin tarkastus ilman pääsession lupaa |
| **MCP**       | Ulkoiset tiedot | Jira/GitHub‑data ilman copy‑pastea |
| **Worktrees** | Erillisyys    | Kaksi rinnakkaista kehityslinjaa ilman konflikteja |

---

## Seuraavaksi

- **Luku 1: Johdanto Claude Codeen** — tarkempi terminologia  
  → [../johdanto/mita-on-claude-code.md](../johdanto/mita-on-claude-code.md)
- **Harjoitus 04: Headless‑agentin työkalujen rajoittaminen** — käytännön `--tools`‑rajausharjoitus  
  → [../harjoitukset/04-headless-agentin-tyokalurajaus.md](../harjoitukset/04-headless-agentin-tyokalurajaus.md)

