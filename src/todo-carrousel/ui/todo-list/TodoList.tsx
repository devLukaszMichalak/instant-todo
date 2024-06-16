import './TodoList.css';
import TodoItem from '../todo-item/TodoItem.tsx';
import { Observable } from 'rxjs';

type Props = {
  clear$: Observable<boolean>;
  todos: string[];
  pageIndex: number;
}

function TodoList({pageIndex, clear$, todos}: Props) {
  
  return (
    <div className="items-container">
      <div className="items">
        {todos.map((todo, index) =>
          <TodoItem key={index} dbKey={`${index}-${pageIndex}`} todo={todo}
                    clear$={clear$}></TodoItem>
        )}
      </div>
    </div>
  );
}

export default TodoList;
