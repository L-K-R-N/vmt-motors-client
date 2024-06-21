import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

// import {TOKEN} from '../../../app/api/app.constants.js'
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getBrowserAndOS, setIsAuth } from '@/store/reducers/AuthSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import AuthService from '@/api/services/AuthService';
import { handleLogin } from '@/api/hooks/Auth';
import { ILoginFormShema, loginFormShema } from './LoginPage';
import { zodResolver } from '@hookform/resolvers/zod';

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
   } = useForm<ILoginFormShema>({ resolver: zodResolver(loginFormShema) });

   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const from = location.state?.from?.pathname || '/';

   const onSubmit: SubmitHandler<ILoginFormShema> = async (data) => {
      // dispatch(login(data));

      handleLogin(data);
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
