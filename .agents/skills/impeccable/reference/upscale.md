# upscale

Increase image resolution using AI-powered upscaling.

## Overview

The `upscale` operation increases the resolution of an image beyond its original dimensions while preserving or enhancing detail. Unlike simple resizing, upscaling uses AI models to intelligently reconstruct high-frequency details that would otherwise be lost.

## Usage

```yaml
operation: upscale
factor: 2
```

```yaml
operation: upscale
target_width: 3840
target_height: 2160
model: real-esrgan
```

## Parameters

### `factor`
- **Type:** `number`
- **Required:** No (either `factor` or `target_width`/`target_height` must be provided)
- **Allowed values:** `2`, `4`, `8`
- **Default:** `2`

The multiplier to apply to both width and height. A factor of `2` on a 1920×1080 image produces a 3840×2160 output.

### `target_width`
- **Type:** `integer`
- **Required:** No
- **Range:** `1` – `16384`

Explicit output width in pixels. When provided alongside `target_height`, the image is upscaled to fit within those bounds while maintaining aspect ratio unless `stretch` is enabled.

### `target_height`
- **Type:** `integer`
- **Required:** No
- **Range:** `1` – `16384`

Explicit output height in pixels.

### `model`
- **Type:** `string`
- **Required:** No
- **Allowed values:** `real-esrgan`, `esrgan`, `lanczos`, `bicubic`
- **Default:** `real-esrgan`

The upscaling model to use.

| Model | Description | Speed | Quality |
|-------|-------------|-------|---------|
| `real-esrgan` | AI model optimized for real-world photos and textures | Slow | Highest |
| `esrgan` | Classic ESRGAN, good for illustrations and artwork | Moderate | High |
| `lanczos` | Traditional Lanczos resampling, no AI | Fast | Moderate |
| `bicubic` | Bicubic interpolation, fastest option | Fastest | Lower |

### `denoise`
- **Type:** `boolean`
- **Required:** No
- **Default:** `true`

When `true`, applies denoising as part of the upscaling pass. Recommended for photographs scanned or captured at low quality. Set to `false` for illustrations where grain is intentional.

### `sharpen`
- **Type:** `number`
- **Required:** No
- **Range:** `0.0` – `2.0`
- **Default:** `0.5`

Post-upscale sharpening strength. `0.0` disables sharpening entirely. Values above `1.0` produce aggressive sharpening and may introduce halos on hard edges.

### `stretch`
- **Type:** `boolean`
- **Required:** No
- **Default:** `false`

When `true` and both `target_width` and `target_height` are specified, the image is stretched to exactly fill the target dimensions without preserving aspect ratio.

### `tile_size`
- **Type:** `integer`
- **Required:** No
- **Range:** `64` – `1024`
- **Default:** `512`

For AI models, the image is processed in tiles. Smaller tile sizes reduce memory usage at the cost of potential seam artifacts. Increase this value if you notice tiling artifacts in smooth gradients.

## Examples

### Double resolution of a photo

```yaml
operation: upscale
factor: 2
model: real-esrgan
denoise: true
sharpen: 0.6
```

### Upscale to 4K for print

```yaml
operation: upscale
target_width: 3840
target_height: 2160
model: real-esrgan
sharpen: 0.4
```

### Fast upscale for web preview

```yaml
operation: upscale
factor: 2
model: lanczos
sharpen: 0.3
```

### Upscale pixel art or illustration

```yaml
operation: upscale
factor: 4
model: esrgan
denoise: false
sharpen: 0.0
```

## Notes

- AI upscaling (`real-esrgan`, `esrgan`) is significantly slower than algorithmic methods and may time out for very large input images. Consider using `compress` or `resize` to reduce the input before upscaling if the source exceeds 4096×4096.
- Upscaling does not recover information that was never present. A blurry or heavily compressed source will produce a sharper-looking but still reconstructed result — not a true high-resolution image.
- When `factor` and `target_width`/`target_height` are both specified, `target_width`/`target_height` takes precedence.
- Output format inherits from the input unless overridden by a subsequent `compress` step.
