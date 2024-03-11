import './InputParser.css';
import DoneIcon from '../common/icons/DoneIcon.tsx';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDbTodoText } from '../common/hooks/useDbTodoText.ts';

function InputParser() {
  
  const [dbTodoText, setDbTodoText] = useDbTodoText();
  const [todoText, setTodoText] = useState('');
  
  useEffect(() => {
    setTodoText(dbTodoText);
  }, [dbTodoText]);
  
  const navigate = useNavigate();
  
  const handleNavigateToDisplay = () => navigate(`/display`);
  
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTodoText(value);
    setDbTodoText(value);
  };
  
  return (
    <div className="input-container">
      <div>Enter here the text you want to make todos from:</div>
      <textarea
        value={todoText}
        onChange={handleInput}
      />
      <button disabled={todoText.length === 0} onClick={handleNavigateToDisplay}><DoneIcon/> Submit!</button>
    </div>
  );
}

export default InputParser;
