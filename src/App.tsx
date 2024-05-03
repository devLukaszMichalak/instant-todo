import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { defaultRouteAtom } from './common/atoms/atoms.ts';
import { AnimatePresence } from 'framer-motion';
import { lazy } from 'react';

const InputParser = lazy(() => import('./input-parser/InputParser.tsx'));
const ShareParser = lazy(() => import('./share-parser/ShareParser.tsx'));
const TodoCarrousel = lazy(() => import('./todo-carrousel/TodoCarrousel.tsx'));

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
