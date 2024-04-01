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
import { motion } from 'framer-motion';

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
    <motion.div
      className="input-container"
      initial={{opacity: 0, scale: 1.2}}
      animate={{opacity: 1, scale: 1.0}}
      exit={{opacity: 0, scale: 0.8}}
      transition={{duration: 0.15}}
    >
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
    </motion.div>
  );
}

export default InputParser;
