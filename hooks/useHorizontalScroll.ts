import { useRef } from 'react';

export function useHorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null);

  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const onMouseDown = (e: React.MouseEvent) => {
    state.current.isDown = true;
    state.current.startX = e.pageX - (ref.current?.offsetLeft ?? 0);
    state.current.scrollLeft = ref.current?.scrollLeft ?? 0;
    document.body.style.userSelect = 'none';
  };

  const stopDrag = () => {
    state.current.isDown = false;
    document.body.style.userSelect = '';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!state.current.isDown) return;
    e.preventDefault();

    const x = e.pageX - (ref.current?.offsetLeft ?? 0);
    const walk = x - state.current.startX;

    if (ref.current) {
      ref.current.scrollLeft = state.current.scrollLeft - walk;
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!ref.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      ref.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp: stopDrag,
    onMouseLeave: stopDrag,
    onWheel,
  };
}
