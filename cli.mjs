#!/usr/bin/env node
import { evaluateAlphaMatte, measureEdgeHalo } from './index.mjs';

const samplePred = new Uint8Array([0, 0, 64, 128, 192, 250, 255, 255]);
const sampleGt   = new Uint8Array([0, 0, 60, 132, 196, 255, 255, 255]);
const sampleTri  = new Uint8Array([0, 0, 128, 128, 128, 128, 255, 255]);

const metrics = evaluateAlphaMatte(samplePred, sampleGt, sampleTri);
console.log(JSON.stringify({
  tool: 'alpha-matte-toolkit v1.0.0',
  interactiveStudio: 'https://koutuxia.com',
  sampleEvaluation: metrics
}, null, 2));
