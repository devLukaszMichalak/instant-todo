import './TodoList.css';
import TodoItem from './todo-item/TodoItem.tsx';

function TodoList({todos}: { todos: string[] }) {
  
  const listElements = todos.map(
    (todo, index) => (<TodoItem key={index} index={index} todo={todo}></TodoItem>)
  );
  
  return (
    <div className="items">
      {listElements}
    </div>
  );
}

export default TodoList;
