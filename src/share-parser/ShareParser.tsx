import { useEffect } from 'react';
import { todoTextDbKey } from '../common/db/db-keys.ts';
import { set } from 'idb-keyval';
import { useNavigate, useParams } from 'react-router-dom';

const ShareParser = () => {
  
  const {data} = useParams();
  const navigate = useNavigate();
  
  const todoText = decodeURI(atob(data ?? ''));
  
  useEffect(() => {
    set(todoTextDbKey, todoText).then(() => navigate('/display'));
  }, [navigate, todoText]);
  
  return <>Loading...</>;
};

export default ShareParser;
