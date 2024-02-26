import './TodoList.css';
import TodoItem from './todo-item/TodoItem.tsx';
import { useParams } from 'react-router-dom';

function TodoList() {
  
  const {data} = useParams();
  
  const todos = decodeURI(atob(data ?? ''))
    .split('\n')
    .filter(s => s.length > 0)
  
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
