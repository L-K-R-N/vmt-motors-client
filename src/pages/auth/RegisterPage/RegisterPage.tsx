import cl from './RegisterPage.module.scss';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useShowHeader } from '@/hooks/useLayout';
import { useNavigate } from 'react-router-dom';
import { useRegisterForm } from './useRegisterForm';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { passwordRegex, usernameRegex } from '../models/models';

export const registerFormShema = z.object({
   username: z
      .string({
         required_error: 'required_error',
      })
      .trim()
      .min(3, 'min_length_error')
      .max(25, 'max_length_error')
      .refine((val) => usernameRegex.test(val), {
         message: 'username_error',
      }),
   name: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(4, 'Слишком короткое имя')
      .max(64, 'Слишком длинное имя'),
   email: z
      .string({
         required_error: 'required_error',
      })
      .email('email_error'),
   password: z
      .string({
         required_error: 'required_error',
      })
      // .trim()
      // .min(8, 'Слишком короткий пароль')
      // .max(64, 'Слишком длинный пароль')
      .refine((val) => passwordRegex.test(val), {
         message: 'password_error',
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
   const [isPassShow, setIsPassShow] = useState(false);

   const dispatch = useAppDispatch();

   useEffect(() => {
      // const { accessToken, refreshToken } = getTokens();
      // if (accessToken && refreshToken) {
      //    const decodedToken: NewJwtPayload = jwtDecode(accessToken);
      //    localStorage.setItem('token', res?.data?.jwtToken);
      //    localStorage.setItem('refresh', res?.data?.refreshToken);
      //    if (decodedToken.role?.includes('VERIFIED')) {
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
               label={t('name')}
               name="name"
               fieldType="input"
            />
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
               label={t('email')}
               name="email"
               fieldType="input"
            />
            <div className={cl.passContainer}>
               <TextFieldController
                  control={registerForm.control}
                  errors={registerForm.errors}
                  label={t('password')}
                  name="password"
                  fieldType="input"
                  rules={{ required: 'Enter password' }}
                  inputType={isPassShow ? 'text' : 'password'}
               />
               <button
                  className={cl.passBtn}
                  type="button"
                  onClick={() => setIsPassShow(!isPassShow)}
               >
                  {isPassShow ? <FaEye /> : <FaEyeSlash />}
               </button>
            </div>

            <Button type="submit" title="Registration">
               {t('signup')}
            </Button>
         </form>
      </AuthLayout>
   );
};

export default RegisterPage;
