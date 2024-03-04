import './TodoList.css';
import TodoItem from './ui/todo-item/TodoItem.tsx';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTodos } from '../common/hooks/useTodos.ts';
import ShareIcon from '../common/icons/ShareIcon.tsx';
import EditIcon from '../common/icons/EditIcon.tsx';

function TodoList() {
  
  const [searchParams] = useSearchParams();
  const todos = useTodos();
  
  const getWasDone = (index: number) => !!searchParams.get(String(index));
  
  const navigate = useNavigate();
  const {data} = useParams();
  const navigateToEdit = () => navigate(`/edit/${data}`);
  
  const copyShareLink = () => {
    if (navigator.share) {
      navigator.share({title: 'Instant To-dos', text: 'Check out those to-dos!', url: location.href}).then();
    } else {
      navigator.clipboard.writeText(location.href).then();
    }
  };
  
  return (
    <div className="todo-list-container">
      <div className="items">
        {todos.map((todo, index) =>
          <TodoItem key={index} index={index} todo={todo} wasDone={getWasDone(index)}></TodoItem>
        )}
      </div>
      <div className="buttons">
        <button onClick={navigateToEdit}><EditIcon/> Edit</button>
        <button onClick={copyShareLink}><ShareIcon/> Share</button>
      </div>
    </div>
  );
}

export default TodoList;
