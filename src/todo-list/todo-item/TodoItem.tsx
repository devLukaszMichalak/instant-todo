import './TodoItem.css';
import { useState } from 'react';

function TodoItem({index, todo}: { index: number, todo: string }) {
  
  const [isDone, setIsDone] = useState(false);
  
  return (
    <div className="todo-container">
      <input type="checkbox"
             className="x-check"
             id={'' + index}
             checked={isDone}
             onChange={(e) => setIsDone(e.target.checked)}
      />
      <label htmlFor={'' + index} className={isDone ? 'done' : ''}>{todo.toUpperCase()}</label>
    </div>
  );
}

export default TodoItem;
