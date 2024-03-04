import { useState } from 'react';
import './InputParser.css';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../common/hooks/useTodos.ts';
import DoneIcon from '../common/icons/DoneIcon.tsx';

function InputParser() {
  
  const todos = useTodos();
  const [todoText, setTodoText] = useState<string>(todos.join('\n'));
  const navigate = useNavigate();
  
  const navigateToDisplay = () => navigate(`/display/${btoa(encodeURI(todoText))}`);
  
  return (
    <div className="input-container">
      <div>Enter here the text you want to make todos from:</div>
      <textarea
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button disabled={todoText.length === 0} onClick={navigateToDisplay}><DoneIcon/> Submit!</button>
    </div>
  );
}

export default InputParser;
