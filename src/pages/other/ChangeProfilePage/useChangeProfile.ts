import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IProfileFormShema, profileFormShema } from './ChangeProfilePage';
import { zodResolver } from '@hookform/resolvers/zod';
import PersonService from '@/api/services/PersonService';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toast } from 'react-toastify';

export const useAddAdvert = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
   } = useForm<IProfileFormShema>({ resolver: zodResolver(profileFormShema) });
   const navigate = useNavigate();
   const { me } = useAppSelector((state) => state.UserReducer);

   const onSubmit: SubmitHandler<IProfileFormShema> = (data) => {
      try {
         if (me) {
            if (data.name) {
               PersonService.changePersonName(me?.id, data.name);
            }
            if (data.contact) {
               PersonService.changePersonName(me?.id, data.contact);
            }
            if (data.description) {
               PersonService.changePersonName(me?.id, data.description);
            }
            // if (data.dateOfBirth) {
            //    PersonService.changePersonName(me?.id, data.dateOfBirth);
            // }
            // if (data.name) {
            //    PersonService.changePersonName(me?.id, data.name);
            // }
            // if (data.name) {
            //    PersonService.changePersonName(me?.id, data.name);
            // }
            toast.success('Данные усешно обновлены!');
         }
      } catch (e) {
         toast.error('Не удалось изменить данные');
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
