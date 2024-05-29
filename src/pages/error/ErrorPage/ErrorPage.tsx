import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {}

export const ErrorPage: React.FC<Props> = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const navigate = useNavigate();
   useEffect(() => {
      if (!isAuth) {
         navigate('/signin');
      }
   }, []);
   return <>404</>;
};
