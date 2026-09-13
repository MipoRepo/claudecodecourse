# 1.2 Aikaisempien ja nykyisen terminologian eroja

| Videon termi/komento | Nykyinen dokumentaatio | Käytännön tulkinta |
|---------------------|----------------------|-------------------|
| `/re` | `/rewind` | Palauta checkpointiin |
| `claude -continue` | `claude --continue` / `claude -c` | Jatka viimeisintä sessiota |
| `claude -res NAME` | `claude --resume NAME` / `claude -r NAME` | Jatka nimettyä sessiota |

!!! note "Tärkeä huomio"
    Kyhyt `/re`-komento on säilytetty, mutta virallisen dokumentaation mukaan käytetään nykyään `/rewind`. 
    Molemmissa lähteissä idea on sama: jatka edellistä istuntoa tai palauta aikaisempiin tilaan.

## Komentomerkinnät

| Merkintä | Selitys | Esimerkki |
|----------|---------|-----------|
| `[S1]` | Käyttäjän videotranskriptio | Perusrakenne, esimerkit |
| `[S2]` | Features Overview | Laajennusmalli |
| `[S3]` | Subagents | Custom sub-agentit |
| `[S4]` | Checkpointing | `/rewind` |
| `[S5]` | Sessions | `--resume`, nimeäminen |
| `[S6]` | Parallel agents | Rinnakkaiset istunnot |
| `[S7]` | Configuration | Asetukset |
| `[S8]` | Skills | Custom commands |
| `[S9]` | Quickstart | Aloittaminen |
| `[S10]` | Permissions | Permission-moodit |
| `[S11]` | Hooks reference | Hook-tapahtumat |
| `[S12]` | Hooks guide | Hook-esimerkit |
| `[S13]` | MCP | MCP-asennus |
| `[S14]` | Granola MCP | Granola-esimerkki |
| `[S15]` | MCP specification | MCP-spesifikaatio |
| `[S16]` | MCP server overview | MCP-serverit |
| `[S17]` | MCP tools security | Työkaluturvallisuus |
| `[S18]` | CLI reference | CLI-viite |
| `[S19]` | Worktrees | Worktree-tuki |
| `[S20]` | Plugin/Hook reference | Viitteet |
| `[S21]` | Headless | Headless-moodi |
| `[S22]` | Best Practices | Parhaat käytännöt |

---

*Lähde: Esimerkki 01 [S1], [S2]*
