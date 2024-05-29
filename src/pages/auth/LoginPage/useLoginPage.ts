import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// import {TOKEN} from '../../../app/api/app.constants.js'
import { useAppSelector } from '@/hooks/useAppSelector.js';
import { setIsAuth, setIsSeller } from '@/store/reducers/AuthSlice';
import { get_token } from '@/api/public.api';
import { useAppDispatch } from '@/hooks/useAppDispatch';

export interface ILoginInputs {
   email: string;
   password: string;
}

export const useLoginPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<ILoginInputs>({
      mode: 'onChange',
   });

   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   // const [getToken, {isLoading}] = useGetTokenMutation()

   const [req_error, setReqError] = useState(false);
   const [loading, setIsLoading] = useState(false);
   const [captchaValue, setCaptchaValue] = useState('');

   const [accessToken, setAccessToken] = useState<string | null>(null);
   useEffect(() => {
      // if (isAuth) {
      if (isAuth) {
         navigate('/main');
      }
      // }
      console.log(isAuth);
   }, [isAuth]);

   const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
      dispatch(setIsAuth(true));
      console.log(data);

      navigate('/main');
      if (data.email === 'artem@gmail.com') {
         setIsSeller(true);
      } else {
         setIsSeller(false);
      }
      // const response = await get_token(data);

      // const access = response.data.token;

      // if (data.email === 'artem@gmail.com' && data.password === 'Parol123') {
      //    dispatch(setIsAuth(true));
      // }
   };

   return useMemo(
      () => ({
         register,
         handleSubmit,
         errors,
         // isLoading,
         onSubmit,
         req_error,
         loading,
         setCaptchaValue,
         captchaValue,
         control,
      }),
      [errors, req_error, loading, captchaValue],
   );
};
