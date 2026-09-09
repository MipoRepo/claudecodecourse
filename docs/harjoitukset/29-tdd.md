# Harjoitus 29: TDD Claude-työskentely

!!! quote "Tavoite"
    Oppia TDD-mallia (Test-Driven Development) Claude-agentin kanssa:
    **failing test → toteutus → testien ajo**.

## Taustaa

Klassisessa TDD:ssä:

1. **Red**: Kirjoita epäonnistuva testi
2. **Green**: Toteuta toiminnallisuus
3. **Refactor**: Tiivistä koodi

Claudelle tämä on erityisen voimallista — se voi kirjoittaa testin, toteuttaa sen ja
varmistaa sen toimivan **samassa istunnossa**.

## Tehtävä

Toteuta suurinomuista **failing test + implement** -putki:

1. Kirjoita **epäonnistuva testi** toiminnallisuudelle `calculateTax(amount, rate)`
2. Toteuta toiminnallisuus
3. Aja testit → kaikki täytyy olla vihreinä

## Ratkaisu

### Vaihe 1: Kysy Claudelta testi + toteutus

```bash
claude "TDD-tyyppisesti:

1. Kirjoita failing test calculateTax-funktiolle (src/utils/tax.js)
2. Toteuta funktio
3. Aja testit ja varmista, että kaikki läpäiserro"
```

### Vaihe 2: Claude tekee testin

```javascript
// tests/utils/tax.test.js
const { calculateTax } = require('../../src/utils/tax');

describe('calculateTax', () => {
  test('Laskisi 24 % ALV: 100 => 24', () => {
    expect(calculateTax(100, 0.24)).toBe(24);
  });

  test('Nollaaa arvo => nolla', () => {
    expect(calculateTax(0, 0.24)).toBe(0);
  });

  test('Negatiivisena arvon => heitä virhe', () => {
    expect(() => calculateTax(-10, 0.24)).toThrow('Amount must be positive');
  });
});
```

### Vaihe 3: Claude toteuttaa toiminnallisuuden

```javascript
// src/utils/tax.js
function calculateTax(amount, rate) {
  if (amount < 0) throw new Error('Amount must be positive');
  return Math.round(amount * rate * 100) / 100;
}

module.exports = { calculateTax };
```

### Vaihe 4: Aja testit

```bash
$ npx jest tests/utils/tax.test.js

PASS  tests/utils/tax.test.js
  calculateTax
    ✓ Laske 24% ALV: 100 => 24 (1ms)
    ✓ Nollaa arvo => nolla
    ✓ Negatiivinen arvo => heitä virhe

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

### Miksi tämä on tehokasta?

| Vaihe | Claude tekee | Hyöty |
|-------|-------------|-------|
| 1. Testi | Kirjoittaa failing testin | Määrittelee odotukset selvästi |
| 2. Toteutus | Toteuttaa toiminnallisuuden | Täsmällisesti vastaukseen testiin |
| 3. Testaus | Aja ja tarkista | Varmistaa, että kaikki täsmää |

!!! tip
    Käytä `--allowedTools "Bash(jest*)"` testausmoodin rajoittamiseen.

---

*Lähde: Esimerkki 29 [S1]*
