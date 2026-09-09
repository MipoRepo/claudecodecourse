# 1.3 Claude Coden mielenmalli

## Arkkitehtuurinäkymä

Käyttäjä antaa **promptin tai tehtävän**. Tämä kulkee:

1. **CLAUDE.md + säännöt** → projekti- ja käyttäjäkonteksti
2. **Skills** → toistettavat työprosessit
3. **Sub-agents** → erillinen konteksti ja erikoistunut rooli
4. **Hooks** → deterministiset tarkistukset tapahtumiin
5. **MCP** → ulkoiset työkalut ja tietolähteet
6. **Worktrees** → fyysisesti eristetyt työskentelypuut

```mermaid
graph TD
    A[Käyttäjä] --> B[prompt / tehtävä]
    B --> C[Claude Code - pääsessio]

    C --> D[CLAUDE.md + säännöt]
    C --> E[Skills]
    C --> F[Sub-agents]
    C --> G[Hooks]
    C --> H[MCP - ulkoiset työkalut]
    C --> I[Worktrees - erilliset checkoutit]

    style C fill:#3498db, color:#fff
    style D fill:#e74c3c, color:#fff
    style E fill:#9b59b6, color:#fff
    style F fill:#f39c12, color:#fff
    style G fill:#27ae60, color:#fff
    style H fill:#1abc9c, color:#fff
    style I fill:#e67e22, color:#fff
```

## Tärkein periaate

> **Kielimalli tekee päätöksiä todennäköisyysperusteisesti, mutta hookit, permissionsäännöt, Git ja CI voivat tehdä kriittisistä kohdista deterministisiä.**

Claude Code toimii parhaiten, kun nämä vastuut **erotellaan** toisistaan.

## Selitys

| Mekanismi | Miksi se on tärkeä? |
|-----------|---------------------|
| **CLAUDE.md** | Tarjoaa **pysyvän** kontekstin |
| **Skills** | Automatisoi **toistuvat työt** |
| **Sub-agents** | Jaa työ eri **konteksteihin** |
| **Hooks** | Tarjoaa **determinististä** tarkistusta |
| **MCP** | Avaa **ulkoiset tiedot** |
| **Worktrees** | Erottaa **fyysisesti** koodit |

---

*Lähde: [S2] Features Overview*
