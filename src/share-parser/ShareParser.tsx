import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { defaultRouteAtom } from '../common/atoms/atoms.ts';

const ShareParser = () => {
  
  const {data} = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const setDefaultRoute = useSetAtom(defaultRouteAtom);
  
  const todoText = useMemo(() => decodeURI(atob(data ?? '')), [data]);
  
  const pages: number[] = useMemo(() => {
    const pagesString = localStorage.getItem('pages');
    
    if (pagesString !== null && pagesString.length > 0) {
      return pagesString
        .slice(1, -1)
        .split(',')
        .map(val => Number(val));
    } else {
      return [];
    }
    
  }, []);
  
  const pageCount = useMemo(() => pages.length, [pages.length]);
  
  useEffect(() => {
    Array
      .from(searchParams.keys())
      .forEach(key => localStorage.setItem(`${key}-${pageCount}`, String(true)));
    
    localStorage.setItem(`todoText-${pageCount}`, `"${todoText.replace(/\n/g, '\\n')}"`);
    localStorage.setItem(`pages`, pages.length !== 0 ? `[${String(pages)},${pageCount}]` : `[0]`);
    localStorage.setItem(`currentPage`, String(pageCount));
    
    setDefaultRoute('/display');
    navigate('/display');
  }, [navigate, pageCount, pages, searchParams, setDefaultRoute, todoText]);
  
  return <>Loading...</>;
};

export default ShareParser;
