import './App.css'
import InputParser from './input-parser/InputParser.tsx';
import { useState } from 'react';

function App() {
  
  const [todos, setTodos] = useState<string[]>([]);
  
  const parseInput = (todoText: string) => setTodos(todoText.split("\n"));
  
  const parsedTodos = todos.map((todo, index) => (
    <div key={index}>{todo} {index}</div>
  ));
  
  return (
    <>
      <InputParser parseInput={parseInput}></InputParser>
      <div>{parsedTodos}</div>
    </>
  )
}

export default App
