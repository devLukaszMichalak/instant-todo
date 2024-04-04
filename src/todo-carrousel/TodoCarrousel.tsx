import './TodoCarrousel.css';
import { useAtom, useAtomValue } from 'jotai';
import { currentPageAtom, pageCountAtom } from '../common/atoms/atoms.ts';
import { Subject } from 'rxjs';
import { useMemo } from 'react';
import { useCurrentPageTodoText } from '../common/hooks/use-current-page-todo-text.ts';
import { SwipeCoordinates } from './ui/page-swiper/SwipeCords.ts';
import { useAnimate } from 'framer-motion';
import FadeDiv from '../common/fade-div/FadeDiv.tsx';
import TodoList from './ui/todo-list/TodoList.tsx';
import PageDot from './ui/page-dot/PageDot.tsx';
import TodoActions from './ui/todo-list-actions/TodoActions.tsx';
import PageSwiper from './ui/page-swiper/PageSwiper.tsx';

const TodoCarrousel = () => {
  
  const pageCount = useAtomValue(pageCountAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  
  const clearSubject = useMemo(() => new Subject<boolean>(), []);
  
  const [scope, animate] = useAnimate();
  
  const [currentPageTodoText] = useCurrentPageTodoText(currentPage);
  
  const todos = useMemo(
    () => currentPageTodoText.split('\n').filter(s => s.length > 0),
    [currentPageTodoText]
  );
  
  const handlePrev = () => setCurrentPage(currentPage - 1);
  const handleNext = () => setCurrentPage(currentPage + 1);
  
  const canShowNext = currentPage !== pageCount - 1;
  const canShowPrev = currentPage !== 0;
  
  const handleSwipeEnd = async ({deltaX}: SwipeCoordinates) => {
    
    if (deltaX >= window.innerWidth / 4 && canShowPrev) {
      await animate(scope.current, {opacity: 0}, {duration: 0.15});
      handlePrev();
      await animate(scope.current, {x: 0}, {duration: 0});
      animate(scope.current, {opacity: 1}, {duration: 0.15});
    } else if (-deltaX >= window.innerWidth / 4 && canShowNext) {
      await animate(scope.current, {opacity: 0}, {duration: 0.15});
      handleNext();
      await animate(scope.current, {x: 0}, {duration: 0});
      animate(scope.current, {opacity: 1}, {duration: 0.15});
    } else {
      animate(scope.current, {x: 0});
    }
    
  };
  
  const handleSwiping = ({deltaX}: SwipeCoordinates) => {
    animate(scope.current, {x: deltaX}, {duration: 0});
    
    if (deltaX >= window.innerWidth / 4 && canShowPrev) {
      animate(scope.current, {opacity: 0.35}, {duration: 0});
    } else if (-deltaX >= window.innerWidth / 4 && canShowNext) {
      animate(scope.current, {opacity: 0.35}, {duration: 0});
    } else {
      animate(scope.current, {opacity: 1}, {duration: 0});
    }
  };
  
  return (
    <PageSwiper onSwipeEnd={handleSwipeEnd} onSwiping={handleSwiping}>
      <div className="carrousel-container">
        <FadeDiv className="dots">
          {[...Array(pageCount).keys()].map(val => <PageDot key={`dot-${val}`} isActive={val === currentPage}/>)}
        </FadeDiv>
        
        <FadeDiv ref={scope} className="todo-list-container">
          <TodoList clearSubject={clearSubject} todos={todos} pageIndex={currentPage}/>
        </FadeDiv>
        
        <TodoActions clearSubject={clearSubject} todos={todos} pageIndex={currentPage}/>
      
      </div>
    </PageSwiper>
  );
};

export default TodoCarrousel;
