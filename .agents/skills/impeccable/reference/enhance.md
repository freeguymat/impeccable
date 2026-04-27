# enhance

Improve image quality through AI-powered upscaling, sharpening, noise reduction, and detail enhancement.

## Usage

```
impeccable enhance [options] <input> [output]
```

## Description

The `enhance` command applies intelligent image enhancement techniques to improve overall quality. It can upscale images while preserving sharpness, reduce noise and artifacts, restore lost detail, and improve clarity in low-quality or compressed images.

Enhancement operations are non-destructive by default and can be combined to achieve the desired result.

## Options

### `--upscale <factor>`

Upscale the image by the specified factor using AI-based super-resolution.

- **Type:** `number`
- **Default:** `1` (no upscaling)
- **Allowed values:** `1.5`, `2`, `3`, `4`
- **Example:** `--upscale 2`

Uses a trained model to intelligently reconstruct high-frequency detail during upscaling, producing sharper results than traditional bicubic or lanczos interpolation.

---

### `--denoise <level>`

Reduce noise and grain in the image.

- **Type:** `number`
- **Default:** `0`
- **Range:** `0–100`
- **Example:** `--denoise 40`

Higher values apply stronger noise reduction. Values above `60` may begin to soften fine detail. Recommended range for most images: `20–50`.

---

### `--sharpen <amount>`

Apply sharpening to enhance edge clarity and fine detail.

- **Type:** `number`
- **Default:** `0`
- **Range:** `0–100`
- **Example:** `--sharpen 30`

Uses an unsharp mask approach with adaptive edge detection to avoid sharpening noise. Best used after denoising.

---

### `--deblur`

Attempt to reverse motion or focus blur.

- **Type:** `boolean`
- **Default:** `false`
- **Example:** `--deblur`

Applies a blind deconvolution pass to estimate and correct blur kernels. Works best on mild to moderate blur. Heavy blur may produce ringing artifacts.

---

### `--restore`

Enable artifact removal and detail restoration for heavily compressed or degraded images.

- **Type:** `boolean`
- **Default:** `false`
- **Example:** `--restore`

Targets JPEG compression artifacts, banding, and color bleed. Particularly useful for images that have been re-compressed multiple times.

---

### `--face-enhance`

Apply face-specific enhancement to detected faces in the image.

- **Type:** `boolean`
- **Default:** `false`
- **Example:** `--face-enhance`

Detects faces and applies targeted skin smoothing, eye sharpening, and feature restoration. Leaves non-face regions unaffected.

---

### `--model <name>`

Select the enhancement model to use for upscaling and restoration.

- **Type:** `string`
- **Default:** `"balanced"`
- **Allowed values:** `"fast"`, `"balanced"`, `"quality"`, `"photo"`, `"illustration"`
- **Example:** `--model photo`

| Model | Speed | Quality | Best for |
|---|---|---|---|
| `fast` | ★★★★★ | ★★☆☆☆ | Previews, batch jobs |
| `balanced` | ★★★☆☆ | ★★★★☆ | General purpose |
| `quality` | ★★☆☆☆ | ★★★★★ | Final output |
| `photo` | ★★★☆☆ | ★★★★★ | Photographic content |
| `illustration` | ★★★☆☆ | ★★★★★ | Artwork, graphics, anime |

---

### `--output-format <format>`

Specify the output file format.

- **Type:** `string`
- **Default:** Matches input format
- **Allowed values:** `"jpg"`, `"png"`, `"webp"`, `"tiff"`
- **Example:** `--output-format png`

---

### `--quality <value>`

Set output quality for lossy formats (jpg, webp).

- **Type:** `number`
- **Default:** `90`
- **Range:** `1–100`
- **Example:** `--quality 95`

## Examples

### Basic 2x upscale

```bash
impeccable enhance --upscale 2 photo.jpg photo-2x.jpg
```

### Restore a compressed image

```bash
impeccable enhance --restore --denoise 35 --sharpen 20 compressed.jpg restored.jpg
```

### High-quality photo enhancement

```bash
impeccable enhance \
  --upscale 4 \
  --model photo \
  --denoise 25 \
  --sharpen 15 \
  --face-enhance \
  --output-format png \
  portrait.jpg portrait-enhanced.png
```

### Fast batch upscale

```bash
impeccable enhance --upscale 2 --model fast --quality 85 *.jpg
```

## Notes

- Enhancement operations are applied in a fixed pipeline order: restore → denoise → deblur → upscale → sharpen → face-enhance
- `--upscale` with `--model quality` can be slow on large images; consider using `--model balanced` for images larger than 4MP
- When `--face-enhance` is enabled, face detection runs before the main pipeline to preserve facial landmarks
- Output dimensions after `--upscale 2` on a 1000×800 image will be 2000×1600
- TIFF output preserves 16-bit depth when the source image supports it
