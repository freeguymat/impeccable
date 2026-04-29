# watermark

Add, remove, or manage watermarks on images.

## Overview

The `watermark` operation allows you to overlay text or image-based watermarks onto your images, control their position, opacity, and scale, or detect and remove existing watermarks.

## Usage

```js
import { watermark } from 'impeccable';

const result = await watermark(image, options);
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | `string` | `undefined` | Text content for a text-based watermark |
| `image` | `string \| Buffer` | `undefined` | Image source for an image-based watermark |
| `position` | `string` | `'bottom-right'` | Placement of the watermark. See [Positions](#positions) |
| `opacity` | `number` | `0.5` | Opacity of the watermark (0.0–1.0) |
| `scale` | `number` | `0.2` | Scale of the watermark relative to the base image (0.0–1.0) |
| `padding` | `number` | `10` | Padding in pixels from the edge when using edge positions |
| `rotation` | `number` | `0` | Rotation angle in degrees |
| `font` | `string` | `'Arial'` | Font family for text watermarks |
| `fontSize` | `number` | `24` | Font size in pixels for text watermarks |
| `color` | `string` | `'#ffffff'` | Text color (hex, rgb, or named) |
| `remove` | `boolean` | `false` | Attempt to detect and remove an existing watermark |
| `tile` | `boolean` | `false` | Tile the watermark across the entire image |
| `tileSpacing` | `number` | `20` | Spacing in pixels between tiled watermarks |

## Positions

The `position` option accepts the following values:

- `'top-left'`
- `'top-center'`
- `'top-right'`
- `'center-left'`
- `'center'`
- `'center-right'`
- `'bottom-left'`
- `'bottom-center'`
- `'bottom-right'`

## Examples

### Add a text watermark

```js
const result = await watermark(image, {
  text: '© My Company 2024',
  position: 'bottom-right',
  opacity: 0.6,
  fontSize: 18,
  color: '#ffffff',
});
```

### Add an image watermark

```js
const logo = await fs.readFile('./logo.png');

const result = await watermark(image, {
  image: logo,
  position: 'center',
  opacity: 0.3,
  scale: 0.15,
});
```

### Tile a watermark across the image

```js
const result = await watermark(image, {
  text: 'CONFIDENTIAL',
  tile: true,
  tileSpacing: 40,
  rotation: -30,
  opacity: 0.15,
  color: '#ff0000',
});
```

### Remove an existing watermark

```js
const result = await watermark(image, {
  remove: true,
});
```

## Return Value

Returns a `Promise<ProcessedImage>` with the following shape:

```ts
{
  data: Buffer,         // processed image buffer
  mimeType: string,     // e.g. 'image/png'
  width: number,
  height: number,
  watermarkBounds?: {   // present when a watermark was added
    x: number,
    y: number,
    width: number,
    height: number,
  }
}
```

## Notes

- When both `text` and `image` are provided, `image` takes precedence.
- Watermark removal uses inpainting and may not be perfect on complex backgrounds.
- For best results with `remove: true`, ensure the watermark has a consistent color or pattern.
- Text watermarks are rendered with anti-aliasing enabled by default.
- The `tile` option overrides `position` and `padding` settings.
