import {
  useInteractions,
  useHover,
  useRole,
  useFloating,
  offset,
  FloatingPortal,
  Placement,
  useFocus,
  useDismiss,
  useClick,
} from '@floating-ui/react-dom-interactions';
import React, { useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: Placement;
  delay?: number;
};

const AppTooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, delay = 300, placement = 'top' }, ref) => {
    const [open, setOpen] = useState(false);
    const { x, y, context, reference, floating, strategy } = useFloating({
      open,
      onOpenChange: setOpen,
      placement,
      middleware: [offset(5)],
    });
    const { getFloatingProps, getReferenceProps } = useInteractions([
      useClick(context),
      useHover(context, {
        delay,
        restMs: 500,
      }),
      useFocus(context),
      useRole(context, { role: 'tooltip' }),
      useDismiss(context),
    ]);
    const mergedRef = React.useMemo(() => mergeRefs([ref, floating]), [floating, ref]);
    const childMergedRef = React.useMemo(() => mergeRefs([ref, reference]), [reference, ref]);

    return (
      <>
        {typeof children === 'string' ? (
          <span
            {...getReferenceProps({
              ref: childMergedRef,
            })}
          >
            {children}
          </span>
        ) : (
          React.cloneElement(children, {
            ...getReferenceProps({
              ...children?.props,
              ref: childMergedRef,
            }),
          })
        )}
        <FloatingPortal>
          {/* Add transition  */}
          {open && (
            <div
              {...getFloatingProps({
                ref: mergedRef,
                className: 'text-xs bg-white text-black border shadow-md py-1 px-3 z-20 rounded-md',
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content',
                },
              })}
            >
              {content}
            </div>
          )}
        </FloatingPortal>
      </>
    );
  },
);

AppTooltip.displayName = 'Tooltip';
export default AppTooltip;
