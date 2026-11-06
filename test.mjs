import assert from 'node:assert/strict';
import { evaluateAlphaMatte, measureEdgeHalo } from './index.mjs';

const pred = new Uint8Array([0, 128, 255]);
const gt = new Uint8Array([0, 128, 255]);
const res = evaluateAlphaMatte(pred, gt);
assert.equal(res.sad, 0);
assert.equal(res.mse, 0);

const rgba = new Uint8Array([
  255, 255, 255, 0,
  245, 245, 245, 100,
  20, 40, 60, 255
]);
const halo = measureEdgeHalo(rgba, [255, 255, 255]);
assert.equal(halo.boundaryPixels, 1);
assert.ok(halo.meanHaloBleed > 0);
console.log('ALL TESTS PASSED');
