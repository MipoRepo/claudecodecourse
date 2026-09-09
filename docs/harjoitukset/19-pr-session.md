# Harjoitus 19: PR-sessio

!!! quote "Tavoite"
    Aja oma **PR-liittyvä sessio** käyttäen `--from-pr`-komentoa, jolloin Claude voi
    tarkastella muutoksia ja antaa palautetta.

## Taustaa

Kun joku lähettää **Pull Requestin** (PR), haluat usein:

✅ Tietää tarkalleen mitä muuttuu  
✅ Antaa rakentavan palautteen  
✅ Ehdottaa testejä tai parannuksia  

`--from-pr`-komento luo **omalevatuiman sessio**, joka on sidottu juuri tähän PRiin.

## Tehtävä

Olet saanut PR:n, joka lisää uuden autentikointimahdollisuuden. Haluat arvioida sen ennen mergeä.

1. **Avaa sessio PR:stä:**
   ```bash
   claude --from-pr 123
   ```

2. **Kysy:**
   > "Analysoi tämä PR. Tee lista: (1) muutetuista tiedostoista, (2) mahdollisista turvallisuusriskeistä, (3) puutuvista testeistä."

---

## Ratkaisu

### PR-sessio käynnistäminen

```bash
claude --from-pr 123
# tai täysinä URL-osoitteena:
claude --from-pr https://github.com/user/repo/pull/123
```

### Analyysi

Kysyttyä jälkeen Claude vastaa:

```markdown
## PR #123 Analyysi

### 1. Muutetut tiedostot
- `src/auth/auth.service.ts` (+80 -12) — uusi JWT-aikaraja
- `src/config/jwt.ts` (+15 -0) — uusi konfiguraatio
- `tests/auth/auth.test.js` (+45 -0) — uudet testit

### 2. Turvallisuusriskit
- ⚠️  `JWT_SECRET` on kovakoodattu `src/config/jwt.ts:10`
- ⚠️  Ei `maxAge` validointia tokenissa

### 3. Puuttuvat testit
- ❌ Ei testia vanhalle Refresh-jennettä
- ❌ Ei testia expired-token-odotukselle
```

### Miksi tämä toimii hyvin?

| Ominaisuus | Hyöty |
|-----------|-------|
| Sessio on sidottu PR:n | Kaikki konteksti on juuri siellä |
| Read-access alkuperäiseen koodiin | Voisit tarkistaa myös diffin taaksepäin |
| Tuki säilytetään erikseen | Ei sekoitu muiden sessioiden kanssa |

!!! tip
    `--from-pr`-komento tukee myös **GitHub-CLI:n** (`gh`) -toimintoja, joten sinun
    ei tarvitse erikseen kirjautua sisään.

---

*Lähde: Esimerkki 19 [S1], [S5]*
