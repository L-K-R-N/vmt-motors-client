import cl from './RegisterPage.module.scss';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useHideLayout } from '@/hooks/useLayout';
import { useNavigate } from 'react-router-dom';
import { useRegisterForm } from './useRegisterForm';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const formShema = z.object({
   username: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(3, 'Слишком короткий username'),
   name: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(3, 'Слишком короткое имя'),
   email: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(3, 'Слишком короткая почта'),
   password: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(3, 'Слишком простой пароль'),
});

export type IRegisterFormShema = z.infer<typeof formShema>;
const RegisterPage = () => {
   const navigate = useNavigate();
   const registerForm = useRegisterForm();
   // const verificationForm = useVerificationForm();
   // const verificationForm = useVerification();
   const { isVerifing } = useAppSelector((state) => state.AuthReducer);
   useHideLayout();
   const { t } = useTranslation();

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (isVerifing) {
         navigate('/verify');
      }
   }, [isVerifing]);
   return (
      <AuthLayout type="signup">
         <form
            className={cl.form}
            onSubmit={registerForm.handleSubmit(registerForm.onSubmit)}
         >
            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label={t('username')}
               name="username"
               fieldType="input"
            />

            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label={t('name')}
               name="name"
               fieldType="input"
            />

            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label={t('email')}
               name="email"
               fieldType="input"
            />
            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label={t('password')}
               name="password"
               fieldType="input"
            />

            <Button type="submit" title="Registration">
               {t('signup')}
            </Button>
         </form>
      </AuthLayout>
   );
};

export default RegisterPage;
