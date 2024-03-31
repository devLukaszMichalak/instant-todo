import './TodoCarrousel.css';
import TodoList from './ui/todo-list/TodoList.tsx';
import { useAtom, useAtomValue } from 'jotai';
import { currentPageAtom, pageCountAtom } from '../common/atoms/atoms.ts';
import PageDot from './ui/page-dot/PageDot.tsx';
import TodoActions from './ui/todo-list-actions/TodoActions.tsx';
import { Subject } from 'rxjs';
import { useMemo, useState } from 'react';
import { useCurrentPageTodoText } from '../common/hooks/use-current-page-todo-text.ts';
import PageSwiper from './ui/page-swiper/PageSwiper.tsx';
import { SwipeCoordinates } from './ui/page-swiper/SwipeCords.ts';

const TodoCarrousel = () => {
  
  const pageCount = useAtomValue(pageCountAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  
  const [xOffset, setXOffset] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(1);
  
  const clearSubject = useMemo(() => new Subject<boolean>(), []);
  
  const [currentPageTodoText] = useCurrentPageTodoText(currentPage);
  
  const todos = useMemo(
    () => currentPageTodoText.split('\n').filter(s => s.length > 0),
    [currentPageTodoText]
  );
  
  const handlePrev = () => setCurrentPage(currentPage - 1);
  const handleNext = () => setCurrentPage(currentPage + 1);
  
  const canShowNext = currentPage !== pageCount - 1;
  const canShowPrev = currentPage !== 0;
  
  const handleSwipeEnd = ({deltaX}: SwipeCoordinates) => {
    setXOffset(0);
    setOpacity(1);
    if (deltaX >= window.innerWidth / 4 && canShowPrev) {
      handlePrev();
    }
    
    if (-deltaX >= window.innerWidth / 4 && canShowNext) {
      handleNext();
    }
  };
  
  const handleSwiping = ({deltaX}: SwipeCoordinates) => {
    setXOffset(deltaX);
    setOpacity(1);
    if (deltaX >= window.innerWidth / 4 && canShowPrev) {
      setOpacity(0.35);
    }
    
    if (-deltaX >= window.innerWidth / 4 && canShowNext) {
      setOpacity(0.35);
    }
  };
  
  return (
    <PageSwiper onSwipeEnd={handleSwipeEnd} onSwiping={handleSwiping}>
      <div className="carrousel-container">
        <div className="dots">
          {[...Array(pageCount).keys()].map(val => <PageDot key={`dot-${val}`} isActive={val === currentPage}/>)}
        </div>
        
        <div className="todo-list-container">
          <div style={{transform: `translateX(${xOffset}px)`, opacity: opacity}}>
            <TodoList clearSubject={clearSubject} todos={todos} pageIndex={currentPage}/>
          </div>
          
          <TodoActions clearSubject={clearSubject} todos={todos} pageIndex={currentPage}/>
        </div>
      
      </div>
    </PageSwiper>
  );
};

export default TodoCarrousel;
