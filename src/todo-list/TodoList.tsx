import './TodoList.css';
import TodoItem from './todo-item/TodoItem.tsx';

function TodoList({todos}: { todos: string[] }) {
  
  return (
    <div className="items">
      {todos.map((todo, index) => (<TodoItem key={index} index={index} todo={todo}></TodoItem>))}
    </div>
  );
}

export default TodoList;
