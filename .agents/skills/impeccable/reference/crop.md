# crop

Smart image cropping with focus point detection and aspect ratio control.

## Overview

The `crop` operation intelligently trims images to a specified region or aspect ratio. It supports automatic focus detection to preserve the most important parts of an image, manual focus point specification, and various anchor positions for predictable cropping behavior.

## Usage

```js
impeccable(input)
  .crop(options)
  .toFile(output);
```

## Options

### `width` *(number)*

The target width in pixels for the cropped output. If only `width` is specified without `height`, the crop will use the full image height unless `ratio` is also set.

```js
.crop({ width: 800 })
```

---

### `height` *(number)*

The target height in pixels for the cropped output. If only `height` is specified without `width`, the crop will use the full image width unless `ratio` is also set.

```js
.crop({ height: 600 })
```

---

### `ratio` *(string | number)*

Define a target aspect ratio instead of explicit dimensions. Accepts a string like `"16:9"` or `"4:3"`, or a numeric value like `1.777`.

When combined with `width` or `height`, the missing dimension is calculated from the ratio.

```js
// String ratio
.crop({ width: 1200, ratio: '16:9' })

// Numeric ratio (width / height)
.crop({ height: 400, ratio: 1.5 })
```

---

### `anchor` *(string)*

Specifies where to anchor the crop when no focus detection is used. Accepts compass directions and center.

**Accepted values:**
- `"center"` *(default)*
- `"top"`, `"bottom"`, `"left"`, `"right"`
- `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`

```js
.crop({ width: 400, height: 400, anchor: 'top' })
```

---

### `focus` *(object | string)*

Defines the focus point for the crop. The cropping algorithm will attempt to keep this point visible and as centered as possible within the output dimensions.

**Object form** — explicit pixel coordinates:

```js
.crop({
  width: 500,
  height: 500,
  focus: { x: 320, y: 180 }
})
```

**String form** — named region:

```js
// Same values as `anchor`
.crop({ width: 500, height: 500, focus: 'top-right' })
```

---

### `smart` *(boolean)*

Enables automatic focus detection using edge and saliency analysis. When `true`, the operation analyzes the image to find the most visually significant region and crops around it.

Defaults to `false`. Ignored if `focus` is explicitly set.

```js
.crop({ width: 600, height: 400, smart: true })
```

> **Note:** Smart cropping increases processing time. For batch operations on large images, consider pre-computing focus points and passing them explicitly via `focus`.

---

### `padding` *(number | object)*

Adds minimum padding (in pixels) around the detected or specified focus point. Ensures the focus area is never cropped too tightly.

```js
// Uniform padding
.crop({ width: 400, height: 400, smart: true, padding: 20 })

// Per-side padding
.crop({
  width: 400,
  height: 400,
  focus: { x: 200, y: 150 },
  padding: { top: 10, right: 20, bottom: 10, left: 20 }
})
```

---

### `upscale` *(boolean)*

When `true`, allows the image to be upscaled if the requested crop dimensions exceed the source image size. Defaults to `false`, which clamps output to source dimensions.

```js
.crop({ width: 2000, height: 2000, upscale: false })
```

---

## Examples

### Square thumbnail with smart focus

```js
impeccable('./photo.jpg')
  .crop({ width: 300, height: 300, smart: true })
  .toFile('./thumb.jpg');
```

### Widescreen banner anchored to top

```js
impeccable('./hero.png')
  .crop({ width: 1920, ratio: '21:9', anchor: 'top' })
  .toFile('./banner.png');
```

### Crop around a known subject position

```js
impeccable('./portrait.jpg')
  .crop({
    width: 400,
    height: 600,
    focus: { x: 512, y: 210 },
    padding: 30
  })
  .toFile('./portrait-crop.jpg');
```

### Chain with other operations

```js
impeccable('./input.jpg')
  .crop({ width: 800, height: 600, smart: true })
  .compress({ quality: 80 })
  .toFile('./output.jpg');
```

---

## Notes

- When both `anchor` and `focus` are provided, `focus` takes precedence.
- `ratio` strings must follow the format `"W:H"` with integer values (e.g., `"16:9"`, `"4:3"`, `"1:1"`).
- Crops that would result in zero or negative dimensions throw a validation error before processing begins.
- The `smart` mode requires the optional `@impeccable/smart-crop` peer dependency.
