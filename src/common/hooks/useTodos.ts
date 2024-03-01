import { useParams } from 'react-router-dom';

export function useTodos(): string[] {
  const {data} = useParams();
  
  return decodeURI(atob(data ?? ''))
    .split('\n')
    .filter(s => s.length > 0);
}
