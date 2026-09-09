# Harjoitus 05: Reviewer-agentti

!!! quote "Tavoite"
    Luoda oma **reviewer-sub-agentti**, joka tarkastelee koodia **ilman kirjoitusoikeuksia**.

## Taustaa

Sub-agentti saa oman konteksti-ikkunansa, oman prompttinsa ja **rajoitetut työkalunsa**.
Tämä on tärkeää, koska:

- Reviewer ei saa muuttaa tiedostoja
- Hän näkee vain muutokset (diffs) ja tiedostot (Read, Grep, Glob)
- Tämä vähentää sivuvaikutusten riskiä

## Tehtävä

Luo tiedosto `.claude/agents/reviewer.md` – seuraavilla vaatimuksilla:

✅ Saa työkalut: `Read, Grep, Glob`  
✅ Ei saa työkaluja: `Write, Edit, Bash`  
✅ Permission moodi: `plan`  
✅ Käytä mallia `sonnet` (tai `inherit`)

Kirjoita myös system prompt, joka:
- Kieltää kaikki tiedostojen muokkaukset
- Vaatii löydettyjä virheitä eroteltavaksi vahvistettuihin ja arviostettaviin
- vaatii tiedostopohjaiset viitteet (file:line)

## Ratkaisu

### Tiedosto: `.claude/agents/reviewer.md`

```yaml
---
name: reviewer
description: Review changed code for correctness, security and maintainability.
tools: Read, Grep, Glob
model: sonnet
permissionMode: plan
---

You are a strict code reviewer.

Rules:
- Do not edit files.
- Inspect tests and error paths.
- Separate confirmed defects from hypotheses.
- Return findings with severity and file:line references.
```

### Miten sitä käytetään?

```bash
# Pääagentti delegoi:
claude "Käytä reviewer-agenttia tarkastamaan muutokset"
```

Claude pystyy kutsumaan:

```
Agent(reviewer, "Review the current diff in src/api/")
```

### Miksi tämä toimii turvallisesti?

| Asetus | Turvallisuusvaikutus |
|--------|---------------------|
| `tools: Read, Grep, Glob` | Estää kaikki kirjoitusoperaatiot |
| `permissionMode: plan` | Estää Bash:n ja Editin |
| `model: sonnet` | Käytetään tarkempaamallia tarkastukseen |
| `description` | Auttaa päättelemään milloin tätä tullaan käyttöön |

!!! warning "VAROITUS 03"
    Älä anna reviewer-agentille Write/Edit-oikeuksia "vain siksi, että ehkä niitä tarvitaan".
    Minimaalinen työkalupinta vähentää vahingoitumisriskiä.

!!! tip "ADVANCED-VINKKI 02"
    Pidä agentin `description` lyhyenä ja semanttisesti osuvana — se näkyy mallin päätöksenteossa.

---

*Lähde: Esimerkki 05 [S1], [S3]*
