import './TodoList.css';
import TodoItem from '../todo-item/TodoItem.tsx';
import { Subject } from 'rxjs';

type Props = {
  clearSubject: Subject<boolean>;
  todos: string[];
  pageIndex: number;
}

function TodoList({pageIndex, clearSubject, todos}: Props) {
  
  return (
    <div className="items-container">
      <div className="items">
        {todos.map((todo, index) =>
          <TodoItem key={index} dbKey={`${index}-${pageIndex}`} todo={todo}
                    clear$={clearSubject.asObservable()}></TodoItem>
        )}
      </div>
    </div>
  );
}

export default TodoList;
