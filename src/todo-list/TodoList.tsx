import './TodoList.css';
import TodoItem from './ui/todo-item/TodoItem.tsx';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '../common/icons/ShareIcon.tsx';
import EditIcon from '../common/icons/EditIcon.tsx';
import { useDbTodoText } from '../common/hooks/useDbTodoText.ts';
import { useMemo } from 'react';

function TodoList() {
  
  const [dbTodoText] = useDbTodoText();
  const navigate = useNavigate();
  
  const todos = useMemo(
    () => dbTodoText.split('\n').filter(s => s.length > 0),
    [dbTodoText]
  );
  
  const handleNavigateToEdit = () => navigate(`/edit`);
  const handleCopyShareLink = () => {
    const link: string = `https://instant-todos.web.app/share/${btoa(encodeURI(dbTodoText))}`;
    
    if (navigator.share) {
      navigator.share({title: 'Instant To-dos', text: 'Check out those to-dos!', url: link}).then();
    } else {
      navigator.clipboard.writeText(link).then();
    }
  };
  
  return (
    <div className="todo-list-container">
      <div className="items">
        {todos.map((todo, index) =>
          <TodoItem key={index} index={index} todo={todo}></TodoItem>
        )}
      </div>
      <div className="buttons">
        <button onClick={handleNavigateToEdit}><EditIcon/> Edit</button>
        <button onClick={handleCopyShareLink}><ShareIcon/> Share</button>
      </div>
    </div>
  );
}

export default TodoList;
