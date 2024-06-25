import cl from './ChangeProfilePage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useEffect } from 'react';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useAddAdvert } from './useChangeProfile';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button/Button';

import { z } from 'zod';
import { isValid } from 'date-fns';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const profileFormShema = z.object({
   name: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(4, 'Слишком короткое имя')
      .max(64, 'Слишком длинное имя'),
   status: z.string(),
   gender: z.union([z.literal('MALE'), z.literal('FEMALE')]),
   phoneNumber: z
      .string()
      .trim()
      .min(4, 'Телефон не должен быть короче 4 символов')
      .max(13, 'Телефон не должен быть длиннее 13 символов'),
   description: z
      .string()
      .max(100, 'Описание не должно быть длиннее 100 символов'),
   contact: z.string(),
   dateOfBirth: z.date().refine((date) => isValid(date), 'Неверная дата'),

   // gender: z
   //    .string({
   //       required_error: 'Это обязательное поле',
   //    })
   //    .trim()

   //    .refine((val) => usernameRegex.test(val), {
   //       message: 'Неверный login',
   //    }),
});

export type IProfileFormShema = z.infer<typeof profileFormShema>;

interface Props {}

const ChangeProfilePage: React.FC<Props> = () => {
   useHideSidebar();
   const { t } = useTranslation();
   const { me } = useAppSelector((state) => state.UserReducer);
   const { errors, control, handleSubmit, onSubmit } = useAddAdvert();
   const navigate = useNavigate();
   useEffect(() => {
      // brandsOptions = toIOption(brands);
      if (!me) {
         navigate(-1);

         toast.error('Вы не авторизованы');
      }
   }, []);
   return (
      <div className={cl.add}>
         <div className={cl.addHeader}>
            <h3 className={cl.addTitle}>Profile settings</h3>
         </div>
         {me && (
            <div className={cl.wrapper}>
               <form className={cl.addForm} onSubmit={handleSubmit(onSubmit)}>
                  <div className={cl.block}>
                     <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        label="Name"
                        name="name"
                        defaultValue={me.name}
                        placeholder={t('name')}
                     />
                     <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="textarea"
                        label="Description"
                        defaultValue={me.description}
                        name="description"
                        placeholder={t('desc')}
                     />
                     <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        defaultValue={me.contact}
                        label="Contact"
                        name="contact"
                        placeholder={t('contact')}
                     />
                     <SelectController
                        control={control}
                        errors={errors}
                        // defaultValue={me.gender ? me.gender : null}
                        name="gender"
                        placeholder={t('gender')}
                        isMulti={false}
                        options={[
                           {
                              value: 'MALE',
                              label: t('male'),
                           },
                           {
                              value: 'FEMALE',
                              label: t('female'),
                           },
                        ]}
                     />
                     <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        defaultValue={me.phoneNumber}
                        label={t('phoneNumber')}
                        name="phoneNumber"
                     />
                     {/* <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        label={t('phoneNumber')}
                        name="phoneNumber"
                     /> */}
                  </div>

                  <Button type="submit" title={t('place_ad')}>
                     Save settings
                  </Button>
               </form>
            </div>
         )}
      </div>
   );
};

export default ChangeProfilePage;
