import './App.css';
import InputArea from './input-parser/InputComponent.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './todo-list/TodoList.tsx';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<InputArea/>}/>
        <Route path=":data" element={<TodoList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
