'use client';

import { useEffect, useRef, useState } from 'react';
import { getClientX } from '../tools/tools';
import clsx from 'clsx';

export default function Slider({ className, width = 100, height = 5, min = 0, max = 100, value = 0, onSlide, onStop, disabled = false }) {
  const [fillWidth, setFillWidth] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef(null);

  const finiteFillWidth = Number.isFinite(fillWidth) ? fillWidth : 0;

  const mousePosition = {
    precise: function (e) {
      if (!ref.current) return 0;
      const { left, width: elementWidth } = ref.current.getBoundingClientRect();
      return Math.max(min, Math.min(getClientX(e) - left, elementWidth));
    },
    approximate: function (e) {
      if (!ref.current) return 0;
      const { width: elementWidth } = ref.current.getBoundingClientRect();
      return Math.max(min, Math.min(max, Math.ceil((this.precise(e) / elementWidth) * (max - min)) + min));
    },
  };

  useEffect(() => {
    if (!isDragging) setFillWidth(calculateWidth(value));
  }, [value]);

  function calculateWidth(time) {
    const { width: elementWidth } = ref.current.getBoundingClientRect();
    return (elementWidth / max) * time;
  }

  useEffect(() => {
    function onMouseDown(e) {
      e.stopPropagation();
      setFillWidth(mousePosition.precise(e));
      setIsDragging(true);
      if (e.type == 'mousedown') {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
      if (e.type == 'touchstart') {
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchend', onMouseUp);
      }
    }

    function onMouseMove(e) {
      e.stopPropagation();
      setFillWidth(mousePosition.precise(e));
      if (onSlide) onSlide(mousePosition.approximate(e));
    }

    function onMouseUp(e) {
      e.stopPropagation();
      if (e.type == 'mouseup') {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }
      if (e.type == 'touchend') {
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', onMouseUp);
      }
      setIsDragging(false);
      if (onStop) onStop(mousePosition.approximate(e));
    }

    const element = ref.current;
    if (!disabled) {
      element.addEventListener('mousedown', onMouseDown);
      element.addEventListener('touchstart', onMouseDown);
    }

    return () => {
      if (!disabled) {
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('touchstart', onMouseDown);
      }
    };
  }, [isDragging, disabled, onSlide, onStop]);

  return (
    // Wrapper gives the slider a bigger hit area for touch events
    <div
      ref={ref}
      className={clsx(
        'group flex items-center cursor-pointer',
        className
      )}
      style={{
        width,
        height: height + 15,
      }}
    >
      {/* Slider Track */}
      <div
        className={clsx(
          'relative w-full rounded-full',
          '[&,&>*]:select-none [&,&>*]:transition-[background-color,transform,box-shadow,opacity,height]',
          '[&>*]:bg-accent [&,&>*]:duration-200',
          isDragging ? 'bg-neutral-600' : 'bg-neutral-500',
          !disabled && 'group-hover:[&>*]:bg-accent',
          isDragging && '[&>*]:!bg-[rgb(255,0,55)]'
        )}
        style={{
          height: isDragging ? height + 6 : height,
        }}
      >
        {/* Filled Portion */}
        <div
          className={clsx(
            'h-[inherit] shadow',
            isDragging ? 'rounded-[999px_0_0_999px]' : 'rounded-full'
          )}
          style={{
            width: finiteFillWidth,
          }}
        />

        {/* Thumb */}
        {!disabled && (
          <div
            className={clsx(
              'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
              'shadow-[0_0_10px_black] md:opacity-0 md:scale-0',
              'group-hover:scale-100 group-hover:opacity-100',
              isDragging && '!scale-0 !opacity-0'
            )}
            style={{
              left: finiteFillWidth,
              height: height + 8,
              width: height + 8,
            }}
          />
        )}
      </div>
    </div>
  );
}
