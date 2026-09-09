# Liite A: Komentojen pikakortti

Tämä liite on **pikakortti** kaikista tärkeimmistä Claude Code -komennoista.

## Peruskäyttö

| Komento | Tarkoitus |
|---------|-----------|
| `claude` | Interaktiivinen sessio |
| `claude -p "..."` | Headless / non-interactive |
| `claude --continue` | Jatka viimeisin sessio |
| `claude --resume` | Avaa session-valitsin |
| `claude --resume NAME` | Jatka nimettyä sessiota |
| `claude --from-pr 123` | Jatka PR:llä olevaa sessiota |
| `claude --worktree NAME` | Luo eristetty worktree |
| `claude --agent NAME` | Aja sessio tietyn subagentin alta |

## Sisäiset komennot

| Komento | Tarkoitus |
|---------|-----------|
| `/agents` | Subagent-näkymä |
| `/skills` | Skill-näkymä |
| `/hooks` | Hook-konfiguraation tarkastus |
| `/mcp` | MCP-palveluiden hallinta ja autentikointi |
| `/context` | Kontekstinkäyttäytyminen |
| `/compact` | Tiivistä keskustelua |
| `/resume` | Vaihda sessioon |
| `/branch NAME` | Haihauta keskustelusta |
| `/rewind` | Palauta checkpointiin |
| `/permissions` | Permission-säännöt |

## Exit-coden ajattelu

```bash
cat build.log | claude -p "Return JSON with status, first_failure, likely_cause, next_action" \
  --output-format json
```

!!! tip
    Headless-ajossa aina käännetään selkeään JSONiin ja validoidaan ennen jatkokäyttöä.
