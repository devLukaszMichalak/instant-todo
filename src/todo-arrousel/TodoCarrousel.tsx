import './TodoCarrousel.css';
import TodoList from './ui/todo-list/TodoList.tsx';
import { useAtom, useAtomValue } from 'jotai';
import { currentPageAtom, pageCountAtom } from '../common/atoms/atoms.ts';
import LeftIcon from '../common/icons/LeftIcon.tsx';
import { IconStyle } from '../common/icons/icon-style.ts';
import PageDot from './ui/page-dot/PageDot.tsx';
import RightIcon from '../common/icons/RightIcon.tsx';

const TodoCarrousel = () => {
  
  const pageCount = useAtomValue(pageCountAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  
  const handlePrev = () => setCurrentPage(currentPage - 1);
  const handleNext = () => setCurrentPage(currentPage + 1);
  
  return (
    <div className="carrousel-container">
      <div className="dots">
        {[...Array(pageCount).keys()].map(val => <PageDot key={`dot-${val}`} isActive={val === currentPage}/>)}
      </div>
      
      {currentPage !== 0 ?
        <button className="nav prev" onClick={handlePrev}><LeftIcon style={IconStyle.dark}/></button> : <></>}
      
      <TodoList pageIndex={currentPage}/>
      
      {currentPage !== pageCount - 1 ?
        <button className="nav next" onClick={handleNext}><RightIcon style={IconStyle.dark}/></button> : <></>}
    </div>
  );
};

export default TodoCarrousel;
