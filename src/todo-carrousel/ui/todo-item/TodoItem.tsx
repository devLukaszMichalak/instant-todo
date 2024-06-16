import './TodoItem.css';
import { ChangeEvent, useEffect, useId, useMemo } from 'react';
import { Observable } from 'rxjs';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type Props = { dbKey: string, todo: string, clear$: Observable<boolean> }

function TodoItem({dbKey, todo, clear$}: Props) {
  
  const id = useId();
  const isDoneAtom = useMemo(() => atomWithStorage(dbKey, false, undefined, {getOnInit: true}), [dbKey]);
  const [isDone, setIsDone] = useAtom(isDoneAtom);
  
  useEffect(() => {
    const subscription = clear$.subscribe(() => setIsDone(false));
    return () => subscription.unsubscribe();
  }, [clear$]);
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => setIsDone(e.target.checked);
  
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
