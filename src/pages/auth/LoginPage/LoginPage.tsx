import cl from './LoginPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHideLayout } from '../../../hooks/useLayout.ts';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useLoginPage } from './useLoginPage.ts';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController.tsx';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout.tsx';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
   const { t } = useTranslation();
   const { errors, handleSubmit, onSubmit, control } = useLoginPage();

   // const {
   //    handleSubmit,
   //    formState: { errors },
   //    control,
   //    setFocus,
   // } = useForm<ILoginInputs>();
   useHideLayout();

   // const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
   //    console.log(data);
   // };

   // useEffect(() => {
   //    if (localStorage.getItem('isAuth')) {
   //       navigate('/about');
   //    }
   // }, []);

   return (
      <AuthLayout type="signin">
         <form className={cl.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <TextFieldController
               control={control}
               errors={errors}
               label={t('username')}
               name="username"
               fieldType="input"
               rules={{ required: 'Username number' }}
            />

            <TextFieldController
               control={control}
               errors={errors}
               label={t('password')}
               name="password"
               fieldType="input"
               rules={{ required: 'Enter password' }}
            />

            <Button type="submit" title={t('signin')}>
               {t('signin')}
            </Button>
         </form>
      </AuthLayout>
   );
};

export default LoginPage;
