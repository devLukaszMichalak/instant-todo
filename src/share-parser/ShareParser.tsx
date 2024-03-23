import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currentPageAtom, defaultRouteAtom, pageCountAtom, pagesAtom } from '../common/atoms/atoms.ts';
import { useCurrentPageTodoText } from '../common/hooks/use-current-page-todo-text.ts';
import { setIsKeyDone } from '../common/atoms/is-done-key.ts';

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
    setPages(pages.length !== 0 ? [...pages, pageCount] : [0]);
    setCurrentPage(pageCount);
    setDefaultRoute('/display');
    
    navigate('/display');
  }, []);
  
  return <>Loading...</>;
};

export default ShareParser;
