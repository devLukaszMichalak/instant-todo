import './TodoItem.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';

type Props = { index: number, todo: string }

function TodoItem({index, todo}: Props) {
  
  const key = String(index);
  
  const [isDone, setIsDone] = useState(false);
  
  useEffect(() => {
    get(key).then(dbIsDone => setIsDone(!!dbIsDone));
  }, []);
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    set(key, isChecked).then(() => setIsDone(isChecked));
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
