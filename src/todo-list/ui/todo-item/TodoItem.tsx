import './TodoItem.css';
import { ChangeEvent, useEffect, useId, useState } from 'react';
import { get, set } from 'idb-keyval';

type Props = { dbKey: string, todo: string }

function TodoItem({dbKey, todo}: Props) {
  
  const id = useId();
  const [isDone, setIsDone] = useState(false);
  
  useEffect(() => {
    get(dbKey).then(dbIsDone => setIsDone(!!dbIsDone));
  }, [dbKey]);
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    set(dbKey, isChecked).then(() => setIsDone(isChecked));
  };
  
  return (
    <div className="todo-container">
      <input type="checkbox"
             className="x-check"
             id={id}
             checked={isDone}
             onChange={handleCheckboxChange}
      />
      <label htmlFor={id} className={isDone ? 'done' : ''}>{todo.toUpperCase()}</label>
    </div>
  );
}

export default TodoItem;
