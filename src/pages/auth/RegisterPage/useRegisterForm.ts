import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { useAppSelector } from '@/hooks/useAppSelector';
import { handleRegister } from '@/api/hooks/Auth';

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
   } = useForm<IRegisterInputs>({
      mode: 'onChange',
   });

   const navigate = useNavigate();
   const location = useLocation();

   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector((state) => state.AuthReducer);

   const from = location.state?.from?.pathname || '/';

   const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
      try {
         handleRegister(data, dispatch, navigate);

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
