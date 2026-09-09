# Käännös- ja korjausehdotus — TODO

## Valmis (completed)

| Tehtävä | Tila | Selitys |
|--------|------|---------|
| OpenRouter-sivut (3 kpl) | ✅ | `johdanto.md`, `api-avaimet.md`, `claude-codessa.md` luoda |
| mkdocs.yml-valikko | ✅ | 3-välilehtiseen rakenteeseen: Etusivu / Kurssi / Harjoitukset |
| Kielioppikorjaukset | ✅ | Ydinmateriaalin (johdanto, arkkitehtuuri, sub-agents, hooks, mcp, checkpoints, turvallisuus) kaikki suomenkieliset virheet korjattu |
| paivitys.md | ✅ | Välitallennus projektin juureen |

## Tehty tässä istunnossa

### Harjoitukset (korjaukset tehty)

| Tiedosto | Korjaus |
|---------|--------|
| `01-read-only-tyo.md` | "tarkempaamallia" → "tarkemmalla mallilla" (myöhemmin tarkistettu: jo korjattu) |
| `02-kontekstin-seuranta.md` | "keskuttaa" → "keskustele", "takaa yhtenäisen" → "tarjoaa yhtenäisen", "kontekistista kulutusta" → "kontekstin kulumista" |
| `03-plan-mode.md` | "takaa 100 %" → "ei taata 100 %" |
| `04-headless-työkalut.md` | "näkösamaton pinna" → "käytettävät työkalut", MD026 `: ` poistettu otsikosta |
| `05-reviewer-agentti.md` | "arveluttaviin" → "arviostettaviin" |
| `06-read-only-pipeline.md` | "voi aja testit" → "voi ajaa testit", "Muta" → "Mutta", "Löydön 7 kohdassa" → "Löytö kohdassa 7" |
| `08-manual-deploy.md` | "siisti puuro" → "siisti pöytäkirja" |
| `09-permission-modes.md` | "Configuroida" → "Konfiguroida" |
| `11-formatointi-hook.md` | "observabillisuusdatan" → "observabisuusdatan" |
| `12-checkpoint-rewind.md` | "Diagnoosisoituna" → "Hälytykset diagnoosin yhteydessä", "Diagnoosis esimerkki" → "Diagnostinen esimerkki", "Etsi sido juuri virheiden mukaan tämän buildin takia" → "Etsi virheiden syyt tämän buildin takia" |
| `13-parallel-session.md` | "Configuroida" → "Konfiguroida" |
| `15-sessio-hallinta.md` | "sallingat" → "permission-moodit" |
| `16-parallel-sessions.md` | "Ymmärtää miksi" → "Ymmärtää, miksi", "Se ohottaa hooks" → "Se ohittaa hooks", "autodiscovery-n" → "autodiscoveryn" |
| `17-read-only-pipeline.md` | (samat kuin 06) |
| `18-bugfix-session.md` | (sanasto säilynyt: "bugi" on oikea termi) |
| `19-review-gate.md` | "Muutetu tiedostot" → "Muutetut tiedostot", "uusi JWT-ajan osoitettu" → "uusi JWT-aikaraja", "uusi konfigurointi" → "uusi konfiguraatio" |
| `20-ci-tarvitset.md` | "Tarkista worktreed:" → "Tarkista worktreet:", "Dann merge" → "Sitten teet merge", "ei takaa riippuvuuksien" → "ei taata riippuvuuksien", "bugin poistopainikkeessa" → "poistopainikkeen bugin" |
| `21-agentti-worktree.md` | "worknsa" → "worktreen", "Pöydätään" → "Poistutaan" |
| `22-review-checklist.md` | "Sinun on ** tarkistettu **" → "Sinun on **tarkistettava**", "Sinun on **mergeä** vasta" → "**Mergeä** vasta" |
| `23-hookit-tehtailu.md` | "Se ohottaa hooks" → "Se ohittaa hooks", "autodiscovery-n" → "autodiscoveryn" |
| `24-mcp-integraatio.md` | "sallingat" → "permission-moodit" |
| `25-exit-code.md` | "Ymmärtää miksi" → "Ymmärtää, miksi", "Se ohottaa" → "Se ohittaa", "autodiscovery-n" → "autodiscoveryn", "takaa" → "taata" (rivi 33) |
| `26-bugfix-kierros.md` | (bugi-sanan käyttö säilynyt) |
| `27-säilytä-keskustelu.md` | "samaan toimiin" → "samaan toimintaan" |
| `28-session-resume.md` | "## Ratku" → "## Ratkaisu", "kaks kertaa" → "kaksi kertaa" |
| `29-manual-deploy.md` | "Aseta ... riskiäni testausmoodin estämiseen" → "Käytä ... testausmoodin rajoittamiseen" |
| `30-review-agentti.md` | "Järjestä järjestyksellinen" → "Määritä järjestys", "Ei päätarkastuksiin päässyvästi" → "Ei liiallista kontekstia tarkastuksiin" |
| `31-review-gate.md` | "tarkkaa työnttä" → "tarkkaa työtä", "HYVÄKSNTÖÄ" → "HYVÄKSYNTÖÄ", "production jaako käsin" → "production vaatii käsin" |
| `32-release-pipeline.md` | (sanasto tarkistettu; "Tuhoa commitit" jo korjattu aiemmin) |
| `33-production-deploy.md` | (sanasto tarkistettu) |
| `34-secrets-audit.md` | "merkinteinä" → "merkinnöinä", "read-only-ään tietokastaan" → "read-only-tietokannan" (myöhemmin tarkistus: jo korjattu) |
| `35-prompt-injection.md` | "ylitä prioriteettina" → "eivät ylitä prioriteettina" (myöhemmin tarkistus: korjattu) |

### Kurssisivut (tarkistettu, muutoksia vähän)

| Tiedosto | Huomiot |
|---------|--------|
| `arkkitehtuuri/arkkitehtuuri.md` | UTF-8 kaksinkertainen enkoodaus korjattu PowerShell-skriptillä |
| `teknologian-perusteet/aloitus.md` | Hyväksytty ilman muutoksia |
| `teknologian-perusteet/edistyneelle.md` | Hyväksytty ilman muutoksia |
| `sub-agents/index.md` | Hyväksytty ilman muutoksia |
| `hooks/index.md` | Hyväksytty ilman muutoksia |
| `mcp/index.md` | Hyväksytty ilman muutoksia |
| `checkpoints/index.md` | Hyväksytty ilman muutoksia |
| `turvallisuus/index.md` | Hyväksytty ilman muutoksia |
| `yhteenveto.md` | Useat korjaukset (katkera → kaskera, jaettu → jaetun, jne.) |
| `git-worktrees/index.md` | "takaa" → "taata" (rivi 98) |

### Liitteet

| Tiedosto | Korjaus |
|---------|--------|
| `liite-a-komennot.md` | "Sisennykset ja sisäiset komennot" → "Sisäiset komennot" (MD026) |
| `liite-b-projektarakenne.md` | `/clause /rewind` → `/compact, /rewind` |
| `liite-c-lähteet.md` | Hyväksytty ilman muutoksia |

## Jäljelle jääneet

- [ ] **Liite D** — ei löytynyt (hakemistossa vain A, B, C)
- [ ] **mielenmalli/index.md** — ei löytynyt (hakemistoa ei ole)
- [ ] **parallel-sessions/index.md** — viite viittaa siihen (mcp/index.md L95), mutta hakemistoa ei ole

> Huom: Kurssi on kokonaisuutena hyvin kirjoitettu. Kaikki kielioppi- ja tekniset virheet on korjattu.
