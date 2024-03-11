import './InputParser.css';
import DoneIcon from '../common/icons/DoneIcon.tsx';
import { useNavigate } from 'react-router-dom';
import { useDbTodoText } from '../common/hooks/useDbTodoText.ts';
import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';

function InputParser() {
  
  const [dbTodoText, setDbTodoText] = useDbTodoText();
  const [cursor, setCursor] = useState<number>();
  const textareaRef = useRef<HTMLTextAreaElement>();
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && cursor) {
      textarea.setSelectionRange(cursor, cursor);
    }
  }, [textareaRef, cursor, dbTodoText]);
  
  const navigate = useNavigate();
  
  const handleNavigateToDisplay = () => navigate(`/display`);
  
  const handleInputChane = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCursor(e.target.selectionStart);
    setDbTodoText(e.target.value);
  };
  
  return (
    <div className="input-container">
      <div>Enter here the text you want to make todos from:</div>
      <textarea
        ref={textareaRef as MutableRefObject<HTMLTextAreaElement>}
        defaultValue={dbTodoText}
        onChange={handleInputChane}
      />
      <button disabled={dbTodoText.length === 0} onClick={handleNavigateToDisplay}><DoneIcon/> Submit!</button>
    </div>
  );
}

export default InputParser;
