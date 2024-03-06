import { useEffect } from 'react';
import { todoTextDbKey } from '../common/db/db-keys.ts';
import { clear, set } from 'idb-keyval';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const ShareParser = () => {
  
  const {data} = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const todoText = decodeURI(atob(data ?? ''));
  
  useEffect(() => {
    
    clear().then(async () => {
      for (const key of searchParams.keys()) {
        await set(key, true);
      }
      await set(todoTextDbKey, todoText);
      
    }).then(() => navigate('/display'));
    
  }, [navigate, todoText, searchParams]);
  
  return <>Loading...</>;
};

export default ShareParser;
