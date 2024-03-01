import './TodoItem.css';
import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = { index: number, todo: string, wasDone: boolean }

function TodoItem({index, todo, wasDone}: Props) {
  
  const key = String(index);
  
  const [isDone, setIsDone] = useState(wasDone);
  const [, setSearchParams] = useSearchParams();
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    
    setIsDone(isChecked);
    setSearchParams(params => {
      isChecked ? params.set(key, 'x') : params.delete(key);
      return params;
    });
  };
  
  return (
    <div className="todo-container">
      <input type="checkbox"
             className="x-check"
             id={key}
             checked={isDone}
             onChange={handleCheckboxChange}
      />
      <label htmlFor={key} className={isDone ? 'done' : ''}>{todo.toUpperCase()}</label>
    </div>
  );
}

export default TodoItem;
