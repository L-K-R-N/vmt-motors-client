import { setIsAuth } from '@/store/reducers/AuthSlice';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
   const navigate = useNavigate();

   const handleLogout = () => {
      // localStorage.clear();
      setIsAuth(false);

      window.location.reload();

      navigate('/home');
   };

   return handleLogout;
};
