# Harjoitus 20: Bugfix + Feature rinnakkain

!!! quote "Tavoite"
    Käynnistää kaksi **riippumatonta worktreetta** rinnakkain:
    yhtä bugfixin ja toisen featuren kehittämiseen.

## Taustaa

Kun teet **rinnallista työmää** samassa repositoriossa:

❌ Kaksi terminaalia samassa kansiossa → tiedostot sekaantuvat  
✅ Kaksi **worktreetta** → täysin erilliset checkoutit  

Tämä estää:

- Tiedostokonfliktit
- Testien sekaantumisen
- Sessionin sekaantumisen

## Tehtävä

Haluat samanaikaisesti:

1. Korjata **poistopainikkeen bugi** (`fix-delete-button`)
2. Lisätä **new featurein** (esim. dark mode) (`feature-dark-mode`)

Miten voit tehdä tämän turvallisesti?

## Ratkaisu

### Asenna kaksi terminaalia

**Terminaali 1 — bugfix:**

```bash
cd my-project
claude --worktree fix-delete-button
```

**Terminaali 2 — feature:**

```bash
cd my-project
claude --worktree feature-dark-mode
```

### Mitä tapahtuu?

| Terminaali | Worktree-polku | Branch |
|------------|----------------|--------|
| 1 | `.claude/worktrees/fix-delete-button/` | `worktree-fix-delete-button` |
| 2 | `.claude/worktrees/feature-dark-mode/` | `worktree-feature-dark-mode` |

### Tarkista worktreet:

```bash
git worktree list
# tuloste:
# /home/user/my-project          abc123 [main]
# /home/user/my-project/.claude/worktrees/fix-delete-button  def456 [worktree-fix-delete-button]
# /home/user/my-project/.claude/worktrees/feature-dark-mode  ghi789 [worktree-feature-dark-mode]
```

### Yhdistäminen (myöhemmin)

Kun molemmat on valmiita:

```bash
cd .claude/worktrees/fix-delete-button
git diff main  # tarkista
npm test       # testaa
git push origin worktree-fix-delete-button
```

Sitten teet merge GitHubissa tai paikallisesti:

```bash
git checkout main
git pull
git merge worktree-fix-delete-button
```

!!! warning "VAROITUS 09"
    Worktree ei taata riippuvuuksien täydellistä erottelua. Jokaisessa uudessa worktreessa
    pitää alustaa virtualenv, node_modules, build-cache tai muut ympäristökohtaiset artefaktit.

!!! warning "VAROITUS 10"
    Älä kopioi `.env`-tiedostoja `.worktreeinclude`-mekanismilla huolimatta. Se on
    kätevää, mutta tekee jokaisesta worktreesta paikan, jossa salaisuus on käytettävissä.

---

*Lähde: Esimerkki 20 [S1], [S19]*
