# OpenRouter – Käytännön opas

## Sisällysluettelo

1. [Etusivu ja perusteet](#1-etusivu-ja-perusteet)
   - [Mikä OpenRouter on?](#mikä-openrouter-on)
   - [API-avain, mallin tunniste ja Provider](#api-avain-mallin-tunniste-ja-provider)
   - [Onko OpenRouter ilmainen?](#onko-openrouter-ilmainen)
2. [API-avaimen luominen ja turvallisuus](#2-api-avaimen-luominen-ja-turvallisuus)
   - [Mistä ja miten API-avain luodaan?](#mistä-ja-miten-api-avain-luodaan)
   - [API-avaimen suojaaminen](#api-avaimen-suojaaminen)
   - [Ympäristömuuttujat](#ympäristömuuttujat)
   - [Toiminta avaimen vuotamistilanteessa](#toiminta-avaimen-vuotamistilanteessa)
3. [Ilmaiskäyttö ja kustannusten hallinta](#3-ilmaiskäyttö-ja-kustannusten-hallinta)
   - [Miten `:free`-mallit toimivat?](#miten-free-mallit-toimivat)
   - [API-avaimen käyttöraja](#api-avaimen-käyttöraja)
   - [Päivittäiset ja minuuttikohtaiset pyyntörajat](#päivittäiset-ja-minuuttikohtaiset-pyyntörajat)
   - [Maksullisten yllätysten välttäminen](#maksullisten-yllätysten-välttäminen)
4. [Konfigurointi ja työkalut](#4-konfigurointi-ja-työkalut)
   - [Oletusmallin määrittäminen Preset-asetuksissa](#oletusmallin-määrittäminen-preset-asetuksissa)
   - [OpenRouterin automaattinen reititys](#openrouterin-automaattinen-reititys)
   - [Claude Code ja muut kehitystyökalut](#claude-code-ja-muut-kehitystyökalut)
   - [API-yhteyden testaaminen](#api-yhteyden-testaaminen)
   - [Todellinen agenttitesti](#todellinen-agenttitesti)
5. [Mallien valinta ja vertailu](#5-mallien-valinta-ja-vertailu)
   - [Ilmaismallien tärkeät ominaisuudet](#ilmaismallien-tärkeät-ominaisuudet)
   - [Mallien arviointi ja vertailu](#mallien-arviointi-ja-vertailu)
   - [Providerit ja routing](#providerit-ja-routing)
   - [Turvallisuuschecklist](#turvallisuuschecklist)

---