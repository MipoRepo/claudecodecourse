# 4. Skills

## 4.1 Skillin konsepti

!!! abstract "Määritelmä"

    **Skill** on Markdown-pohjainen, **uudelleenkäytettävä** tieto- tai työprosessimoduuli.

Nykyisessä Claude Codessa **custom commands** on yhdistetty **Skills-järjestelmään**:

- `.claude/commands/deploy.md` ja
- `.claude/skills/deploy/SKILL.md`

voivat tuottaa saman `/deploy`-komennon. Skill voi kuitenkin sisältää:

- tukitiedostoja
- frontmatter-ohjausta
- argumenttien käsittelyä

## 4.2 Rakenne

```
.claude/
  skills/
    ├── deploy/
    │   ├── SKILL.md
    │   ├── checklist.md
    │   ├── scripts/
    │   └── verify.sh
    ├── release-notes/
    │   └── SKILL.md
    └── incident-triage/
        └── SKILL.md
```

## 4.3 Frontmatter

```yaml
---
name: deploy
description: Deploy the current release using the project deployment checklist.
argument-hint: [environment]
arguments: [environment]
disable-model-invocation: true
user-invocable: true
allowed-tools:
  - Bash(git status *)
  - Bash(git diff *)
model: sonnet
---
```

### Käytettävät kentät

| Kenttä | Selitys | Pakollinen |
|--------|---------|-----------|
| `name` | Skillin nimi (esim. `/deploy`) | ✅ |
| `description` | Lyhyt kuvaus | ✅ |
| `when_to_use` | Kun tätä tulee käyttää | Ei |
| `argument-hint` | Argumenttien vihje | Ei |
| `arguments` | Vastaanotetut argumentit | Ei |
| `disable-model-invocation` | Estää Claude-kutsun | Ei |
| `user-invocable` | Näkyy `/`-valikossa | Ei |
| `allowed-tools` | Sallitut työkalut | Ei |
| `model` | Mallin valinta | Ei |

## 4.4 disable-model-invocation / disable-model-invocation

!!! important "Taulukko"

    | Asetus | Claude voi kutsua | Käyttäjä voi /-kutsun? | Tyypillinen käyttö |
    |--------|-------------------|----------------------|-------------------|
    | `disable-model-invocation: false` | ✅ Kyllä | ✅ Kyllä | Debug, review, dokumentointi |
    | `disable-model-invocation: true` | ❌ Ei | ✅ Kyllä | Deploy, rollback, julkaisuprosessi |
    | `user-invocable: false` | ✅ Oletus | ❌ Ei valikosta | Taustatieto / legacy-context |

### Esimerkki 08: Manuaalinen deploy

Deploy voi olla aina ihmisen laukaisema:

```yaml
---
name: deploy
description: Manual deploy gate — human approval required.
disable-model-invocation: true
user-invocable: true
---
```

### Esimerkki 09: Argumentin välitys

```yaml
---
name: deploy
arguments: [environment]
---
Deploy to $ARGUMENTS[0]...

/deploy staging
```

### Esimerkki 10: Incident triage -skill

```yaml
---
name: incident-triage
description: Triage an application incident from a log file.
argument-hint: [logfile]
arguments: logfile
---

Analyze $logfile:
- classify symptom
- extract first failure
- identify probable root cause
- list evidence
- propose next three checks
- never claim certainty without evidence
```

!!! tip "ADVANCED-VINKKI 04"
    Pidä skillin `description` lyhyenä mutta osuvana — `description + when_to_use`
    on rajoittu 1 536 merkiin.

!!! tip "ADVANCED-VINKKI 05"
    Käytä `allowed-tools`-kenttää vähentämään approval-kitkaa — mutta älä siekota sitä
    työkalujen varsinaiseen deny-pinnan. Varsinaiset kiellot tehdään **permission-säännöillä**.

!!! warning "VAROITUS 04"
    Älä laita deploy-Skilliin laajaa `bypassPermissions`-ajatusta. Sivuvaikutteinen workflow
    pitää suunnitella eksplisiittisen kynnistystä, minimioikeuksia ja ympäristörajausta vastaan.

---

## Seuraavaksi

- [Luku 5: Hooks](../hooks/index.md)
