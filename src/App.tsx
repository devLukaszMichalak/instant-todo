import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import InputParser from './input-parser/InputParser.tsx';
import ShareParser from './share-parser/ShareParser.tsx';
import TodoCarrousel from './todo-arrousel/TodoCarrousel.tsx';

function App() {
  
  return (
    <div className="router">
      <BrowserRouter>
        <Routes>
          <Route path="share/:data" element={<ShareParser/>}/>
          <Route path="edit" element={<InputParser/>}/>
          <Route path="display" element={<TodoCarrousel/>}/>
          <Route path="*" element={<Navigate to="/edit"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
