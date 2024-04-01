import './TodoCarrousel.css';
import TodoList from './ui/todo-list/TodoList.tsx';
import { useAtom, useAtomValue } from 'jotai';
import { currentPageAtom, pageCountAtom } from '../common/atoms/atoms.ts';
import PageDot from './ui/page-dot/PageDot.tsx';
import TodoActions from './ui/todo-list-actions/TodoActions.tsx';
import { Subject } from 'rxjs';
import { useMemo } from 'react';
import { useCurrentPageTodoText } from '../common/hooks/use-current-page-todo-text.ts';
import PageSwiper from './ui/page-swiper/PageSwiper.tsx';
import { SwipeCoordinates } from './ui/page-swiper/SwipeCords.ts';
import { motion, useAnimate } from 'framer-motion';

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
      await animate(scope.current, {opacity: 1}, {duration: 0.15});
    } else if (-deltaX >= window.innerWidth / 4 && canShowNext) {
      await animate(scope.current, {opacity: 0}, {duration: 0.15});
      handleNext();
      await animate(scope.current, {x: 0}, {duration: 0});
      await animate(scope.current, {opacity: 1}, {duration: 0.15});
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
        <motion.div
          className="dots"
          initial={{opacity: 0, scale: 1.2}}
          animate={{opacity: 1, scale: 1.0}}
          exit={{opacity: 0, scale: 0.8}}
          transition={{duration: 0.15}}
        >
          {[...Array(pageCount).keys()].map(val => <PageDot key={`dot-${val}`} isActive={val === currentPage}/>)}
        
        </motion.div>
        
        <motion.div
          ref={scope}
          className="todo-list-container"
          initial={{opacity: 0, scale: 1.2}}
          animate={{opacity: 1, scale: 1.0}}
          exit={{opacity: 0, scale: 0.8}}
          transition={{duration: 0.15}}
        >
          <TodoList clearSubject={clearSubject} todos={todos} pageIndex={currentPage}/>
        </motion.div>
        
        <TodoActions clearSubject={clearSubject} todos={todos} pageIndex={currentPage}/>
      
      </div>
    </PageSwiper>
  );
};

export default TodoCarrousel;
