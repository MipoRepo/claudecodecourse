# 7. Parallel Sessions

## 7.1 Sessio on tilakäsittelytila

Claude Code tallentaa sessioita **paikallisesti projektihakemistoon** sidottuina
keskustelutallenteina.

### Nykyiset komennot

| Komento | Toiminta |
|---------|----------|
| `claude --continue` / `claude -c` | Jatka viimeisintä sessiota |
| `claude --resume` / `claude -r` | Avaa session-valitsimen |
| `claude --resume NAME` | Jatka nimettyä sessiota |
| `claude --from-pr 123` | Jatka PR:llä olevaa sessiota |
| `claude --name NAME` | Nimeä uusi sessio |
| `/branch` | Hae kopio keskustelusta |

Sessioiden JSONL-transkriptit sijaitsevat tyypillisesti:

```
~/.claude/projects/<project>/<session-id>.jsonl
```

## 7.2 Sessioiden nimeäminen

```bash
claude --name auth-refactor
```

Jatka myöhemmin:

```bash
claude --resume auth-refactor
# tai lyhyenä muotona
claude -r auth-refactor
```

!!! tip
    Nykyinen `--name`-muoto on virallinen, vaikka video käytti `-n`-syntaksia.
    Toimintaperiaate pysyy samana: **nimeä sessio ja palaa siihen**.

## 7.3 Sessioiden haaroittaminen (Branching)

```bash
/branch try-streaming-approach
```

`/branch` luo **kopion keskustelusta** ja jättää alkuperäisen muuttumattomaksi. Uudelta
haarelta saa uusi **ID**.

!!! warning "VAROITUS 08"
    Sessioiden haajoittelu on **keskustelun haaroittelu**, **ei automaattisesti Git-branchin luominen**.
    Koodin fyysinen eriytelys tehdään **worktreeilla**.

### Esimerkki 17: Riskialtis refaktorointi haarassa

```bash
# Kun peruslinja toimii...
/branch risky-rewrite

# Kokeile kokonaisuudistusta haussa
# Alkuperäinen keskustelu pysyy koskemattomana
```

### Esimerkki 18: Dedicated bugfix-session

```bash
claude --name memory-leak-fix

# Keskity OBS! vain ongelmaan
# Palaa samoin sessioon myöhemmässäkin vaiheessa
```

Tämä vähentää tarvetta selittää taustaa uudelleen.

### Esimerkki 19: PR-sessio

```bash
claude --from-pr 123
```

Nykyinen CLI tukee `--from-pr`-muotoa PR-numeroon tai PR-URL:iin.

!!! warning "VAROITUS"
    Älä aja samaa sessiota yhtä aikaa kahdessa terminaalissa ilman forkkia — viestit
    voivat muodostua saman transcriptin sekaiseksi.

---

## Seuraavaksi

- [Luku 8: Git Worktrees](../git-worktrees/index.md)
