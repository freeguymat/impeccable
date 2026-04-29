# recolor

Change, replace, or harmonize colors in an image. Supports palette swaps, hue shifts, selective color replacement, and full color grading.

## Usage

```
recolor <image> [options]
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--target` | string | — | Color to replace (hex, rgb, or CSS name) |
| `--replacement` | string | — | Color to use as replacement |
| `--tolerance` | number | `20` | How broadly to match the target color (0–100) |
| `--hue-shift` | number | `0` | Rotate all hues by this many degrees (-180 to 180) |
| `--saturation` | number | `0` | Adjust saturation (-100 to 100) |
| `--lightness` | number | `0` | Adjust lightness (-100 to 100) |
| `--palette` | string[] | — | Restrict output to this set of colors |
| `--preserve-luminance` | boolean | `true` | Keep original luminance when replacing colors |
| `--mask` | string | — | Only recolor within the region defined by this mask image |
| `--output` | string | — | Output file path |
| `--format` | string | `png` | Output format (`png`, `jpg`, `webp`) |
| `--quality` | number | `90` | Output quality for lossy formats (1–100) |

## Examples

### Replace a specific color

Swap the red in a logo for brand blue:

```
recolor logo.png --target "#e63946" --replacement "#1d3557"
```

### Adjust hue across the whole image

Shift all colors 120 degrees around the hue wheel:

```
recolor photo.jpg --hue-shift 120
```

### Desaturate then tint

Pull saturation down and push a warm tone:

```
recolor portrait.jpg --saturation -60 --hue-shift 15 --lightness 5
```

### Restrict to a palette

Force the image into a limited 4-color palette:

```
recolor illustration.png --palette "#264653" "#2a9d8f" "#e9c46a" "#e76f51"
```

### Recolor within a mask

Only affect the sky region defined by a mask:

```
recolor landscape.jpg --target "#87ceeb" --replacement "#ff7043" --mask sky-mask.png
```

## Behavior

### Color matching

The `--target` color is matched using perceptual distance in the LAB color space. The `--tolerance` value controls how far from the target a pixel can be before it is excluded from the replacement. A tolerance of `0` matches only exact pixels; `100` matches everything.

### Preserve luminance

When `--preserve-luminance` is `true` (the default), the replacement color's hue and saturation are applied while the original pixel's luminance is kept. This prevents flat, uniform patches and maintains the natural shading of the original image.

Set `--preserve-luminance false` for a hard, flat color fill.

### Palette quantization

When `--palette` is provided, every pixel is mapped to its nearest palette color using LAB delta-E distance. This is applied after any hue/saturation/lightness adjustments, so you can combine both:

```
recolor photo.jpg --saturation -100 --palette "#000000" "#ffffff"
```

This first desaturates the image, then quantizes to pure black and white.

### Mask support

The mask image must be the same dimensions as the input. White pixels (`#ffffff`) in the mask indicate areas to recolor; black pixels are left untouched. Grayscale masks are supported — mid-gray values blend the recolored and original pixels proportionally.

## Notes

- When both `--target`/`--replacement` and `--hue-shift` are provided, the targeted replacement is applied first, then the global hue shift.
- `--palette` and `--hue-shift` can be combined but may produce unexpected results at high tolerance values.
- For logo or icon work, set `--tolerance` low (5–15) to avoid bleeding into adjacent colors.
- Output defaults to `png` to avoid compression artifacts when doing precise color work.
