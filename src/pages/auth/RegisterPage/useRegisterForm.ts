import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { useAppSelector } from '@/hooks/useAppSelector';
import { handleRegister } from '@/api/hooks/Auth';
import { IRegisterFormShema, registerFormShema } from './RegisterPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface IRegisterInputs {
   username: string;
   password: string;
   name: string;
   gender: 'MALE' | 'FEMALE';
   dateOfBirth: Date;
   email: string;
}

export const useRegisterForm = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IRegisterFormShema>({ resolver: zodResolver(registerFormShema) });
   
   const navigate = useNavigate();
   const location = useLocation();

   const { isAuth } = useAppSelector((state) => state.AuthReducer);

   const from = location.state?.from?.pathname || '/';

  

   const onSubmit: SubmitHandler<IRegisterFormShema> = (data) => {
      try {
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
      }),
      [errors],
   );
};
