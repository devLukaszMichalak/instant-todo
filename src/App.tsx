import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import InputParser from './input-parser/InputParser.tsx';
import ShareParser from './share-parser/ShareParser.tsx';
import TodoCarrousel from './todo-carrousel/TodoCarrousel.tsx';
import { useAtomValue } from 'jotai';
import { defaultRouteAtom } from './common/atoms/atoms.ts';
import { AnimatePresence } from 'framer-motion';

function App() {
  
  const defaultRoute = useAtomValue(defaultRouteAtom);
  const location = useLocation();
  
  return (
    <div className="router">
      <AnimatePresence mode={'wait'}>
        <Routes location={location} key={location.pathname}>
          <Route path="share/:data" element={<ShareParser/>}/>
          <Route path="edit" element={<InputParser/>}/>
          <Route path="display" element={<TodoCarrousel/>}/>
          <Route path="*" element={<Navigate to={defaultRoute}/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
