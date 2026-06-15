# React Mascot Pattern

Use a client component with these independent state values:

- `position`: horizontal offset in pixels
- `direction`: direction to use on the next walk
- `facingDirection`: direction displayed during the active walk
- `frameIndex`: current walk frame
- `isWalking`: prevents overlapping animations

On click:

1. Return early when already walking.
2. Call the parent action callback once.
3. Calculate the maximum horizontal offset from `window.innerWidth`.
4. Move by a fixed distance and clamp at viewport edges.
5. Store the current walking direction in `facingDirection`.
6. Cycle walk frames with an interval.
7. After the movement duration, stop the interval, return to idle, and store the next direction.

Use a fixed-position button and apply horizontal movement to the button:

```tsx
style={{
  transform: `translateX(${position}px)`,
  transitionDuration: isWalking ? `${walkDuration}ms` : "200ms",
}}
```

Flip only the image:

```tsx
style={{ transform: `scaleX(${facingDirection})` }}
```

Do not flip the button itself because that also flips focus rings and other UI effects.
