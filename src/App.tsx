import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TodoList from './todo-list/TodoList.tsx';
import InputParser from './input-parser/InputParser.tsx';

function App() {
  
  return (
    <div className="router">
      <BrowserRouter>
        <Routes>
          <Route path="edit/:data?" element={<InputParser/>}/>
          <Route path="display/:data" element={<TodoList/>}/>
          <Route path="*" element={<Navigate to="/edit/"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
