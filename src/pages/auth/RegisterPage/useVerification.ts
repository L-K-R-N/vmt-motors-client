import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { verify } from '@/store/reducers/AuthSlice.js';

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
