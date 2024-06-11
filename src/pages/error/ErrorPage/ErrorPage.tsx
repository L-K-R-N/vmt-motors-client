import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect } from 'react';

interface Props {}

export const ErrorPage: React.FC<Props> = () => {
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   useEffect(() => {
      if (!isAuth) {
         // navigate('/signin');
      }
   }, []);
   return <>404</>;
};
