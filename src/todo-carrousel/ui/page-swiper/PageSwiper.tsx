import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { SwipeCoordinates } from './SwipeCords.ts';

type Props = PropsWithChildren<{
  onSwipeEnd?: ({deltaX, deltaY}: SwipeCoordinates) => unknown
  onSwiping?: ({deltaX, deltaY}: SwipeCoordinates) => unknown
}>;

const PageSwiper = ({children, onSwiping, onSwipeEnd}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  
  const handleSwipeStart = useCallback((e: MouseEvent) => {
    if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
      return;
    }
    
    e.preventDefault();
    
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsSwiping(true);
  }, []);
  
  const handleSwipeMove = useCallback(
    (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
        return;
      }
      
      e.preventDefault();
      
      const endX = e.clientX;
      const endY = e.clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (isSwiping && onSwiping) {
        onSwiping({deltaX, deltaY});
      }
    }, [startX, startY, isSwiping, onSwiping]);
  
  const handleSwipeEnd = useCallback(
    (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
        return;
      }
      
      e.preventDefault();
      
      const endX = e.clientX;
      const endY = e.clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (isSwiping && onSwipeEnd) {
        onSwipeEnd({deltaX, deltaY});
      }
      
      setIsSwiping(false);
      setStartX(0);
      setStartY(0);
    }, [isSwiping, onSwipeEnd, startX, startY]);
  
  useEffect(() => {
    window.addEventListener('mousedown', handleSwipeStart);
    window.addEventListener('mousemove', handleSwipeMove);
    window.addEventListener('mouseup', handleSwipeEnd);
    window.addEventListener('mouseleave', handleSwipeEnd);
    
    return () => {
      window.removeEventListener('mousedown', handleSwipeStart);
      window.removeEventListener('mousemove', handleSwipeMove);
      window.removeEventListener('mouseup', handleSwipeEnd);
      window.removeEventListener('mouseleave', handleSwipeEnd);
      
    };
  }, [handleSwipeEnd, handleSwipeMove, handleSwipeStart]);
  
  return <div ref={wrapperRef}>{children}</div>;
};

export default PageSwiper;
