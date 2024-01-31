import './App.css';
import InputParser from './input-parser/InputParser.tsx';
import { useState } from 'react';
import TodoList from './todo-list/TodoList.tsx';

function App() {
  
  const [todos, setTodos] = useState<string[]>([]);
  
  const parseInput = (todoText: string) => setTodos(
    todoText
      .split('\n')
      .filter(text => text.length > 0)
  );
  
  return (
    <>
      {todos.length === 0 ? (
        <InputParser parseInput={parseInput}></InputParser>
      ) : (
        <TodoList todos={todos}></TodoList>
      )}
    </>
  );
}

export default App;
