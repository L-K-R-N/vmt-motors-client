import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { setIsAuth, verify } from '@/store/reducers/AuthSlice.js';

export interface IVerificationInputs {
   code: string;
}

export const useVerification = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IVerificationInputs>({
      mode: 'onChange',
   });
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const onSubmit: SubmitHandler<IVerificationInputs> = (data) => {
      dispatch(verify({ code: data.code }));
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
