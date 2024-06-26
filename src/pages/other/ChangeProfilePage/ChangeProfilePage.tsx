import cl from './ChangeProfilePage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useEffect } from 'react';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useChangeProfile } from './useChangeProfile';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button/Button';

import { z } from 'zod';
import { isValid } from 'date-fns';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


interface Props {}

const ChangeProfilePage: React.FC<Props> = () => {
   useHideSidebar();
   const { t } = useTranslation();
   const { me } = useAppSelector((state) => state.UserReducer);
   const { errors, control, handleSubmit, onSubmit, reset } = useChangeProfile();
   const navigate = useNavigate();
   useEffect(() => {
      // brandsOptions = toIOption(brands);
      if (!me) {
         navigate(-1);

         toast.error('Вы не авторизованы');
      }
   }, []);

   const handleCancel = () => {
      reset();

      navigate(-1)
   }

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
                        defaultValue={{
                           value: me.gender,
                           label: me.gender
                        }}
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
                     {/* <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        defaultValue={me.phoneNumber}
                        label={t('phoneNumber')}
                        name="phoneNumber"
                     /> */}
                     {/* <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        label={t('phoneNumber')}
                        name="phoneNumber"
                     /> */}
                  </div>

                  <div className={cl.changeBtns}>
                     <button className={cl.closeBtn} type="button" title={t('cancel')} onClick={handleCancel}>
                        Cancel
                     </button>
                     <Button type="submit" title={t('place_ad')}>
                        Save settings
                     </Button>
                    
                  </div>
               </form>
            </div>
         )}
      </div>
   );
};

export default ChangeProfilePage;
