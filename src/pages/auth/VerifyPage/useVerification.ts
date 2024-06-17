import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { useNavigate } from 'react-router-dom';
import { handleVerify } from '@/api/hooks/Auth';

export interface IVerificationInputs {
   code: string;
}

export const useVerificationForm = () => {
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
      try {
         handleVerify({ code: data.code }, dispatch, navigate);
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
