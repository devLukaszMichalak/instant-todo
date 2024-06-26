import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { SwipeCoordinates } from './SwipeCords.ts';

type Props = PropsWithChildren<{
  onSwipeEnd?: ({deltaX, deltaY}: SwipeCoordinates) => unknown
  onSwiping?: ({deltaX, deltaY}: SwipeCoordinates) => unknown
}>;

const PageSwiper = ({children, onSwiping, onSwipeEnd}: Props) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsSwiping(true);
  }, []);
  
  const handleTouchMove = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    if (isSwiping && onSwiping) {
      onSwiping({deltaX, deltaY});
    }
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    if (isSwiping && onSwipeEnd) {
      onSwipeEnd({deltaX, deltaY});
    }
  };
  
  const handleSwipeStart = useCallback((e: MouseEvent) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsSwiping(true);
  }, []);
  
  const handleSwipeMove = (e: MouseEvent) => {
    const endX = e.clientX;
    const endY = e.clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    if (isSwiping && onSwiping) {
      onSwiping({deltaX, deltaY});
    }
  };
  
  const handleSwipeEnd = (e: MouseEvent) => {
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
  };
  
  useEffect(() => {
    window.addEventListener('mousedown', handleSwipeStart);
    window.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      window.removeEventListener('mousedown', handleSwipeStart);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  
  
  useEffect(() => {
    window.addEventListener('mousemove', handleSwipeMove);
    window.addEventListener('mouseup', handleSwipeEnd);
    window.addEventListener('mouseleave', handleSwipeEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleSwipeMove);
      window.removeEventListener('mouseup', handleSwipeEnd);
      window.removeEventListener('mouseleave', handleSwipeEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [handleSwipeEnd, handleSwipeMove,  handleTouchEnd, handleTouchMove]);
  
  return children;
};

export default PageSwiper;
