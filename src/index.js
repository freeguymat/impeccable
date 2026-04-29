/**
 * impeccable - AI-powered image processing toolkit
 * Main entry point and public API
 */

'use strict';

const adapt = require('./operations/adapt');
const animate = require('./operations/animate');
const audit = require('./operations/audit');
const bolder = require('./operations/bolder');
const brand = require('./operations/brand');
const clarify = require('./operations/clarify');
const compress = require('./operations/compress');
const crop = require('./operations/crop');
const enhance = require('./operations/enhance');
const extend = require('./operations/extend');
const recolor = require('./operations/recolor');
const resize = require('./operations/resize');
const remove = require('./operations/remove');
const upscale = require('./operations/upscale');
const watermark = require('./operations/watermark');

const { createPipeline } = require('./pipeline');
const { loadImage, saveImage } = require('./io');

/**
 * Create an impeccable image processing instance.
 *
 * @param {string|Buffer} input - File path or image buffer
 * @param {object} [options] - Global options (e.g. provider, apiKey)
 * @returns {Pipeline} Chainable pipeline object
 *
 * @example
 * const result = await impeccable('./photo.jpg')
 *   .resize({ width: 800 })
 *   .enhance({ sharpness: 1.2 })
 *   .compress({ quality: 80 })
 *   .toBuffer();
 */
function impeccable(input, options = {}) {
  const pipeline = createPipeline(input, options);
  return pipeline;
}

// Attach all operations as static helpers for one-shot usage
impeccable.adapt = adapt;
impeccable.animate = animate;
impeccable.audit = audit;
impeccable.bolder = bolder;
impeccable.brand = brand;
impeccable.clarify = clarify;
impeccable.compress = compress;
impeccable.crop = crop;
impeccable.enhance = enhance;
impeccable.extend = extend;
impeccable.recolor = recolor;
impeccable.resize = resize;
impeccable.remove = remove;
impeccable.upscale = upscale;
impeccable.watermark = watermark;

// IO helpers exposed for convenience
impeccable.loadImage = loadImage;
impeccable.saveImage = saveImage;

/**
 * Configure global defaults (e.g. default AI provider, API keys).
 *
 * @param {object} config
 * @param {string} [config.provider] - AI provider: 'openai' | 'stability' | 'replicate'
 * @param {string} [config.apiKey]   - API key for the chosen provider
 * @param {number} [config.timeout]  - Request timeout in ms (default: 30000)
 */
impeccable.configure = function configure(config = {}) {
  const defaults = require('./defaults');
  Object.assign(defaults, config);
};

// Personal defaults - I mostly use replicate and need a longer timeout for upscaling
impeccable.configure({
  provider: 'replicate',
  timeout: 60000,
});

module.exports = impeccable;
