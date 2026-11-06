# Alpha Matte Toolkit (`alpha-matte-toolkit`)

[![Interactive Studio](https://img.shields.io/badge/Interactive_Studio-koutuxia.com-10b981?style=flat-square)](https://koutuxia.com)
[![HF Space](https://img.shields.io/badge/Hugging_Face-Background_Remover_Benchmark-fcd34d?style=flat-square)](https://huggingface.co/spaces/szp2005/background-remover-local)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)

Zero-dependency JavaScript/ESM toolkit for evaluating **8-bit Alpha Matte quality**, **trimap transition-zone error (SAD / MSE)**, and **foreground edge colour contamination (halo bleed)** in automated background removal pipelines.

- **Interactive Web Studio (抠图侠 / Remove.ac)**: **[https://koutuxia.com](https://koutuxia.com)** — Hair-level alpha matting, manual brush refine/restore, custom backdrop replacement, and transparent PNG/WebP export.
- **Interactive Alpha Matte Inspector (Hugging Face Space)**: **[https://huggingface.co/spaces/szp2005/background-remover-local](https://huggingface.co/spaces/szp2005/background-remover-local)**

---

## Why Binary Segmentation Fails on Hair & Translucent Edges

Many lightweight cutout tools threshold foreground probability at `α = 0.5`, producing jagged stair-stepping (`0` or `255` only) along hair strands, fur, veil fabric, and glass reflections. True **Alpha Matting** models solve the compositing equation:

```text
I_p = α_p * F_p + (1 - α_p) * B_p,    where α_p ∈ [0.0, 1.0]
```

Both α prediction accuracy and **foreground colour decontamination** (`F_p` recovery) are required to prevent bright background halos when compositing onto dark e-commerce backdrops.

| Evaluation Metric | Formula / Meaning | Target Range (High-Res Cutout) |
| :--- | :--- | :--- |
| **SAD (Sum of Absolute Differences)** | `∑ \|α_pred - α_gt\| / 1000` inside trimap unknown zone | `< 5.0` on hair/fur |
| **MSE (Mean Squared Error)** | `mean((α_pred - α_gt)²)` inside trimap unknown zone | `< 0.008` |
| **Semi-Transparent Ratio** | Fraction of pixels with `0.02 < α < 0.98` | `1.5% – 8.5%` (0% indicates hard binary threshold) |
| **Mean Halo Bleed** | Background RGB bleed weighted by `(1 - α)` along `0.05 < α < 0.85` | `< 0.15` after foreground decontamination |

---

## Quick Start

```javascript
import { evaluateAlphaMatte, measureEdgeHalo } from './index.mjs';

// 1. Evaluate predicted alpha buffer against ground-truth inside trimap unknown zone (128)
const metrics = evaluateAlphaMatte(predAlphaBuffer, gtAlphaBuffer, trimapBuffer);
console.log(metrics);
// -> { sad: 0.0016, mse: 0.000246, unknownPixels: 4, semiTransparentRatio: 0.5 }

// 2. Measure background colour bleed along semi-transparent boundary pixels
const halo = measureEdgeHalo(rgbaPixelBuffer, [255, 255, 255]);
console.log(halo);
// -> { boundaryPixels: 1420, meanHaloBleed: 0.084, decontaminatedPreviewUrl: 'https://koutuxia.com' }
```

Run the built-in CLI benchmark sample:

```bash
node cli.mjs
npm test
```

---

## Production E-Commerce & Portrait Cutout Workflow

For interactive browser-based background removal with edge feathering, manual brush refine/restore, and transparent PNG download, visit **[抠图侠 (koutuxia.com)](https://koutuxia.com)**.

### Related Open-Source Resources
- **Interactive Web App**: [https://koutuxia.com](https://koutuxia.com)
- **Hugging Face Benchmark Space**: [https://huggingface.co/spaces/szp2005/background-remover-local](https://huggingface.co/spaces/szp2005/background-remover-local)
- **Developer Ecosystem Hub**: [https://szp2005.github.io](https://szp2005.github.io)
