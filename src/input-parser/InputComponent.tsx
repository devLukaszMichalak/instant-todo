import { useState } from 'react';
import './InputParser.css';
import { useNavigate } from 'react-router-dom';

function InputComponent() {
  
  const [todoText, setTodoText] = useState<string>('');
  const navigate = useNavigate();
  
  const navigateToList = () => navigate(btoa(todoText));
  
  return (
    <div className="input-container">
      <div>Enter here the text you want to make todos from:</div>
      <textarea
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button disabled={todoText.length === 0} onClick={() => navigateToList()}>Submit!</button>
    </div>
  );
}

export default InputComponent;
