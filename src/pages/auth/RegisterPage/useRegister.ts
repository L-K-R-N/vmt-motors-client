import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { getBrowserAndOS, register, setIsAuth } from '@/store/reducers/AuthSlice.js';
import { useAppSelector } from '@/hooks/useAppSelector';
import AuthService from '@/api/services/AuthService';

export interface IRegisterInputs {
   username: string;
   password: string;
   name: string;
   gender: 'MALE' | 'FEMALE';
   dateOfBirth: Date;
   email: string;
}

export const useRegister = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IRegisterInputs>({
      mode: 'onChange',
   }); 
   
   const navigate = useNavigate(); 
   const location = useLocation(); 


   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const [isVerifing] = useState(false);


   // useEffect(() => {
   //    if (isAuth) {
   //       navigate('/about');
   //    }
   //    console.log(isAuth);
   // }, [isAuth]);


   const handleRegister = async (inputs: IRegisterInputs) => {
      const {
         // dateOfBirth,
         name,
         password,
         username,
         email,
         gender,
      } = inputs;
      const dateOfBirth = new Date();
      const registerResponse = await AuthService.register({
         dateOfBirth,
         password,
         username,
         gender,
         name,
         email
      });

      console.log(registerResponse.data);

      if (registerResponse.status === 200) {
         const loginResponse = await AuthService.login({
            username,
            password,
            deviceName: getBrowserAndOS(navigator.userAgent),
         });

         console.log(loginResponse);

         localStorage.setItem(
            'token',
            loginResponse.data.jwtToken,
         );

         localStorage.setItem(
            'refresh',
            loginResponse.data.refreshToken,
         );

         dispatch(setIsAuth(true));


         navigate('/about')
         console.log(isAuth);
      }
   }
  
   const from = location.state?.from?.pathname || '/';

   const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
      try {
         // console.log(data);
         // dispatch(register(data));

         // dispatch(setIsAuth(true));
         // // localStorage.setItem('isAuth', 'true');
         // navigate(from, { replace: true });

         handleRegister(data)

         console.log(isAuth);
      } catch (e) {
         console.log(e);
      }
   };

   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,
         isVerifing,
      }),
      [errors],
   );
};
