# extend

Extend an image by expanding its canvas in one or more directions, filling the new space with content that seamlessly blends with the original.

## Overview

The `extend` operation adds pixels to the edges of an image. Unlike `crop` which removes content, `extend` adds new canvas area. The new space can be filled using various strategies: solid color, mirror reflection, edge replication, or AI-powered content generation.

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `top` | number | `0` | Pixels to add to the top edge |
| `bottom` | number | `0` | Pixels to add to the bottom edge |
| `left` | number | `0` | Pixels to add to the left edge |
| `right` | number | `0` | Pixels to add to the right edge |
| `fill` | string | `'mirror'` | Fill strategy: `'mirror'`, `'edge'`, `'color'`, `'blur'`, `'ai'` |
| `color` | string | `'#000000'` | Fill color when `fill` is `'color'` |
| `blurRadius` | number | `20` | Blur radius when `fill` is `'blur'` |
| `seamless` | boolean | `true` | Attempt to blend fill with original content |

## Fill Strategies

### `mirror`
Reflects the image content at each edge. Produces natural-looking extensions for textures and landscapes.

```js
await impeccable.extend(image, {
  left: 200,
  right: 200,
  fill: 'mirror'
});
```

### `edge`
Replicates the outermost row/column of pixels outward. Best for images with solid or gradient borders.

```js
await impeccable.extend(image, {
  top: 100,
  fill: 'edge'
});
```

### `color`
Fills the extended area with a solid color.

```js
await impeccable.extend(image, {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
  fill: 'color',
  color: '#ffffff'
});
```

### `blur`
Extends using a blurred and stretched version of the edge content. Good for creating soft bokeh-style borders.

```js
await impeccable.extend(image, {
  bottom: 300,
  fill: 'blur',
  blurRadius: 40
});
```

### `ai`
Uses generative inpainting to produce contextually aware fill content. Requires an AI-capable backend.

```js
await impeccable.extend(image, {
  left: 400,
  right: 400,
  fill: 'ai',
  seamless: true
});
```

## Usage

### Basic Extension

```js
import impeccable from 'impeccable';

const result = await impeccable.extend('photo.jpg', {
  bottom: 200,
  fill: 'mirror'
});
```

### Add Letterbox Bars

```js
// Convert 16:9 to 4:3 by adding black bars on top and bottom
const result = await impeccable.extend('video-frame.jpg', {
  top: 135,
  bottom: 135,
  fill: 'color',
  color: '#000000'
});
```

### Create Social Media Banner from Square Image

```js
// Expand a 1:1 image to 16:9 for Twitter/LinkedIn
const result = await impeccable.extend('profile.jpg', {
  left: 560,
  right: 560,
  fill: 'blur',
  blurRadius: 30,
  seamless: false
});
```

### Uncrop a Portrait

```js
// Recover cropped headspace above a portrait photo
const result = await impeccable.extend('portrait.jpg', {
  top: 250,
  fill: 'ai'
});
```

## Output

Returns a processed image with dimensions increased by the specified pixel amounts. The original image content is preserved at its original position within the new canvas.

```js
{
  width: originalWidth + left + right,
  height: originalHeight + top + bottom,
  format: 'jpeg' | 'png' | 'webp',
  data: Buffer,
  meta: {
    extended: { top, bottom, left, right },
    fill: 'mirror' | 'edge' | 'color' | 'blur' | 'ai',
    seamless: boolean
  }
}
```

## Notes

- Large extensions with `fill: 'ai'` may take significantly longer to process
- The `mirror` strategy works best when extension amount is less than 50% of the original dimension
- When `seamless: true`, a feathered blend is applied at the boundary between original and extended content
- Alpha channel is preserved when extending PNG images with transparent regions
- For `fill: 'color'` with transparent fill, use `color: 'transparent'` (PNG output only)
