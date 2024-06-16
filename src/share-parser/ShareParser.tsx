import './ShareParser.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currentPageAtom, defaultRouteAtom, pageCountAtom, pagesAtom } from '../common/atoms/Atoms.ts';
import { useCurrentPageTodoText } from '../common/hooks/UseCurrentPageTodoText.ts';
import { setIsKeyDone } from '../common/atoms/IsKeyDone.ts';
import { PulseLoader } from 'react-spinners';

const ShareParser = () => {
  
  const {data} = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const setDefaultRoute = useSetAtom(defaultRouteAtom);
  const [pages, setPages] = useAtom(pagesAtom);
  const pageCount = useAtomValue(pageCountAtom);
  const [, setCurrentPageTodoText] = useCurrentPageTodoText(pageCount);
  
  const setCurrentPage = useSetAtom(currentPageAtom);
  
  const todoText = useMemo(() => decodeURI(atob(data ?? '')), [data]);
  
  useEffect(() => {
    Array.from(searchParams.keys())
      .forEach(key => setIsKeyDone(key, pageCount, true));
    
    setCurrentPageTodoText(todoText);
    
    Promise.all([
      setPages(pages.length !== 0 ? [...pages, pageCount] : [0]),
      setCurrentPage(pageCount),
      setDefaultRoute('/display')
    ]).then(() => navigate('/display'));
    
  }, []);
  
  return <>
    <div className="spinner-container">
      <PulseLoader/>
    </div>
  </>;
};

export default ShareParser;
