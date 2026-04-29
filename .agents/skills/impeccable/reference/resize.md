# resize

Resize an image to specific dimensions while offering control over scaling behavior, aspect ratio handling, and resampling quality.

## Usage

```
impeccable resize <input> [options]
```

## Options

| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--width` | `-w` | number | — | Target width in pixels |
| `--height` | `-h` | number | — | Target height in pixels |
| `--fit` | `-f` | string | `contain` | Fit mode: `contain`, `cover`, `fill`, `inside`, `outside` |
| `--position` | `-p` | string | `center` | Anchor point when cropping with `cover`: `center`, `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `--kernel` | `-k` | string | `lanczos3` | Resampling kernel: `nearest`, `cubic`, `mitchell`, `lanczos2`, `lanczos3` |
| `--no-enlarge` | | boolean | `false` | Do not enlarge image if smaller than target dimensions |
| `--background` | `-b` | string | `#00000000` | Background fill color (hex or CSS color) used when padding is needed |
| `--output` | `-o` | string | — | Output file path (defaults to `<input>-resized.<ext>`) |
| `--format` | | string | — | Output format override: `jpeg`, `png`, `webp`, `avif` |
| `--quality` | `-q` | number | `85` | Output quality for lossy formats (1–100) |

## Fit Modes

### `contain` (default)
Scales the image to fit within the target dimensions, preserving aspect ratio. Adds padding (filled with `--background`) if the aspect ratios differ.

```
impeccable resize photo.jpg -w 800 -h 600 --fit contain --background "#ffffff"
```

### `cover`
Scales and crops the image to exactly fill the target dimensions. Use `--position` to control which part of the image is kept.

```
impeccable resize photo.jpg -w 800 -h 600 --fit cover --position top
```

### `fill`
Stretches the image to exactly match the target dimensions, ignoring aspect ratio.

```
impeccable resize photo.jpg -w 800 -h 600 --fit fill
```

### `inside`
Scales the image down so it fits inside the target box. Never upscales. Equivalent to `contain` + `--no-enlarge`.

```
impeccable resize photo.jpg -w 1920 -h 1080 --fit inside
```

### `outside`
Scales the image so it covers the target box without cropping. May exceed one dimension.

```
impeccable resize photo.jpg -w 800 -h 600 --fit outside
```

## Examples

### Resize to fixed width, maintain aspect ratio
```
impeccable resize banner.png -w 1200
```

### Create a thumbnail with exact dimensions
```
impeccable resize product.jpg -w 300 -h 300 --fit cover --position center -o thumb.jpg
```

### Resize for web with quality control
```
impeccable resize hero.jpg -w 1920 --format webp --quality 80 -o hero.webp
```

### Batch resize without upscaling
```
impeccable resize *.jpg -w 2048 --fit inside --no-enlarge
```

### High-quality downscale with Lanczos
```
impeccable resize scan.tiff -w 600 --kernel lanczos3 -o scan-web.jpg
```

## Notes

- If only `--width` or `--height` is provided (not both), the missing dimension is calculated automatically to preserve aspect ratio.
- `--no-enlarge` prevents quality loss from upscaling; the output will be at most the original size.
- For the sharpest results when downscaling significantly (e.g., >50% reduction), `lanczos3` is recommended. Use `nearest` only for pixel art or icons where aliasing is intentional.
- When outputting to JPEG, fully transparent pixels in the background are composited over `--background` (default white `#ffffff` for JPEG since transparency is unsupported).
- Metadata (EXIF, ICC profiles) is preserved by default. Use `impeccable compress` with `--strip-metadata` to remove it.

## Related Commands

- [`crop`](./crop.md) — Crop to a specific region without scaling
- [`compress`](./compress.md) — Reduce file size after resizing
- [`enhance`](./enhance.md) — Sharpen or improve quality after downscaling
- [`extend`](./extend.md) — Add padding/canvas around an image
