import './InputParser.css';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '../common/icons/DoneIcon.tsx';
import { useDbTodoText } from '../common/hooks/useDbTodoText.ts';
import { ChangeEvent } from 'react';

function InputParser() {
  
  const [dbTodoText, setDbTodoText] = useDbTodoText();
  const navigate = useNavigate();
  
  const handleNavigateToDisplay = () => navigate(`/display`);
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => setDbTodoText(e.target.value);
  
  return (
    <div className="input-container">
      <div>Enter here the text you want to make todos from:</div>
      <textarea
        value={dbTodoText}
        onChange={handleInput}
      />
      <button disabled={dbTodoText.length === 0} onClick={handleNavigateToDisplay}><DoneIcon/> Submit!</button>
    </div>
  );
}

export default InputParser;
