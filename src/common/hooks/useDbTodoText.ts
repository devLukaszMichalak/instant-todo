import { useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';
import { todoTextDbKey } from '../db/db-keys.ts';

export function useDbTodoText(): [string, (value: string) => void] {
  
  const [todoText, setTodoText] = useState<string>('');
  
  useEffect(() => {
    get(todoTextDbKey).then((dbTodos: string | undefined) => {
      if (dbTodos) {
        setTodoText(dbTodos);
      }
    });
  }, []);
  
  const setDbTodoText = (text: string) =>
    set(todoTextDbKey, text).then(() => setTodoText(text));
  
  return [todoText, setDbTodoText];
}
