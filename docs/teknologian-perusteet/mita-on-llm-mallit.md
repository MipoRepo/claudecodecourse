# Mitä LLM‑mallit ovat?

LLM‑mallit (*Large Language Models*) ovat suuria neuroverkkoja, jotka on koulutettu käsittelemään ja tuottamaan luonnollista kieltä. Ne eivät ole tietoisia järjestelmiä, vaan matemaattisia funktioita, jotka ennustavat, mikä sana, lause tai koodirakenne todennäköisesti tulee seuraavaksi.

LLM:n voi ajatella järjestelmänä, joka on oppinut:

- kielen rakenteet  
- ohjelmointikielten syntaksin  
- tekstin logiikan  
- yleisiä tietoja maailmasta  
- tapoja ratkaista ongelmia  

Mutta se ei tee tätä ihmisen tavoin — vaan **tilastollisesti**.

---

## Aloittelijalle: LLM vertauskuvana

> **LLM on kuin erittäin kielitaitoinen ystävä, joka ei ajattele kuten ihminen — vaan ennustaa, mitä pitäisi sanoa seuraavaksi.**

Kuvittele, että tämä ystävä on lukenut valtavasti tekstiä. Hän ei muista kirjoja sanasta sanaan, mutta hän tietää, miten lauseet yleensä jatkuvat.

Kun sanot:

> “Kirjoita funktio, joka laskee kahden luvun summan…”

Hän ei mieti matemaattisesti, mitä summa tarkoittaa. Hän vain **ennustaa**, että miljoonissa esimerkeissä seuraa jotain tämän kaltaista:

```python
def laske_summa(a, b):
    return a + b
```

LLM ei siis “ymmärrä” maailmaa — se **arvaa todennäköisimmän jatkon**.

---

# Miten LLM oppii?

LLM koulutetaan valtavalla tekstimäärällä. Koulutuksen aikana se oppii useita perusmekanismeja:

### **Tokenointi**  
Teksti pilkotaan pieniin yksiköihin (tokeneihin), jotka voivat olla sanoja, sanan osia tai merkkejä.

### **Embedding‑tila**  
Jokainen token muutetaan matemaattiseksi vektoriksi. Tämä vektori kuvaa tokenin merkitystä suhteessa muihin — kuin piste kartalla.

### **Transformer‑arkkitehtuuri**  
LLM:n ydin on *attention‑mekanismi*, joka laskee, mihin tekstin osiin kannattaa “kiinnittää huomiota”.

### **Todennäköisyysjakaumat**  
Malli laskee, mikä token on todennäköisin seuraavaksi. Se ei “tiedä”, vaan **ennustaa**.

### **Sampling**  
Malli valitsee seuraavan tokenin menetelmällä, kuten:

- **greedy** — valitaan todennäköisin  
- **temperature** — lisätään satunnaisuutta  
- **top‑p** — valitaan todennäköisimmän joukon sisältä  

---

# Mitä LLM ei ole?

LLM ei ole:

- tietoinen  
- looginen samalla tavalla kuin ihminen  
- varma totuuksista  
- täydellinen tietolähde  
- virheetön  

LLM ei “muista” koulutusdataa suoraan, eikä se “tiedä” asioita. Se tuottaa vastauksia **tilastollisen mallin** perusteella.

---

# Miksi LLM‑mallit ovat hyödyllisiä ohjelmistokehityksessä?

LLM pystyy:

- ymmärtämään koodia ja sen rakenteita  
- selittämään virheitä  
- ehdottamaan ratkaisuja  
- kirjoittamaan ja muokkaamaan koodia  
- analysoimaan projektin kokonaisuutta  
- keskustelemaan luonnollisella kielellä  
- yhdistämään tietoa eri lähteistä  

Tämä tekee siitä erinomaisen työkalun ohjelmistokehityksen avuksi — mutta vain, kun sitä käytetään hallitusti ja ihmisen ohjauksessa.

---

# LLM Claude Coden sisällä

Claude Code ei ole itse LLM -malli. Se on **agenttiarkkitehtuuri**, joka käyttää LLM‑mallia moottorinaan.

LLM tuottaa:

- päätökset  
- suunnitelmat  
- analyysit  
- tool‑kutsut  
- koodimuutokset  

Mutta Claude Code:

- hallitsee käyttöoikeudet  
- eristää työtilat  
- ohjaa agentteja  
- valvoo determinismiä  
- integroi ulkoiset työkalut  
- varmistaa turvallisuuden  

Siksi LLM‑mallin ymmärtäminen on välttämätöntä ennen Claude Coden arkkitehtuuria.
