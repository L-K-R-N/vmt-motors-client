import cl from './RegisterPage.module.scss';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useHideSidebar } from '@/hooks/useLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterPage } from './useRegisterPage';
import { useState } from 'react';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { Controller } from 'react-hook-form';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout';

const RegisterPage = () => {
   const navigate = useNavigate();
   const [captchaValue, setCaptchaValue] = useState('');

   const { errors, handleSubmit, onSubmit, control, register } =
      useRegisterPage();

   // const {
   //    handleSubmit,
   //    formState: { errors },
   //    control,
   //    setFocus,
   // } = useForm<IRegisterInputs>();
   useHideSidebar();
   const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigate('/forgot-password');
   };

   // const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
   //    console.log(data);
   // };

   return (
      <AuthLayout title="Sign Up">
         <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <TextFieldController
               fieldType="input"
               control={control}
               errors={errors}
               label="E-mail/Phone number"
               name="email"
               rules={{ required: 'Enter email' }}
            />
            <TextFieldController
               fieldType="input"
               control={control}
               errors={errors}
               label="Password"
               name="password"
               rules={{ required: 'Enter password' }}
            />

            {/* <Controller
               name="isCompany"
               control={control}
               defaultValue={false}
               render={({ field }) => <input type="checkbox" {...field} />}
            /> */}

            <Button type="submit" title="Registration">
               Sign Up
            </Button>
            <div className={cl.control}>
               <Link to={'/signin'} className={cl.link}>
                  Авторизация
               </Link>
            </div>
         </form>
      </AuthLayout>
   );
};

export default RegisterPage;
