import test from 'node:test';
import assert from 'node:assert/strict';
import { getAvailableSlots } from '../src/slots.js';

const ONE_HOUR_MS = 60 * 60 * 1000;

test('returns correct number of slots for 1 hour duration', async () => {
  const slots = await getAvailableSlots(ONE_HOUR_MS);
  // Expected slots from 09:00 to 16:00 inclusive every 30 min => 15 slots
  assert.equal(slots.length, 15);
});

test('returns empty array when duration exceeds workday', async () => {
  const nineHours = 9 * ONE_HOUR_MS;
  const slots = await getAvailableSlots(nineHours);
  assert.deepEqual(slots, []);
});

test('rejects for non-numeric input', async () => {
  await assert.rejects(() => getAvailableSlots('abc'));
});
