# Harjoitus 32: Release pipeline -skill

!!! quote "Tavoite"
    Luoda `/release [version]`-skill, joka automaattisesti:

    ✅ Tekee changelogin  
    ✅ Ajaa testit  
    ✅ Ehdottaa version tagia  
    ❌ **Ei tee production-deploia** automaattisesti  

## Taustaa

Release-pipeline on erityisen tarkkaa työtä. Se voi automatisoida:

| Vaihe | Automaattinen? |
|-------|----------------|
| Changelog-generointi | ✅ |
| Testaus | ✅ |
| Versiosehdotus | ✅ |
| Release-notes | ✅ |
| **Production deploy** | ❌ **Aina käsin!** |

Tärkein turvallisuusvaroitus:

!!! danger "TUOTANTO DEPLOY MERKITSEE KÄYTTÄJÄN HYVÄKSYNTÖÄ"

## Tehtävä

Luo skill `/release X.Y.Z`, joka:

1. Tuo commitit viimeisestä taggauksesta läheseen
2. Generoi changelogin (esim. `git log --oneline`)
3. Aja testit
4. Ehdota uutta tagia
4. Muista: **production vaatii käsin!**

## Ratkaisu

### Tiedosto: `.claude/skills/release/SKILL.md`

```yaml
---
name: release
description: Generate changelog, run tests, propose version tag. Does NOT deploy.
argument-hint: [version]
arguments: [version]
disable-model-invocation: false
user-invocable: true
allowed-tools:
  - Bash(git log *)
  - Bash(npm test *)
model: sonnet
---

## Release Process

1. **Changelog**: Git logista viimeisestä taggauksesta
2. **Testit**: npm test
3. **Tagi**: Ehdottele versiosehdotus: vX.Y.Z
4. **Release notes**: Muodosta muutoslista

!!! danger
    Tuotantoon siirtyminen vaatii aina erillisen `/deploy production` -skillin.
    Tämä skill EI deployaa itseään.
```

### Esimerkkikäyttö

```bash
/release 1.4.0
```

### Tuloste

```markdown
## 🚀 Release v1.4.0 — Valmis testaukseen

### Changelog (viimeisestä taggauksesta v1.3.5):
- abc123: Lisää uusi User API endpoint
- def456: Korjaa race condition authissa
- ghi789: Päivitä dependencies

### Testit: ✅ 48/48 läpäisty

### Ehdotettu tagi: `v1.4.0`

>>> Huom: Tuotantoon siirtyminen vaatii `/deploy production` -komennon.
```

---

*Lähde: Esimerkki 32 [S1]*
