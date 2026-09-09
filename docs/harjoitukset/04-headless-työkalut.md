# Harjoitus 04: Rajaa headless-agentin työkalut

!!! quote "Tavoite"
    Oppia rajoittamaan headless-Clauden käyttämät työkalut tarkasti `--tools` -lippuin avulla.

## Taustaa

Headless mode = `claude -p` (print/non-interactive). Tässä moodissa:

- Ei ole interaktiivista käyttöliittymää
- Käytetään skripteissä ja CI:ssä
- Työkalut rajoitetaan `--tools` tai `--allowedTools` -lipun avulla

### Kaksi erilaista rajoitusta:

| Flagi | Selitys |
|-------|--------|
| `--allowedTools` | "Ennen kyllin rajoitus" — pre-approval |
| `--tools` | "Rajoita käytettävät työkalut" |

!!! tip "Tärkeä ero"
    `--allowedTools` on tarkistus: "saaanko käyttää tätä työkalua?"
    `--tools` on rajoite: "mitkä työkalut ovat yleensä käytettävissä?"

## Tehtävä

Kokeile seuraavia komentoa:

1. **Ilman rajoituksia:**
   ```bash
   claude -p "Lue package.json tiedoston." --tools "Read,Grep"
   ```
2. **Kokeile Bash-käyttöä (tulisi estää):**
   ```bash
   claude -p "Aja npm test komennon." --tools "Read"
   ```
3. **Kokeile `--bare`-tilaa:**
   ```bash
   claude -p "Lue src/index.js" --bare
   ```
   Mitä muuttuu?

---

## Ratkaisu

### 1. Oikeat työkalut

```bash
claude -p "Lue package.json tiedoston." --tools "Read,Grep"
```

✅ Tämä sallii ainoastaan `Read` - ja `Grep`-työkalut. Bash on estetty.

### 2. Virheellinen työkalu

```bash
claude -p "Aja npm test komennon." --tools "Read"
```

❌ Tämä antaa virheen:

```
❌ Työkalu Bash on estetty
Vain Read ja Grep ovat käytettävissä tässä moodissa.
```

### 3. --bare -moodi

```bash
claude -p "Lue src/index.js" --bare
```

- Ohottaa **hooks**, **skills**, **plugins**, **MCP** ja **CLAUDE.md**
- Hyvästä **CI:n minimipinnille**
- Huono **normaalille kehittäjälle**, koska kaikki oletetut asetukset poistuvat käytöstä

!!! warning "VAROITUS 11"
    Headless + laajat työkalut + automaattiset permission-moodit voivat muodostaa
    erittäin vahvan automaatioagentin. Aina testata ensin read-only-moodina,
    rajoittaa työkalut ja käyttää sandboxia.

---

*Lähde: Esimerkki 04 [S1], [S18]*
