# Harjoitus 16: MCP + Read-only Database

!!! quote "Tavoite"
    Luoda **MCP-palvelin**, joka sallii **vain SELECT-operaatiot** testitietokantaan,
    ja estää kaikki kirjoitusoperaatiot.

## Taustaa

Tärkein turvallisuusperiaate MCP-liitännössä:

> **Production DB:n kirjoituspolku on täysin erillään test-tietokannasta.**

Kun MCP tarjoaa vain lukuoikeudet:

✅ Ei voi kirjoittaa tuotantoon  
✅ Voidaan turvallisesti debugata  
✅ Testit voivat suorittaa kyselyitä ilman riskiä  

## Tehtävä

Luo MCP-palvelin, joka:

✅ Sallii `SELECT`-kyselyt  
❌ Estää `INSERT/UPDATE/DELETE/DROP`  
✅ Käytetään testitietokantaan (`test_db`)

## Ratkaisu

### MCP-palvelimescripti: `mcp-readonly-db.py`

```python
#!/usr/bin/env python3
"""MCP-palvelin, joka tarjoaa read-only-tietokannan."""
import sqlite3
import json
import re

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

def is_read_only(query: str) -> bool:
    """Tarkista onko kysely READ-ONLY-muotoinen."""
    write_patterns = [
        r'\bINSERT\b', r'\bUPDATE\b', r'\bDELETE\b',
        r'\bDROP\b', r'\bALTER\b', r'\bCREATE\b',
        r'\bTRUNCATE\b', r'\bGRANT\b', r'\bREVOKE\b'
    ]
    return not any(re.search(p, query, re.IGNORECASE) for p in write_patterns)

def main():
    # Simuloitu MCP JSON-RPC viesti
    request = json.load(sys.stdin)
    method = request.get("method")

    if method == "tools/call":
        tool_name = request["params"]["name"]
        args = request["params"]["arguments"]
        query = args.get("query", "")

        if not is_read_only(query):
            print(json.dumps({
                "error": "VAIN READ-ONLY kyselyt ovat sallittuja.",
                "query": query,
                "status": "denied"
            }))
            sys.exit(1)

        result = cursor.execute(query).fetchall()
        print(json.dumps({
            "result": result,
            "status": "success"
        }))

main()
```

### Rekisteröinti Claude Coden kanssa

```bash
claude mcp add --transport http readonly-db http://localhost:8081/mcp
```

### Käyttö Claude Codessa

```bash
claude "Lue käyttäjätaulun schema MCP:n kautta"
```

Claude vastaa:

```json
{
  "columns": ["id", "username", "email", "created_at"],
  "row_count": 142,
  "sample": [{"id": 1, "username": "alice", "email": "alice@example.com"}]
}
```

Yritettävä kirjoitusta:

```bash
claude "Poista käyttäjä ID 5 tietokannasta"
```

→ `❌ ERROR: VAIN READ-ONLY kyselyt ovat sallittuja.`

---

*Lähde: Esimerkki 16 [S1], [S13]*
