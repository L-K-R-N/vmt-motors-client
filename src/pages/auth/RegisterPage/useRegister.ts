import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { register, setIsAuth } from '@/store/reducers/AuthSlice.js';
import { useAppSelector } from '@/hooks/useAppSelector';

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
   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const [isVerifing, setIsVerifing] = useState(false);
   const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
      dispatch(setIsAuth(true));
      try {
         console.log(data);
         dispatch(register(data));
         localStorage.setItem('isAuth', 'true');
         
         navigate('/about');

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
