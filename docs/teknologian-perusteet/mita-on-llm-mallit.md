# Mitä LLM-mallit eli laajat kielimallit ovat?

LLM (*Large Language Model*) on suuri neuroverkko, joka on koulutettu käsittelemään ja tuottamaan luonnollista kieltä sekä koodia. Kuten edellisessä luvussa todettiin, kyseessä ei ole tietoinen järjestelmä, vaan matemaattinen malli, joka laskee todennäköisyyksiä seuraavalle tokenille (sanalle, sananosalle tai merkille).

LLM on oppinut valtavasta datamäärästä muun muassa:

- kielen rakenteet ja kielioppisäännöt
- ohjelmointikielten syntaksin ja yleisimmät suunnittelumallit
- tekstin ja koodin sisäisen logiikan
- yleistietoa maailmasta ja ongelmanratkaisutavoista

---

## Vertauskuva aloittelijalle

> **LLM on kuin erittäin kielitaitoinen ja lukenut työpari, joka ei ajattele kuten ihminen — vaan ennustaa, mitä pitäisi sanoa seuraavaksi.**

Kuvittele, että tämä työpari on lukenut läpi lähes kaiken verkosta löytyvän koodin ja tekstin. Hän ei muista tiedostoja sanasta sanaan, mutta tietää tarkasti, miten lauseet ja koodirivit yleensä jatkuvat.

Kun pyydät sitä suorittamaan tehtävän:

> ”Kirjoita funktio, joka laskee kahden luvun summan…”

Malli ei mieti matemaattisesti, mitä summa käsitteenä tarkoittaa. Se **ennustaa**, että näiden sanojen jälkeen todennäköisin jatko on seuraavanlainen koodirakenne:

```python
def laske_summa(a, b):
    return a + b
```

LLM ei siis varsinaisesti muista koulutusdataansa eikä hae vastauksia tietokannasta — se **arvaa todennäköisimmän jatkon** oppimiensa kaavojen perusteella.

---

# Miten LLM oppii ja toimii?

LLM koulutetaan valtavalla teksti- ja koodimäärällä. Sen toiminta perustuu muutamaan keskeiseen tekniseen mekanismiin:

### **Tokenointi**  
Syyteksti pilkotaan pieniin yksiköihin eli *tokeneihin*. Token voi olla kokonainen sana, sanan osa tai yksittäinen merkki.

### **Embedding-tila (Vektorikenttä)**  
Jokainen token muutetaan matemaattiseksi vektoriksi. Vektori kuvaa tokenin merkitystä suhteessa muihin sanoihin — kuin piste moniulotteisella kartalla, jossa samankaltaiset käsiteet ovat lähellä toisiaan.

### **Transformer-arkkitehtuuri ja Attention**  
Mallin ydin on *attention-mekanismi* (huomiomekanismi), jonka avulla malli laskee, mihin syötteen osiin sen kannattaa kiinnittää huomiota kunkin uuden tokenin kohdalla.

### **Todennäköisyysjakaumat**  
Malli laskee syötteen perusteella todennäköisyysjakauman kaikille tuntemilleen tokeneille ja valitsee niistä seuraavan.

### **Näytteenotto (Sampling)**  
Malli valitsee seuraavan tokenin annetun strategian mukaisesti:
- **Greedy:** Valitaan aina kaikkein todennäköisin token (eniten deterministinen).
- **Temperature:** Säädetään vastauksen yllätyksellisyyttä. Korkeampi arvo lisää luovuutta ja satunnaisuutta, alhaisempi pitää vastauksen tarkkana.
- **Top-p (Nucleus sampling):** Rajataan valinta tiettyyn todennäköisimpien tokenien joukkoon.

---

# Miksi LLM on niin tehokas ohjelmistokehityksessä?

Kielimalli on poikkeuksellisen hyödyllinen kehittäjälle, koska se pystyy:

- ymmärtämään ja selittämään koodikantoja
- paikallistamaan virheitä (debugging) ja ehdottamaan korjauksia
- kirjoittamaan, refaktoroimaan ja dokumentoimaan koodia
- yhdistämään tietoa eri tiedostoista ja rajapinnoista
- keskustelemaan ratkaisuista luonnollisella kielellä

---

# LLM osana Claude Codea

On tärkeää ymmärtää, että **Claude Code ei itse ole LLM**. Claude Code on **agenttiympäristö**, joka käyttää taustalla olevaa LLM-mallia (kuten Claude 3.7 Sonnetia) moottorinaan.

Työnjako toimii seuraavasti:

* **LLM (Moottori):** Tekee analyysit, laatii suunnitelmat, päättää mitä työkaluja kutsutaan ja tuottaa koodimuutosehdotukset.
* **Claude Code (Agenttiympäristö):** Hallitsee käyttöoikeuksia, eristää työtilat, ajaa komentoja suoraan järjestelmässä, valvoo toiminnan turvallisuutta ja integroi ulkoiset työkalut kehitysympäristöösi.