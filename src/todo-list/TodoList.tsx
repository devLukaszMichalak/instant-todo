import './TodoList.css';
import TodoItem from './ui/todo-item/TodoItem.tsx';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTodos } from '../common/hooks/useTodos.ts';

function TodoList() {
  
  const [searchParams] = useSearchParams();
  const todos = useTodos();
  
  const getWasDone = (index: number) => !!searchParams.get(String(index));
  
  const navigate = useNavigate();
  const {data} = useParams();
  const navigateToEdit = () => navigate(`/edit/${data}`);
  
  return (
    <>
      <div className="items">
        {todos.map((todo, index) =>
          <TodoItem key={index} index={index} todo={todo} wasDone={getWasDone(index)}></TodoItem>
        )}
      </div>
      <button onClick={navigateToEdit}>Edit</button>
    </>
  
  );
}

export default TodoList;
