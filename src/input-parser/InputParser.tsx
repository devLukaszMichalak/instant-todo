import { useState } from 'react';
import './InputParser.css';

function InputParser({parseInput}: { parseInput: (s: string) => void }) {
  
  const [todoText, setTodoText] = useState<string>('');
  
  return (
    <div className="input-container">
      <div>Enter here the text you want to make todos from:</div>
      <textarea
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button  disabled={todoText.length === 0} onClick={() => parseInput(todoText)}>Submit!</button>
    </div>
  );
}

export default InputParser;
