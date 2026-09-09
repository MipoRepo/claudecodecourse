# Harjoitus 18: Bugi-fix-session

!!! quote "Tavoite"
    Luoda **nimetty sessio** (esim. `memory-leak-fix`) ja keskittyä **yksinomaan siihen ongelmaan**.

## Taustaa

Kun sinulla on useampia rinnallisia tehtävää:

❌ Vaiksuttamat voivat aiheuttaa keskustelun menetyksen  
✅ Nimeämällä session voit helposti palata siihen myöhemmin

Tämä on erityisen hyödyllinen **bugi-jen selvämisessä**, kun sinun täytyy siirtyä
toiseen projektiin kesken välin.

## Tehtävä

1. **Aja uusi sessio** nimellä `memory-leak-fix`:
   ```bash
   claude --name memory-leak-fix
   ```
2. **Esittele ongelma:**
   > "Meillä on muistivuoto (memory leak). Prosessin muisti kasvaa ~50 MB/minuutissa.
   > Tässä on profile-data..."

3. **Palaa myöhemmin** samoin nimisellisessä sessiossa:
   ```bash
   claude -r memory-leak-fix
   ```

## Ratkaisu

### Sessioiden nimeäminen

```bash
# Uusi sessio
claude --name memory-leak-fix

# Tai lyhyenä muotona
claude -n memory-leak-fix
```

### Myöhemmän paluu

```bash
claude -r memory-leak-fix
# tai
claude --resume memory-leak-fix
```

### Miksi tämä toimii hyvin?

| Toiminto | Hyöty |
|----------|-------|
| `--name` | Helppo löytää myöhemmin |
| Yksittäinen fokus | Vähentää keskustelun sekaannuksia |
| JSONL-tallennus | Sessio säilyvät täydessä detaljissa |

### Sessioiden sijainti

```bash
~/.claude/projects/<project_name>/<session_id>.jsonl
```

Sessiot sisältävät:

- Kaikki viestit
- Kaikki työkalukutsut ja niiden tulokset
- Kaikki tiedostot (tai viitaukset niihin)

!!! tip
    Sinun täytyy **välittää sessioitsesi** — keskustelut tallentuvat vain projekti-hakemistoon.
    Jos poistat kansion, kaikki sessiosi menetetään.

---

*Lähde: Esimerkki 18 [S1], [S5]*
