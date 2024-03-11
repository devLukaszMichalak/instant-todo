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
    
    const setDbStateFromParams = async () => {
      await clear();
      
      const shareItemsToSave = Array
        .from(searchParams.keys())
        .map(key => set(key, true));
      
      shareItemsToSave.push(set(todoTextDbKey, todoText));
      
      await Promise.all(shareItemsToSave);
    };
    
    setDbStateFromParams().then(() => navigate('/display'));
    
  }, [navigate, todoText, searchParams]);
  
  return <>Loading...</>;
};

export default ShareParser;
