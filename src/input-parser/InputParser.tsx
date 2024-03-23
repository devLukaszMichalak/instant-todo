import './InputParser.css';
import DoneIcon from '../common/icons/DoneIcon.tsx';
import ClearIcon from '../common/icons/ClearIcon.tsx';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { IconStyle } from '../common/icons/icon-style.ts';
import { currentPageAtom, defaultRouteAtom, pagesAtom } from '../common/atoms/atoms.ts';
import { useAtom, useAtomValue } from 'jotai';
import { useCurrentPageTodoText } from '../common/hooks/use-current-page-todo-text.ts';
import { useSetAtom } from 'jotai/index';

function InputParser() {
  
  const [pages, setPages] = useAtom(pagesAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const setDefaultRoute = useSetAtom(defaultRouteAtom);
  const [currentPageTodoText, setCurrentPageTodoText] = useCurrentPageTodoText(currentPage);
  
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    if (!pages.includes(currentPage)) {
      setPages([...pages, currentPage]);
    }
    setDefaultRoute('/display');
    navigate(`/display`);
  };
  
  const handleClear = () => setCurrentPageTodoText('');
  
  const handleInputChane = (e: ChangeEvent<HTMLTextAreaElement>) => setCurrentPageTodoText(e.target.value);
  
  const isEmpty = () => currentPageTodoText.length === 0;
  
  return (
    <div className="input-container">
      <div>Enter here the text you want to make todos from:</div>
      <textarea
        defaultValue={currentPageTodoText}
        onChange={handleInputChane}
      />
      <div className="input-buttons">
        <button className="primary" disabled={isEmpty()} onClick={handleSubmit}><DoneIcon style={IconStyle.light}/>
        </button>
        <button className="secondary" onClick={handleClear}><ClearIcon style={IconStyle.dark}/></button>
      </div>
    </div>
  );
}

export default InputParser;
