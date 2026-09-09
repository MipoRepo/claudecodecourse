# Harjoitus 31: Review gate -sub-agentti

!!! quote "Tavoite"
    Käyttää **reviewer-subagenttia ennen mergeä**, ja pitää pääagentin konteksti
    **vapaana pelkästä yhteenvedosta**.

## Taustaa

Rinnakaistaminen tarkoittaa:

✅ Reviewer tarkastelee koodin täysin erillään  
✅ Pääagentti saa vain **yhteenvedon**  
✅ Tämä **säästää kontekstia**  

## Tehtävä

Määritä järjestys review-prosessille:

1. Pääagentti pyytää reviewer-agenttia tarkistamaan muutokset
2. Reviewer palauttaa tiivistelmän (Critical/High/Medium/Low)
3. Pääagentti päättää jatkamisesta

## Ratkaisu

### Review-processi

#### Vaihe 1: Pääagentti delegoi

```bash
claude "Käytä reviewer-agenttia tarkistamaan tämä diff:
- src/api/auth.js
- src/utils/validate.js
Keskity turvallisuuteen, testeihin ja ylläpidettävyyteen."
```

#### Vaihe 2: Claude kutsuu sub-agentin

```
Agent(reviewer, "Tarkista src/api/auth.js ja src/utils/validate.js...")
```

#### Vaihe 3: Reviewer palauttaa yhteenveton

```
## Review Report

🔴 Critical:
- src/api/auth.js:42 — SQL-injection risk ('SELECT * FROM users WHERE id=' + userId)
  → Korjausehdotus: Käytä parameterized query

🟡 Medium:
- src/utils/validate.js:15 — Ei validointia expiry-päivälleen
  → Lisää expiry-ajan tarkistus

🟢 Low:
- Ei JSDoc-kommentteja — lisäile ehdotetusti
```

#### Vaihe 4: Pääagentti päättää

```bash
# Pääagentti saa vain yhteenvedon
# → "Korjaa ensin SQL-injectionin, sitten voimme mergeä"
```

### Miksi tämä toimii hyvin?

| Elementti | Hyöty |
|----------|-------|
| Review-erillisyys | Ei liiallista kontekstia tarkastuksiin |
| Reviewer-rajoitus | Vain lukuoikeudet |
| Yhteenveto | Tiivis — ei tarpeeseen lukea koko logia |

!!! tip
    Tämä on erityisen tehokasta, kun reviewi kestää kauan — pääagentti voi tehdä
    muita työtä samaan aikaan kun reviewer tarkastelee.

---

*Lähde: Esimerkki 31 [S1]*
