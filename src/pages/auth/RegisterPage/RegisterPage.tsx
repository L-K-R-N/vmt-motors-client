import cl from './RegisterPage.module.scss';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useHideLayout, useShowHeader } from '@/hooks/useLayout';
import { useNavigate } from 'react-router-dom';
import { useRegisterForm } from './useRegisterForm';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/;
export const usernameRegex = /^[a-zA-Z0-9]{3,25}$/;

export const registerFormShema = z.object({
   username: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(3, 'Слишком короткий username')
      .max(25, 'Слишком длинный username')
      .refine((val) => usernameRegex.test(val), {
         message:
            'Username может состоять только из букв a-Z и должен содержать в себе цифры',
      }),
   name: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(4, 'Слишком короткое имя')
      .max(64, 'Слишком длинное имя'),

   password: z
      .string({
         required_error: 'Это обязательное поле',
      })
      // .trim()
      // .min(8, 'Слишком короткий пароль')
      // .max(64, 'Слишком длинный пароль')
      .refine((val) => passwordRegex.test(val), {
         message:
            'Пароль может состоять только из букв a-Z, должен содержать в себе цифры',
      }),
});

export type IRegisterFormShema = z.infer<typeof registerFormShema>;
const RegisterPage = () => {
   const navigate = useNavigate();
   const registerForm = useRegisterForm();
   // const verificationForm = useVerificationForm();
   // const verificationForm = useVerification();
   const { isVerifing } = useAppSelector((state) => state.AuthReducer);
   useShowHeader();
   const { t } = useTranslation();

   const dispatch = useAppDispatch();

   useEffect(() => {
      // const { accessToken, refreshToken } = getTokens();
      // if (accessToken && refreshToken) {
      //    const decodedToken: NewJwtPayload = jwtDecode(accessToken);
      //    localStorage.setItem('token', res.data.jwtToken);
      //    localStorage.setItem('refresh', res.data.refreshToken);
      //    if (decodedToken.role.includes('VERIFIED')) {
      //       store.dispatch(setIsAuth(true));
      //       window.location.pathname = '/about';
      //    } else {
      //       store.dispatch(setIsVerifing(true));
      //       window.location.pathname = '/verify';
      //    }
      // } else {
      //    handleLogout()
      // }
   }, []);
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
