import './TodoList.css';
import TodoItem from './ui/todo-item/TodoItem.tsx';
import ShareIcon from '../common/icons/ShareIcon.tsx';
import EditIcon from '../common/icons/EditIcon.tsx';
import { useNavigate } from 'react-router-dom';
import { useDbTodoText } from '../common/hooks/useDbTodoText.ts';
import { useMemo } from 'react';
import { get } from 'idb-keyval';

function TodoList() {
  
  const [dbTodoText] = useDbTodoText();
  const navigate = useNavigate();
  
  const todos = useMemo(
    () => dbTodoText.split('\n').filter(s => s.length > 0),
    [dbTodoText]
  );
  
  const handleNavigateToEdit = () => navigate(`/edit`);
  
  async function makeSearchParams() {
    let params = '?';
    for (let i = 0; i < Array(todos.length - 1).length; i++) {
      const isKeyDone = await get(String(i));
      if (isKeyDone) {
        params += `${i}=x&`;
      }
    }
    return params.slice(0, -1);
  }
  
  const handleCopyShareLink = async () => {
    const params = await makeSearchParams();
    const link: string = `https://instant-todos.web.app/share/${btoa(encodeURI(dbTodoText))}${params}`;
    
    if (navigator.share) {
      navigator.share({title: 'Instant To-dos', url: link}).then();
    } else {
      navigator.clipboard.writeText(link).then();
    }
  };
  
  return (
    <div className="todo-list-container">
      <div className="items-container">
        <div className="items">
          {todos.map((todo, index) =>
            <TodoItem key={index} dbKey={String(index)} todo={todo}></TodoItem>
          )}
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleNavigateToEdit}><EditIcon/> Edit</button>
        <button onClick={handleCopyShareLink}><ShareIcon/> Share</button>
      </div>
    </div>
  );
}

export default TodoList;
