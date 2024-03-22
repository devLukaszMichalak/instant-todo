import { useAtom } from 'jotai/index';
import { useMemo } from 'react';
import { atomWithStorage } from 'jotai/utils';


export function useCurrentPageTodoText(currentPage: number): [string, (val: string) => void] {
  
  const todoTextAtom = useMemo(() =>
    atomWithStorage(`todoText-${currentPage}`, ''), [currentPage]);
  
  const [currentPageTodoText, setCurrentPageTodoText] = useAtom(todoTextAtom);
  
  return [currentPageTodoText, setCurrentPageTodoText];
}
