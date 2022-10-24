import React, { useCallback, useRef, useState } from 'react';

type PressHandlers = {
  onHold: (event: React.KeyboardEvent | React.TouchEvent) => void;
  onTap: (event: React.KeyboardEvent | React.TouchEvent) => void;
  onRelease: (event: React.KeyboardEvent | React.TouchEvent) => void;
};
type TestLongPressProps = {
  pressHandlers: PressHandlers;
  delay?: number;
};

const useTestLongPress = ({
  pressHandlers,
  delay = 300,
}: TestLongPressProps) => {
  const { onHold, onRelease, onTap } = pressHandlers;
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ') {
        if (event.type === 'keydown') {
          onTap(event);
          if (timeout.current === null) {
            timeout.current = setTimeout(() => {
              onHold(event);
            }, delay);
          }
        }
      }
    },
    [delay, onHold, onTap]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ') {
        onRelease(event);
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
      }
    },
    [onRelease]
  );

  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      event.target.addEventListener(
        'touchend',
        (e) => e.cancelable && event.preventDefault(),
        {
          passive: false,
        }
      );
      onTap(event);
      if (timeout.current === null) {
        timeout.current = setTimeout(() => {
          onHold(event);
        }, delay);
      }
    },
    [onHold, delay, onTap]
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      event.preventDefault();
      event.target.removeEventListener('touchend', (e) => e.preventDefault());
      onRelease(event);
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    },
    [onRelease]
  );

  return {
    onTouchStart: (e: React.TouchEvent) => handleTouchStart(e),
    onTouchEnd: (e: React.TouchEvent) => handleTouchEnd(e),
    onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e),
    onKeyUp: (e: React.KeyboardEvent) => handleKeyUp(e),
  };
};

export default useTestLongPress;
