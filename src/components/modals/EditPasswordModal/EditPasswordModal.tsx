import { FC } from 'react';
import styles from './EditPasswordModal.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputController } from '@/components/UI/TextFieldController/TextFieldController';

interface Props {
   isShow: boolean;
   setIsShow: (value: boolean) => void;
}

interface IChangePassInputs {
   currentPassword: string;
   newPassword: string;
   repeatPassword: string;
}

export const EditPasswordModal: FC<Props> = ({ isShow, setIsShow }) => {
   const {
      control,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm<IChangePassInputs>();

   const onSubmit: SubmitHandler<IChangePassInputs> = (data) => {
      setIsShow(false);

      console.log(data);

      reset();

      setValue('currentPassword', '');
      setValue('newPassword', '');
      setValue('repeatPassword', '');
   };

   const handleCancel = () => {
      setIsShow(false);

      reset();

      setValue('currentPassword', '');
      setValue('newPassword', '');
      setValue('repeatPassword', '');
   };
   return (
      <>
         <div
            className={[
               styles.modal,
               errors.currentPassword ||
               errors.newPassword ||
               errors.repeatPassword
                  ? styles.error
                  : '',
               isShow ? '' : styles.hidden,
            ].join(' ')}
         >
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
               <h4 className={styles.title}>NEW PASSWORD</h4>
               <InputController
                  name="currentPassword"
                  control={control}
                  rules={{ required: 'Please enter this field' }}
                  errors={errors}
                  label="Enter your current password"
               />
               <InputController
                  name="newPassword"
                  control={control}
                  rules={{ required: 'Please enter this field' }}
                  errors={errors}
                  label="Enter your new password"
               />
               <InputController
                  name="repeatPassword"
                  control={control}
                  rules={{ required: 'Please enter this field' }}
                  errors={errors}
                  label="Enter your repeat password"
               />

               <div className={styles.actionsBlock}>
                  <button
                     type="button"
                     className={styles.cancelBtn}
                     onClick={handleCancel}
                  >
                     Cancel
                  </button>

                  <button type="submit" className={styles.submitBtn}>
                     Save password
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};
