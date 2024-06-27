import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import PersonService from '@/api/services/PersonService';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { isValid } from 'date-fns';

export const profileFormShema = z.object({
   name: z.string().optional(),
   // .trim()
   // .min(4, 'Слишком короткое имя')
   // .max(64, 'Слишком длинное имя'),
   // status: z.string().optional(),
   gender: z
      .object({
         value: z.union([z.literal('MALE'), z.literal('FEMALE')]).optional(),
         label: z.string().optional(),
      })
      .nullable(),
   // phoneNumber: z
   //    .string()
   //    .trim()
   //    .min(4, 'Телефон не должен быть короче 4 символов')
   //    .max(13, 'Телефон не должен быть длиннее 13 символов'),
   description: z
      .string()
      .max(100, 'Описание не должно быть длиннее 100 символов')
      .optional(),
   contact: z.string(),
   dateOfBirth: z
      .date()
      .refine((date) => isValid(date), 'Неверная дата')
      .optional(),
});

export type IProfileFormShema = z.infer<typeof profileFormShema>;

export const useChangeProfile = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
   } = useForm<IProfileFormShema>({ resolver: zodResolver(profileFormShema) });
   const navigate = useNavigate();
   const { me } = useAppSelector((state) => state.UserReducer);

   const onSubmit: SubmitHandler<IProfileFormShema> = (data) => {
      console.log(1);
      try {
         if (me) {
            if (data.name) {
               PersonService.changePersonName(data.name);
            }
            if (data.contact) {
               PersonService.changePersonContact(data.contact);
            }
            if (data.description) {
               PersonService.changePersonDesc(data.description);
            }
            // if (data.dateOfBirth) {
            //    PersonService.changePersonDateOfBirth(data.dateOfBirth);
            // }
            if (data.gender && data.gender.value) {
               PersonService.changePersonGender(data.gender.value);
            }
            if (data.dateOfBirth) {
               PersonService.changePersonDateOfBirth(data.dateOfBirth);
            }

            toast.success('Данные усешно обновлены!');
            navigate(-1);
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
         reset,
      }),
      [errors],
   );
};
