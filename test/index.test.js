import test from 'node:test';
import assert from 'node:assert/strict';
import { hello } from '../src/index.js';

test('scaffold smoke test', () => {
  assert.equal(hello(), 'demo-project-app');
});
