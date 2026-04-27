# compress

Reduce the length of text while preserving its core meaning, tone, and essential information.

## Overview

The `compress` skill condenses verbose or lengthy content into a more concise form. Unlike `clarify` (which improves clarity without necessarily shortening), `compress` explicitly targets length reduction while maintaining fidelity to the original message.

Use this when content is too long for its context — emails that ramble, documentation that over-explains, or copy that loses readers before the point.

## Usage

```
compress [target] [--ratio <percent>] [--preserve <elements>] [--style <style>]
```

### Arguments

| Argument | Description |
|---|---|
| `target` | The text, file, or content block to compress |

### Options

| Option | Default | Description |
|---|---|---|
| `--ratio` | `50` | Target compression ratio as percentage of original length (e.g. `50` = half the original) |
| `--preserve` | `meaning` | What to protect during compression: `meaning`, `tone`, `examples`, `structure`, `all` |
| `--style` | `neutral` | Output style: `neutral`, `formal`, `casual`, `technical` |
| `--format` | `prose` | Output format: `prose`, `bullets`, `summary` |

## Examples

### Basic compression

**Input:**
```
compress "In order to be able to successfully complete the onboarding process 
for new users who are joining our platform for the first time, it is absolutely 
necessary that we ensure that all of the required fields in the registration 
form have been properly filled out and validated before allowing the user to 
proceed to the next step in the process."
```

**Output:**
```
To complete onboarding, ensure all required registration fields are validated 
before the user proceeds.
```

---

### Compress to bullets

**Input:**
```
compress [long-meeting-notes.txt] --format bullets --preserve structure
```

**Output:**
```
• Q3 targets missed by 12% due to supply delays
• Engineering shipped auth rewrite ahead of schedule
• Next sprint: focus on mobile performance and onboarding funnel
• Action: Sarah to follow up with vendors by Friday
```

---

### Aggressive compression with ratio

**Input:**
```
compress [product-brief.md] --ratio 25 --preserve meaning
```

Reduces a 2,000 word brief to ~500 words, keeping the core argument intact.

---

### Preserve tone during compression

**Input:**
```
compress "We really, truly appreciate every single one of our customers and 
want you to know that your feedback — every piece of it — genuinely matters 
to us and shapes everything we do here." --preserve tone
```

**Output:**
```
We deeply appreciate our customers — your feedback shapes everything we do.
```

---

## Compression strategies

The skill applies these techniques in order of preference:

1. **Remove redundancy** — eliminate repeated ideas, filler phrases, and circular reasoning
2. **Collapse qualifiers** — trim excessive hedging (`"in order to be able to"` → `"to"`)
3. **Merge related sentences** — combine ideas that belong together
4. **Promote specificity** — replace vague descriptions with precise language
5. **Cut throat-clearing** — remove preamble that delays the actual point

## Preserve modes

### `meaning` (default)
Protects the factual and logical content. May adjust tone, structure, and examples freely.

### `tone`
Maintains the emotional register and voice of the original. Useful for marketing copy or personal communications.

### `examples`
Keeps concrete examples and illustrations even when compressing surrounding explanation.

### `structure`
Maintains heading hierarchy and section organization. Compresses within sections rather than reorganizing.

### `all`
Protects meaning, tone, examples, and structure simultaneously. Produces the most conservative compression.

## Relationship to other skills

- **`clarify`** — improves readability without targeting length; use before `compress` if the original is confusing
- **`adapt`** — changes content for a different audience; can be combined with `compress` for audience-appropriate brevity
- **`audit`** — identifies verbosity and redundancy; useful as a diagnostic before compressing

## Notes

- Compression below 20% of original length risks losing important nuance; the skill will warn when approaching this threshold
- Technical content with precise terminology compresses less aggressively to avoid ambiguity
- When `--ratio` conflicts with `--preserve all`, preservation takes priority
