---
name: create-interactive-web-mascot
description: Design, prepare, and implement an interactive animated 2D mascot for a web application. Use when Codex needs to create a mascot sprite sheet, remove a chroma-key background, split animation frames, keep a mascot fixed near the bottom of a page, animate walking on click, flip the character with movement direction, or connect mascot clicks to an application action.
---

# Create Interactive Web Mascot

Build the mascot as an asset pipeline plus a small isolated UI component.

## Workflow

1. Inspect the app's visual language, framework, asset conventions, and interaction goal.
2. Use the `imagegen` skill to generate one consistent sprite sheet.
3. Prompt for a flat chroma-key background and a regular grid. Include:
   - consistent identity, scale, baseline, palette, and camera angle
   - idle/reaction frames in the top row
   - a directional four-frame walk cycle in the bottom row
   - no shadows, reflections, labels, text, or watermark
4. Copy the generated source image into the project before processing it.
5. Run `scripts/prepare_sprite_sheet.mjs` with the repository's JavaScript runtime.
6. Inspect the transparent sheet and at least one individual walking frame.
7. Implement the mascot as a dedicated interactive component.
8. Validate keyboard accessibility, viewport bounds, timer cleanup, direction changes, and the connected app action.
9. Run the repository's lint, typecheck, and relevant browser verification.

## Asset Preparation

Run with Bun when `sharp` is available through the project:

```bash
bun .agents/skills/create-interactive-web-mascot/scripts/prepare_sprite_sheet.mjs \
  --input public/mascot/mascot-source.png \
  --output public/mascot/mascot-sprite.png \
  --frames-dir public/mascot/frames \
  --columns 4 \
  --rows 2 \
  --names idle-1,idle-2,cheer,press,walk-1,walk-2,walk-3,walk-4
```

The script removes a green chroma key, writes an alpha PNG, and splits it into equal cells. Use another image-processing path only when the generated subject conflicts with the key color or requires native transparency.

## Implementation Rules

- Use a semantic `button` when the mascot is clickable.
- Keep animation state and timers inside the mascot component.
- Clear intervals and timeouts on cleanup.
- Ignore clicks while already walking unless queued movement is explicitly requested.
- Compute the maximum position from viewport width, mascot size, and edge padding.
- Track walking direction separately from the next direction. Flip the image with `scaleX(-1)` only while moving left.
- Keep the mascot fixed near the viewport bottom and above ordinary content.
- Avoid hover motion unless requested; retain a visible keyboard focus indicator.
- Call the parent-provided callback from the click handler so the mascot can trigger an app action without owning app state.

Read [references/react-pattern.md](references/react-pattern.md) when implementing the interactive React component.

## Validation

- Verify source and processed image dimensions.
- Verify the processed PNG has alpha.
- Verify all frame files exist and share dimensions.
- Click repeatedly and confirm movement remains bounded.
- Confirm the image faces the actual movement direction.
- Confirm the mascot returns to idle after walking.
- Confirm the connected application action fires exactly once per accepted click.
