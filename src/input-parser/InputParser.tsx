import './InputParser.css';
import DoneIcon from '../common/icons/DoneIcon.tsx';
import ClearIcon from '../common/icons/ClearIcon.tsx';
import FadeDiv from '../common/fade-div/FadeDiv.tsx';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { IconStyle } from '../common/icons/IconStyle.ts';
import { currentPageAtom, defaultRouteAtom, pagesAtom } from '../common/atoms/Atoms.ts';
import { useAtom, useAtomValue } from 'jotai';
import { useCurrentPageTodoText } from '../common/hooks/UseCurrentPageTodoText.ts';
import { useSetAtom } from 'jotai/index';
import { removeIsKeyDone } from '../common/atoms/IsKeyDone.ts';

function InputParser() {
  
  const [pages, setPages] = useAtom(pagesAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const setDefaultRoute = useSetAtom(defaultRouteAtom);
  const [currentPageTodoText, setCurrentPageTodoText] = useCurrentPageTodoText(currentPage);
  
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    if (!pages.includes(currentPage)) {
      await setPages([...pages, currentPage]);
    }
    await setDefaultRoute('/display');
    navigate(`/display`);
  };
  
  const handleClear = () => {
    setCurrentPageTodoText('');
    
    Array.from({length: localStorage.length + 1}, (_, i) => i)
      .forEach(index => removeIsKeyDone(index, currentPage));
  };
  
  const handleInputChane = (e: ChangeEvent<HTMLTextAreaElement>) => setCurrentPageTodoText(e.target.value);
  
  const isEmpty = () => currentPageTodoText.length === 0;
  
  return (
    <FadeDiv className="input-container">
      <div>Enter here the text you want to make todos from:</div>
      <textarea
        value={currentPageTodoText}
        onChange={handleInputChane}
      />
      <div className="input-buttons">
        <button className="primary" disabled={isEmpty()} onClick={handleSubmit}><DoneIcon style={IconStyle.LIGHT}/>
        </button>
        <button className="secondary" onClick={handleClear}><ClearIcon style={IconStyle.DARK}/></button>
      </div>
    </FadeDiv>
  );
}

export default InputParser;
