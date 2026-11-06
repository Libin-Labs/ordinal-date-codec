import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('leap day', () => {
  assert.equal(api.toOrdinalDate({ year: 2024, month: 2, day: 29 }), '2024-060');
  assert.deepEqual(api.fromOrdinalDate('2024-060'), { year: 2024, month: 2, day: 29 });
});
test('century exception', () => {
  assert.equal(api.toOrdinalDate({ year: 1900, month: 3, day: 1 }), '1900-060');
  assert.equal(api.toOrdinalDate({ year: 2000, month: 3, day: 1 }), '2000-061');
});
test('end of year', () => {
  assert.deepEqual(api.fromOrdinalDate('2023-365'), { year: 2023, month: 12, day: 31 });
});
test('year one', () => {
  assert.equal(api.toOrdinalDate({ year: 1, month: 1, day: 1 }), '0001-001');
});
test('complete leap year roundtrip', () => {
  for (let d = 1; d <= 366; d++) {
    const text = '2024-' + String(d).padStart(3, '0');
    assert.equal(api.toOrdinalDate(api.fromOrdinalDate(text)), text);
  }
});
test('invalid dates', () => {
  for (const t of ['2023-366', '0000-001', '2024-000', '2024-60'])
    assert.throws(() => api.fromOrdinalDate(t));
  assert.throws(() => api.toOrdinalDate({ year: 2023, month: 2, day: 29 }));
});
