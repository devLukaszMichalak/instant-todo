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
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
      return;
    }
    
    e.preventDefault();
    
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsSwiping(true);
  }, []);
  
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
        return;
      }
      
      e.preventDefault();
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (isSwiping && onSwiping) {
        onSwiping({deltaX, deltaY});
      }
    }, [startX, startY, isSwiping, onSwiping]);
  
  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
        return;
      }
      
      e.preventDefault();
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (isSwiping && onSwipeEnd) {
        onSwipeEnd({deltaX, deltaY});
      }
      
    }, [startX, startY, isSwiping, onSwipeEnd]);
  
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
    window.addEventListener('touchstart', handleTouchStart);
    
    window.addEventListener('mousemove', handleSwipeMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    window.addEventListener('mouseup', handleSwipeEnd);
    window.addEventListener('mouseleave', handleSwipeEnd);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousedown', handleSwipeStart);
      window.removeEventListener('mousemove', handleSwipeMove);
      window.removeEventListener('mouseup', handleSwipeEnd);
      window.removeEventListener('mouseleave', handleSwipeEnd);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [handleSwipeEnd, handleSwipeMove, handleSwipeStart, handleTouchEnd, handleTouchMove, handleTouchStart]);
  
  return <div ref={wrapperRef}>{children}</div>;
};

export default PageSwiper;
