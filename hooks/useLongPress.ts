import React, { useCallback, useRef, useState } from 'react';

function preventDefault(e: Event) {
  if (!isTouchEvent(e)) return;

  if (e.touches.length < 2 && e.preventDefault) {
    e.preventDefault();
  }
}

export function isTouchEvent(e: Event): e is TouchEvent {
  return e && 'touches' in e;
}

interface PressHandlers<T> {
  onLongPress: (
    e: React.MouseEvent<T> | React.TouchEvent<T> | React.KeyboardEvent<T>
  ) => void;
  onClick?: (
    e: React.MouseEvent<T> | React.TouchEvent<T> | React.KeyboardEvent<T>
  ) => void;
  onUp?: (e: React.KeyboardEvent<T>) => void;
}

interface Options {
  delay?: number;
  shouldPreventDefault?: boolean;
  key?: string;
}

export default function useLongPress<T>(
  { onLongPress, onClick, onUp }: PressHandlers<T>,
  { delay = 500, shouldPreventDefault = true, key = ' ' }: Options = {}
) {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const [shouldHandleKeydown, setShouldHandleKeydown] = useState(true);
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (e: React.MouseEvent<T> | React.TouchEvent<T> | React.KeyboardEvent<T>) => {
      if (
        (e as React.KeyboardEvent<T>).key === key ||
        (e as React.MouseEvent<T>).button === 0
      ) {
        const clonedEvent = { ...e };
        if (e.type === 'keydown') {
          if (!shouldHandleKeydown) return;
          setShouldHandleKeydown(false);
        }
        if (shouldPreventDefault && e.target) {
          console.log('if');
          e.target.addEventListener('touchend', preventDefault, {
            passive: false,
          });
          target.current = e.target;
        }
        console.log('start');
        timeout.current = setTimeout(() => {
          onLongPress(clonedEvent);
          setLongPressTriggered(true);
        }, delay);
      }
    },
    [onLongPress, delay, shouldPreventDefault, shouldHandleKeydown, key]
  );

  const clear = useCallback(
    (
      e: React.MouseEvent<T> | React.TouchEvent<T> | React.KeyboardEvent<T>,
      shouldTriggerClick = true
    ) => {
      if (
        (e as React.KeyboardEvent<T>).key === key ||
        // button 0 = Left click
        (e as React.MouseEvent<T>).button === 0
      ) {
        if (e.type === 'keyup' || e.type === 'mouseup') {
          setShouldHandleKeydown(true);
          onUp?.({ ...e } as React.KeyboardEvent<T>);
        }
        timeout.current && clearTimeout(timeout.current);
        shouldTriggerClick && !longPressTriggered && onClick?.(e);
        setLongPressTriggered(false);
        if (shouldPreventDefault && target.current) {
          target.current.removeEventListener('touchend', preventDefault);
        }
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered, onUp, key]
  );

  return {
    onMouseDown: (e: React.MouseEvent<T>) => start(e),
    onTouchStart: (e: React.TouchEvent<T>) => start(e),
    onMouseUp: (e: React.MouseEvent<T>) => clear(e),
    onMouseLeave: (e: React.MouseEvent<T>) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent<T>) => clear(e),
    onKeyDown: (e: React.KeyboardEvent<T>) => start(e),
    onKeyUp: (e: React.KeyboardEvent<T>) => clear(e),
  };
}
