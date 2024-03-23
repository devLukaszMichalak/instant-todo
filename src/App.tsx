import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import InputParser from './input-parser/InputParser.tsx';
import ShareParser from './share-parser/ShareParser.tsx';
import TodoCarrousel from './todo-carrousel/TodoCarrousel.tsx';
import { useAtomValue } from 'jotai';
import { defaultRouteAtom } from './common/atoms/atoms.ts';

function App() {
  
  const defaultRoute = useAtomValue(defaultRouteAtom);
  
  return (
    <div className="router">
      <BrowserRouter>
        <Routes>
          <Route path="share/:data" element={<ShareParser/>}/>
          <Route path="edit" element={<InputParser/>}/>
          <Route path="display" element={<TodoCarrousel/>}/>
          <Route path="*" element={<Navigate to={defaultRoute}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
