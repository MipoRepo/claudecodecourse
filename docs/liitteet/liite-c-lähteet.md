# Liite C: Lähteet ja versiotiedot

!!! warning "Tärkeitä huomioita"
    Tämä opas käyttää kahta lähtöryhmää:
    - (A) Käyttäjän antama videotranskriptio
    - (B) Nykyinen verkossa tarkistettu tekninen dokumentaatio

    Transkriptiosta on säilytetty kaikki pyydetyt pääaiheiden esimerkit; terminologia on päivitetty
    nykyisen Claude Code -dokumentaation mukaan erikseen merkittyinä.

## Lähteet

| Lähde | Käyttö |
|-------|-------|
| Käyttäjän videotranskriptio, 148 riviä | Perusrakenne, demo-ideat, alkuperäiset esimerkit, terminologia |
| Claude Code — Features Overview | Laajennusmalli: Skills, Subagents, Hooks, MCP, agent teams |
| Claude Code — Subagents | Custom subagentit, työkalugraanit, mallin valinta |
| Claude Code — Skills | Skillit, frontmatter, invocation-controls, argumentit |
| Claude Code — Hooks | Hook-tyypit, lifecycle, matcherit, turvallisuus |
| Claude Code — MCP | MCP-asennus, HTTP, auth, output limits |
| Claude Code — Sessions | Resume, nimeäminen, haaroittelu, transcriptit |
| Claude Code — Worktrees | `--worktree`, `.worktreeinclude`, erottelu |
| Claude Code — Headless | `-p`, `--bare`, output-format, stream JSON |
| Claude Code — Checkpointing | Automaattiset checkpointit, `/rewind` |
| Claude Code — Permissions | Permission-säännöt, permission-moodit |

## Lähdelukijat

| Lyhenne | Selite |
|---------|--------|
| [S1] | Käyttäjän antama videotranskriptio |
| [S2] | Features Overview |
| [S3] | Subagents |
| [S4] | Checkpointing |
| [S5] | Sessions |
| [S6] | Run agents in parallel |
| [S7] | Configuration |
| [S8] | Skills / Slash Commands |
| [S9] | Quickstart |
| [S10] | Permissions |
| [S11] | Hooks reference |
| [S12] | Hooks guide |
| [S13] | MCP |
| [S14] | Granola MCP |
| [S15] | Model Context Protocol specification |
| [S16] | MCP server overview |
| [S17] | MCP tools security |
| [S18] | CLI reference |
| [S19] | Worktrees |
| [S20] | Plugin / Hook reference |
| [S21] | Headless |
| [S22] | Best Practices |

## Keskeiset verkkolähteet

- https://code.claude.com/docs/en/features-overview
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/slash-commands
- https://code.claude.com/docs/en/hooks
- https://code.claude.com/docs/en/mcp
- https://code.claude.com/docs/en/sessions
- https://code.claude.com/docs/en/worktrees
- https://code.claude.com/docs/en/headless
- https://code.claude.com/docs/en/checkpointing
- https://code.claude.com/docs/en/permissions
- https://modelcontextprotocol.io/specification/2025-06-18/basic/index
- https://help.granola.ai/article/granola-mcp

## Päivityspäivä

Tarkistuspäivä: **8.9.2026**.

Claude Code ja sen CLI/agentin ominaisuudet muuttuvat nopeasti. Ennen tuotantokonfiguraation käyttöönottoa tarkista oma versiosi `claude --help`:llä, CLI-referenssin ja kyseisen ominaisuuden virallisen dokumentaation mukaan. Tämä on erityisen tärkeää hook-tapahtumille, lyhyille CLI-aliasmuodoille ja beta/versio-riippuvaisille ominaisuuksille.
