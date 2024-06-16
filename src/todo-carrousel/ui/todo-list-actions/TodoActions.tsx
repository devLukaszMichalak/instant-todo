import './TodoActions.css';
import MinusIcon from '../../../common/icons/MinusIcon.tsx';
import ClearIcon from '../../../common/icons/ClearIcon.tsx';
import EditIcon from '../../../common/icons/EditIcon.tsx';
import ShareIcon from '../../../common/icons/ShareIcon.tsx';
import PlusIcon from '../../../common/icons/PlusIcon.tsx';
import FadeDiv from '../../../common/fade-div/FadeDiv.tsx';
import { IconStyle } from '../../../common/icons/IconStyle.ts';
import { isKeyDone } from '../../../common/atoms/IsKeyDone.ts';
import { Subject } from 'rxjs';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/index';
import { currentPageAtom, defaultRouteAtom, pageCountAtom, pagesAtom } from '../../../common/atoms/Atoms.ts';
import { useNavigate } from 'react-router-dom';
import { useCurrentPageTodoText } from '../../../common/hooks/UseCurrentPageTodoText.ts';

type Props = {
  clearSubject: Subject<boolean>;
  todos: string[];
  pageIndex: number;
}

const TodoActions = ({clearSubject, todos, pageIndex}: Props) => {
  
  const [pages, setPages] = useAtom(pagesAtom);
  const pageCount = useAtomValue(pageCountAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);
  const setDefaultRoute = useSetAtom(defaultRouteAtom);
  const navigate = useNavigate();
  
  const [currentPageTodoText, setCurrentPageTodoText] = useCurrentPageTodoText(pageIndex);
  
  const handleNavigateToEdit = async () => {
    await setDefaultRoute('/edit');
    navigate(`/edit`);
  };
  
  const handleNewPage = () => Promise.all([
    setCurrentPage(pageCount),
    setDefaultRoute('/edit')
  ]).then(() => navigate(`/edit`));
  
  
  const handleRemove = async () => {
    clearSubject.next(true);
    const pagesWithoutCurrent = pages.filter(val => val !== pageIndex);
    await setPages(pagesWithoutCurrent);
    setCurrentPageTodoText('');
    await setCurrentPage(pagesWithoutCurrent.pop()!);
  };
  
  const handleClear = () => clearSubject.next(true);
  
  async function makeSearchParams(): Promise<string> {
    let params = '?';
    for (let i = 0; i < todos.length; i++) {
      if (isKeyDone(i, pageIndex)) {
        params += `${i}=x&`;
      }
    }
    return params.slice(0, -1);
  }
  
  const handleCopyShareLink = async (): Promise<void> => {
    const params = await makeSearchParams();
    const link: string = `https://instant-todos.web.app/share/${btoa(encodeURI(currentPageTodoText))}${params}`;
    
    if (navigator.share) {
      navigator.share({title: 'Instant To-dos', url: link}).then();
    } else {
      navigator.clipboard.writeText(link).then();
    }
  };
  
  return (
    <FadeDiv className="todo-list-buttons">
      <button className="secondary" disabled={(pageIndex !== pageCount - 1) || pageCount === 1} onClick={handleRemove}>
        <MinusIcon style={IconStyle.DARK}/></button>
      <button className="secondary" onClick={handleClear}><ClearIcon style={IconStyle.DARK}/></button>
      <button className="primary" onClick={handleNavigateToEdit}><EditIcon style={IconStyle.LIGHT}/></button>
      <button className="secondary" onClick={handleCopyShareLink}><ShareIcon style={IconStyle.DARK}/></button>
      <button className="secondary" onClick={handleNewPage}><PlusIcon style={IconStyle.DARK}/></button>
    </FadeDiv>
  );
};

export default TodoActions;
