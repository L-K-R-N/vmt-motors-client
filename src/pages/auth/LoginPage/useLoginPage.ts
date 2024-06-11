import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// import {TOKEN} from '../../../app/api/app.constants.js'
import { useAppSelector } from '@/hooks/useAppSelector.js';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { login, setIsAuth } from '@/store/reducers/AuthSlice';

export interface ILoginInputs {
   username: string;
   password: string;
   deviceName: string;
}

export const useLoginPage = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<ILoginInputs>({
      mode: 'onChange',
   });

   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const [accessToken, setAccessToken] = useState<string | null>(null);
   // useEffect(() => {
   //    if (isAuth) {
   //       navigate('/main');
   //    }
   //    console.log(isAuth);
   // }, [isAuth]);

   const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
      dispatch(login(data));
      dispatch(setIsAuth(true));
      localStorage.setItem('isAuth', 'true');
      
      console.log(data);

      navigate('/about');
   };

   return useMemo(
      () => ({
         handleSubmit,
         errors,
         // isLoading,
         onSubmit,

         control,
      }),
      [errors],
   );
};
