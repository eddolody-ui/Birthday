# TODO: Make StickerBox Responsive

## Information Gathered
- The StickerBox component is currently used/rendered in `BirthdayCake.tsx` (inline, not using the `StickerBox` component import — it renders its own `.sticker-box` structure directly).
- There IS a `StickerBox.tsx` component file, but `BirthdayCake.tsx` renders the sticker box inline instead of using it.
- The sticker box CSS (`.sticker-box`) has **hardcoded absolute positioning**: `left: 100px; bottom: 400px; top: 50%; transform: translateY(-50%);`
- The `.sticker-box-image-wrapper` has **hardcoded fixed dimensions**: `width: 386px; height: 386px;`
- The `.sticker-box-image` uses `object-fit: contain` with `width: 100%; height: 100%;`
- The layout needs to adapt to different screen sizes (mobile, tablet, desktop).

## Plan

### Step 1: Fix `BirthdayCake.tsx` — Refactor to use the `StickerBox` component
- Replace the inline sticker box markup in `BirthdayCake.tsx` with the `<StickerBox>` component.
- Pass `stickerConfig.src` and `stickerConfig.label` as props.

### Step 2: Update `StickerBox.tsx` — Add responsive props/class
- Add a `className` prop to `StickerBoxProps` (optional) for additional customization.
- Add a `key` prop passthrough if needed (already handled via React key on the wrapping div).

### Step 3: Update CSS (`.sticker-box`) — Make it fully responsive
- Replace hardcoded `left: 100px; bottom: 400px; top: 50%;` with responsive positioning.
- Replace hardcoded `width: 386px; height: 386px;` on `.sticker-box-image-wrapper` with responsive values using `clamp()` / media queries.
- Ensure the sticker box repositions on smaller screens (e.g., mobile: center or bottom-center instead of left side).
- Add media queries for tablets and phones.

### Step 4: Test build
- Run `npm run build` to verify no errors.

---

## Dependent Files to Edit
1. `src/StickerBox.tsx` — Add className prop
2. `src/BirthdayCake.tsx` — Use StickerBox component instead of inline markup
3. `src/styles.css` — Make .sticker-box and children responsive

## Follow-up Steps
- Run `npm run build` to verify no errors.
- Review visual layout at different screen sizes.

