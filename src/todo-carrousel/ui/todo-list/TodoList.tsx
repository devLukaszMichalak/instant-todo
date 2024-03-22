import './TodoList.css';
import TodoItem from '../todo-item/TodoItem.tsx';
import ShareIcon from '../../../common/icons/ShareIcon.tsx';
import EditIcon from '../../../common/icons/EditIcon.tsx';
import ClearIcon from '../../../common/icons/ClearIcon.tsx';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Subject } from 'rxjs';
import { IconStyle } from '../../../common/icons/icon-style.ts';
import { useCurrentPageTodoText } from '../../../common/hooks/use-current-page-todo-text.ts';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currentPageAtom, pageCountAtom, pagesAtom } from '../../../common/atoms/atoms.ts';
import MinusIcon from '../../../common/icons/MinusIcon.tsx';
import PlusIcon from '../../../common/icons/PlusIcon.tsx';

type Props = { pageIndex: number }

function TodoList({pageIndex}: Props) {
  
  const clearSubject = new Subject<boolean>();
  
  const [pages, setPages] = useAtom(pagesAtom);
  const pageCount = useAtomValue(pageCountAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);
  
  const [currentPageTodoText, setCurrentPageTodoText] = useCurrentPageTodoText(pageIndex);
  const navigate = useNavigate();
  
  const todos = useMemo(
    () => currentPageTodoText.split('\n').filter(s => s.length > 0),
    [currentPageTodoText]
  );
  
  const handleNavigateToEdit = () => navigate(`/edit`);
  
  const handleNewPage = () => {
    setCurrentPage(pageCount);
    navigate(`/edit`);
  };
  
  const handleRemove = () => {
    clearSubject.next(true);
    const pagesWithoutCurrent = pages.filter(val => val !== pageIndex);
    setPages(pagesWithoutCurrent);
    setCurrentPageTodoText('');
    setCurrentPage(pagesWithoutCurrent.pop()!);
  };
  
  const handleClear = () => clearSubject.next(true);
  
  async function makeSearchParams() {
    let params = '?';
    for (let i = 0; i < todos.length; i++) {
      const isKeyDone = localStorage.getItem(`${i}-${pageIndex}`) === 'true';
      if (isKeyDone) {
        params += `${i}=x&`;
      }
    }
    return params.slice(0, -1);
  }
  
  const handleCopyShareLink = async () => {
    const params = await makeSearchParams();
    const link: string = `https://instant-todos.web.app/share/${btoa(encodeURI(currentPageTodoText))}${params}`;
    
    if (navigator.share) {
      navigator.share({title: 'Instant To-dos', url: link}).then();
    } else {
      navigator.clipboard.writeText(link).then();
    }
  };
  
  return (
    <div className="todo-list-container">
      <div className="items-container">
        <div className="items">
          {todos.map((todo, index) =>
            <TodoItem key={index} dbKey={`${index}-${pageIndex}`} todo={todo}
                      clear$={clearSubject.asObservable()}></TodoItem>
          )}
        </div>
      </div>
      
      <div className="todo-list-buttons">
        <button className="secondary" disabled={(pageIndex !== pageCount - 1) || pageCount === 1} onClick={handleRemove}><MinusIcon style={IconStyle.dark}/></button>
        <button className="secondary" onClick={handleClear}><ClearIcon style={IconStyle.dark}/></button>
        <button className="primary" onClick={handleNavigateToEdit}><EditIcon style={IconStyle.light}/></button>
        <button className="secondary" onClick={handleCopyShareLink}><ShareIcon style={IconStyle.dark}/></button>
        <button className="secondary" onClick={handleNewPage}><PlusIcon style={IconStyle.dark}/></button>
      </div>
    </div>
  );
}

export default TodoList;
