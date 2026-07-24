# TODO - Interactive Birthday Cake with Movable Candle

## Steps

- [x] Read and understand the existing codebase
- [x] **Step 1**: Refactor `BirthdayCake.tsx`
  - [x] Analyze current structure
  - [x] Make candle independently draggable (separate position state)
  - [x] Change `isBlown` → `isLit` (starts false)
  - [x] Click candle body → light it (isLit = true)
  - [x] Click lit candle → blow it out (isLit = false)
  - [x] Add "click to light" hint when unlit (🕯️)
  - [x] Add "click to blow" hint when lit (💨)
  - [x] Add visual glow/ring around candle when unlit to indicate it's clickable
- [x] **Step 2**: Update `styles.css`
  - [x] Add floating detached candle styles
  - [x] Add click-to-light hint animation
  - [x] Ensure both cake and candle can be dragged independently
- [x] **Step 3**: Dynamic instruction text box
  - [x] Add `hasDraggedCake` and `hasDraggedCandle` tracking states
  - [x] Derive `currentInstruction` text dynamically from progress
  - [x] Track cake drag on first `pointerMove`
  - [x] Track candle drag on first `pointerMove`
  - [x] Replace 4 static instruction divs with 1 dynamic one
  - [x] Add `key={currentInstruction}` for re-render animation
  - [x] Add CSS `instructionTextChange` animation
  - [x] Update CSS for single-line instruction box
- [x] **Step 4**: Verify the build compiles successfully (vite build successful)
- [x] **Step 5**: Navigate to next page when candle is blown out
  - [x] Add `onCandleBlown` callback prop to `BirthdayCake` component
  - [x] Call `onCandleBlown` in `handleCandleClick` when transitioning from lit→unlit (after smoke animation)
  - [x] Add `'celebration'` page state to `App.tsx` page type union
  - [x] Add `handleCandleBlown` handler → sets page to 'celebration' with fade-out
  - [x] Pass `onCandleBlown={handleCandleBlown}` to `BirthdayCake` in revealed page
  - [x] Create `CelebrationPage.tsx` with festive congratulatory message, floating emojis, and burst particles
  - [x] Add `CelebrationPage` CSS styles to `styles.css`
  - [x] Render `CelebrationPage` when page === 'celebration'
- [x] **Step 6**: Add stickers for each instruction in birthday cake
  - [x] Define `instructionSteps` array with emoji + label for all 4 steps
  - [x] Derive `activeStepIndex` from progress state
  - [x] Replace single instruction glass box with 4 sticker badges
  - [x] Stickers show completed (checkmark ✓, green), active (glowing, scaled up), upcoming (dimmed) states
  - [x] Add connector lines between stickers
  - [x] Add sticker CSS with glass-morphism background, animated glow for active step
  - [x] Verify build compiles successfully (vite build successful - 38 modules, no errors)

