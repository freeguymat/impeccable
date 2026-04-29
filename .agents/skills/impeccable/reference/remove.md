# remove

Remove objects, backgrounds, or unwanted elements from images using AI-powered inpainting and segmentation.

## Overview

The `remove` operation uses generative AI to intelligently erase elements from images and fill the resulting space with contextually appropriate content. It supports object removal, background removal, and selective region clearing.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `prompt` | string | No | — | Text description of what to remove (e.g. "the red car", "all people") |
| `mask` | string/Buffer | No | — | Binary mask image indicating regions to remove (white = remove) |
| `bbox` | number[] | No | — | Bounding box `[x, y, width, height]` defining region to remove |
| `background` | boolean | No | `false` | When `true`, removes the background and returns a transparent PNG |
| `fill` | string | No | `"inpaint"` | Fill strategy: `"inpaint"`, `"transparent"`, `"blur"`, `"color"` |
| `fillColor` | string | No | `"#ffffff"` | Hex color used when `fill` is `"color"` |
| `feather` | number | No | `4` | Edge feathering radius in pixels for smooth blending |
| `model` | string | No | `"default"` | Inpainting model to use: `"default"`, `"fast"`, `"quality"` |

## Usage

### Basic Object Removal

Remove an element described in natural language:

```javascript
const result = await impeccable.remove(imageBuffer, {
  prompt: "the stop sign in the background"
});
```

### Background Removal

Strip the background to produce a transparent image:

```javascript
const result = await impeccable.remove(imageBuffer, {
  background: true
});
// Returns PNG with alpha channel
```

### Mask-Based Removal

Provide a custom mask for precise control:

```javascript
const mask = await sharp('mask.png').toBuffer();

const result = await impeccable.remove(imageBuffer, {
  mask,
  fill: 'inpaint',
  feather: 8
});
```

### Bounding Box Removal

Remove content within a rectangular region:

```javascript
const result = await impeccable.remove(imageBuffer, {
  bbox: [120, 80, 200, 150], // x, y, width, height
  fill: 'inpaint'
});
```

### Fill with Solid Color

Replace removed area with a flat color instead of inpainting:

```javascript
const result = await impeccable.remove(imageBuffer, {
  prompt: "watermark text",
  fill: 'color',
  fillColor: '#f0f0f0'
});
```

## Fill Strategies

| Strategy | Description |
|----------|-------------|
| `inpaint` | AI-generated fill that matches surrounding context (default) |
| `transparent` | Leaves removed area transparent (PNG output only) |
| `blur` | Fills with a blurred version of surrounding pixels |
| `color` | Fills with a solid color specified by `fillColor` |

## Output

Returns a `Buffer` containing the processed image.

- When `fill: 'transparent'` or `background: true`, output is always **PNG** to preserve alpha.
- All other fill modes preserve the original format unless overridden.

## Examples

### Remove Tourists from a Landmark Photo

```javascript
const clean = await impeccable.remove(photo, {
  prompt: "people and tourists",
  model: 'quality',
  feather: 6
});
```

### Product Photo Background Removal

```javascript
const transparent = await impeccable.remove(productImage, {
  background: true
});

// Composite onto white background
const onWhite = await sharp({
  create: { width: 800, height: 800, channels: 4, background: 'white' }
})
  .composite([{ input: transparent }])
  .png()
  .toBuffer();
```

### Batch Watermark Removal

```javascript
const images = await Promise.all(
  files.map(file =>
    impeccable.remove(file, {
      prompt: "watermark",
      fill: 'inpaint',
      model: 'fast'
    })
  )
);
```

## Notes

- At least one of `prompt`, `mask`, `bbox`, or `background: true` must be provided.
- `prompt` and `mask` can be combined — the prompt guides inpainting style while the mask defines the region.
- Large removal areas may produce less coherent inpainting results; consider using `model: 'quality'` for best results.
- `feather` is ignored when `fill` is `'transparent'` or `'color'`.
- Processing time scales with image resolution and the chosen `model`.
