import { useState, useRef, useCallback } from 'react';

interface BirthdayCakeProps {
  onCandleBlown?: () => void;
}

function BirthdayCake({ onCandleBlown }: BirthdayCakeProps) {
  // === Cake drag state ===
  const [isDragging, setIsDragging] = useState(false);
  const [cakePosition, setCakePosition] = useState({ x: 0, y: 0 });
  const cakeDragStart = useRef({ x: 0, y: 0 });
  const cakePosStart = useRef({ x: 0, y: 0 });
  const cakeRef = useRef<HTMLDivElement>(null);

  // === Candle drag state ===
  const [isCandleDragging, setIsCandleDragging] = useState(false);
  const [candlePosition, setCandlePosition] = useState({ x: 0, y: -120 });
  const candleDragStart = useRef({ x: 0, y: 0 });
  const candlePosStart = useRef({ x: 0, y: 0 });
  const candleRef = useRef<HTMLDivElement>(null);

  // === Candle flame state ===
  const [isLit, setIsLit] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  // === Instruction progress tracking ===
  const [hasDraggedCake, setHasDraggedCake] = useState(false);
  const [hasDraggedCandle, setHasDraggedCandle] = useState(false);

  // Derive current instruction text from progress
  const currentInstruction = !hasDraggedCake
    ? '✨ Drag the cake to move it around'
    : !hasDraggedCandle
    ? '🕯️ Now drag the candle onto the cake'
    : !isLit
    ? '🔥 Click the candle to light it!'
    : '💨 Click the candle to blow it out';

  // -- Cake pointer handlers --
  const handleCakePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    cakeDragStart.current = { x: e.clientX, y: e.clientY };
    cakePosStart.current = { x: cakePosition.x, y: cakePosition.y };
    setIsDragging(true);
    if (cakeRef.current) {
      cakeRef.current.setPointerCapture(e.pointerId);
    }
  }, [cakePosition]);

  const handleCakePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - cakeDragStart.current.x;
    const dy = e.clientY - cakeDragStart.current.y;
    setCakePosition({
      x: cakePosStart.current.x + dx,
      y: cakePosStart.current.y + dy,
    });
    // Mark cake as dragged on first movement
    if (!hasDraggedCake) {
      setHasDraggedCake(true);
    }
  }, [isDragging, hasDraggedCake]);

  const handleCakePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    if (cakeRef.current) {
      cakeRef.current.releasePointerCapture(e.pointerId);
    }
  }, []);

  const moveCake = useCallback((dx: number, dy: number) => {
    setCakePosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const handleCakeKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = 16;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        moveCake(-step, 0);
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveCake(step, 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveCake(0, -step);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveCake(0, step);
        break;
      default:
        break;
    }
  }, [moveCake]);

  // -- Candle pointer handlers --
  const handleCandlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    candleDragStart.current = { x: e.clientX, y: e.clientY };
    candlePosStart.current = { x: candlePosition.x, y: candlePosition.y };
    setIsCandleDragging(true);
    if (candleRef.current) {
      candleRef.current.setPointerCapture(e.pointerId);
    }
  }, [candlePosition]);

  const handleCandlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isCandleDragging) return;
    const dx = e.clientX - candleDragStart.current.x;
    const dy = e.clientY - candleDragStart.current.y;
    setCandlePosition({
      x: candlePosStart.current.x + dx,
      y: candlePosStart.current.y + dy,
    });
    // Mark candle as dragged on first movement
    if (!hasDraggedCandle) {
      setHasDraggedCandle(true);
    }
  }, [isCandleDragging, hasDraggedCandle]);

  const handleCandlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsCandleDragging(false);
    if (candleRef.current) {
      candleRef.current.releasePointerCapture(e.pointerId);
    }
  }, []);

  // -- Click candle to toggle flame --
  const handleCandleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLit(prev => {
      const newIsLit = !prev;
      // If blowing out (lit -> unlit), show smoke and navigate to next page
      if (prev && !newIsLit) {
        setShowSmoke(true);
        setTimeout(() => {
          setShowSmoke(false);
          onCandleBlown?.();
        }, 1500);
      }
      return newIsLit;
    });
  };

  // Init: candle starts unlit, no smoke on mount

  return (
    <>
      {/* ========== CAKE (draggable) ========== */}
      <div className="birthday-cake-wrapper" role="button" tabIndex={0} onKeyDown={handleCakeKeyDown}>
        <div
          ref={cakeRef}
          className={`birthday-cake ${isDragging ? 'cake-dragging' : ''}`}
          style={{
            transform: `translate(${cakePosition.x}px, ${cakePosition.y}px)`,
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'relative',
            zIndex: 100,
            touchAction: 'none',
            userSelect: 'none',
          }}
          onPointerDown={handleCakePointerDown}
          onPointerMove={handleCakePointerMove}
          onPointerUp={handleCakePointerUp}
          onPointerCancel={handleCakePointerUp}
        >
        {/* Top Tier */}
        <div className="cake-tier cake-tier-top">
          <div className="tier-icing top-icing">
            <div className="icing-drip" style={{ left: '10%', height: '100px' }} />
            <div className="icing-drip" style={{ left: '30%', height: '140px' }} />
            <div className="icing-drip" style={{ left: '55%', height: '80px' }} />
            <div className="icing-drip" style={{ left: '75%', height: '160px' }} />
            <div className="icing-drip" style={{ left: '90%', height: '110px' }} />
          </div>
          <div className="tier-sprinkles">
            <span className="sprinkle" style={{ left: '15%', top: '20%', background: '#FF6B6B', animationDelay: '0s' }} />
            <span className="sprinkle" style={{ left: '40%', top: '30%', background: '#FFD93D', animationDelay: '0.3s' }} />
            <span className="sprinkle" style={{ left: '65%', top: '15%', background: '#4D96FF', animationDelay: '0.6s' }} />
            <span className="sprinkle" style={{ left: '25%', top: '55%', background: '#FF9FFC', animationDelay: '0.9s' }} />
            <span className="sprinkle" style={{ left: '75%', top: '50%', background: '#6BCB77', animationDelay: '1.2s' }} />
            <span className="sprinkle" style={{ left: '50%', top: '40%', background: '#FF9F9F', animationDelay: '1.5s' }} />
            <span className="sprinkle" style={{ left: '10%', top: '40%', background: '#E040FB', animationDelay: '1.8s' }} />
            <span className="sprinkle" style={{ left: '85%', top: '25%', background: '#FFD93D', animationDelay: '2.1s' }} />
          </div>
          <div className="tier-border" />
        </div>

        {/* Bottom Tier */}
        <div className="cake-tier cake-tier-bottom">
          <div className="tier-icing bottom-icing">
            <div className="icing-drip" style={{ left: '8%', height: '14px' }} />
            <div className="icing-drip" style={{ left: '22%', height: '10px' }} />
            <div className="icing-drip" style={{ left: '38%', height: '18px' }} />
            <div className="icing-drip" style={{ left: '52%', height: '12px' }} />
            <div className="icing-drip" style={{ left: '68%', height: '16px' }} />
            <div className="icing-drip" style={{ left: '82%', height: '9px' }} />
            <div className="icing-drip" style={{ left: '94%', height: '13px' }} />
          </div>
          <div className="tier-sprinkles">
            <span className="sprinkle" style={{ left: '10%', top: '25%', background: '#FF9FFC', animationDelay: '0.2s' }} />
            <span className="sprinkle" style={{ left: '30%', top: '35%', background: '#FFD93D', animationDelay: '0.5s' }} />
            <span className="sprinkle" style={{ left: '50%', top: '20%', background: '#FF6B6B', animationDelay: '0.8s' }} />
            <span className="sprinkle" style={{ left: '70%', top: '40%', background: '#4D96FF', animationDelay: '1.1s' }} />
            <span className="sprinkle" style={{ left: '90%', top: '25%', background: '#6BCB77', animationDelay: '1.4s' }} />
            <span className="sprinkle" style={{ left: '20%', top: '55%', background: '#E040FB', animationDelay: '1.7s' }} />
            <span className="sprinkle" style={{ left: '45%', top: '50%', background: '#FFD93D', animationDelay: '2.0s' }} />
            <span className="sprinkle" style={{ left: '65%', top: '55%', background: '#FF9F9F', animationDelay: '2.3s' }} />
            <span className="sprinkle" style={{ left: '80%', top: '45%', background: '#FF6B6B', animationDelay: '2.6s' }} />
            <span className="sprinkle" style={{ left: '55%', top: '60%', background: '#FFD93D', animationDelay: '2.9s' }} />
          </div>
          <div className="tier-border" />
        </div>

        {/* Cake Plate/Base */}
        <div className="cake-base">
          <div className="cake-base-shine" />
        </div>

        {/* Cake drag indicator */}
        {isDragging && (
          <div className="cake-drag-hint">
            <span>📍</span>
          </div>
        )}
        </div>
      </div>

      {/* ========== CANDLE (independently draggable) ========== */}
      <div
        ref={candleRef}
        className={`floating-candle ${isCandleDragging ? 'candle-dragging' : ''} ${isLit ? 'candle-lit' : 'candle-unlit'}`}
        style={{
          cursor: isCandleDragging ? 'grabbing' : 'grab',
          position: 'fixed',
          left: `calc(50% + ${candlePosition.x}px)`,
          top: `calc(50% + ${candlePosition.y}px)`,
          zIndex: 110,
          touchAction: 'none',
          userSelect: 'none',
        }}
        onPointerDown={handleCandlePointerDown}
        onPointerMove={handleCandlePointerMove}
        onPointerUp={handleCandlePointerUp}
        onPointerCancel={handleCandlePointerUp}
        onClick={handleCandleClick}
      >
        {/* Candle body */}
        <div className="candle-body">
          <div className="candle-stripe" style={{ top: '15%' }} />
          <div className="candle-stripe" style={{ top: '40%' }} />
          <div className="candle-stripe" style={{ top: '65%' }} />
        </div>

        {/* Wick */}
        <div className="candle-wick" />

        {/* Flame (only when lit) */}
        {isLit && (
          <div className="candle-flame-container">
            <div className="candle-flame">
              <div className="flame-inner" />
              <div className="flame-glow" />
            </div>
          </div>
        )}

        {/* Smoke (when blown out - only show briefly on transition) */}
        {showSmoke && (
          <div className="candle-smoke">
            <div className="smoke-particle" style={{ animationDelay: '0s' }} />
            <div className="smoke-particle" style={{ animationDelay: '0.2s' }} />
            <div className="smoke-particle" style={{ animationDelay: '0.4s' }} />
          </div>
        )}

        {/* Click hint: show "🕯️ Light me!" when unlit, "💨 Blow out" when lit */}
        <div className={`candle-hint ${isLit ? 'hint-lit' : 'hint-unlit'}`}>
          {isLit ? '💨' : '🕯️'}
        </div>

        {/* Drag hint when dragging */}
        {isCandleDragging && (
          <div className="candle-drag-hint">
            <span>✋</span>
          </div>
        )}
      </div>

      {/* ========== GLASS INSTRUCTION BOX (dynamic next step) ========== */}
      <div className="instruction-glass-box" key={currentInstruction}>
        <div className="instruction-step">{currentInstruction}</div>
      </div>
    </>
  );
}

export default BirthdayCake;

