import { useState } from 'react';


function InputParser({parseInput}: { parseInput: (s: string) => void }) {
  
  const [todoText, setTodoText] = useState<string>('');
  
  return (
    <>
      <h2>Enter here the text you want to make todos from:</h2>
      <textarea
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={() => parseInput(todoText)}>Submit!</button>
    </>
  );
}

export default InputParser;
