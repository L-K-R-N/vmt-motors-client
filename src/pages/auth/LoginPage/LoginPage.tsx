// import LoginLayout from '../../../components/login-layout/LoginLayout.jsx';
// import Field from '../../../components/ui/field/Field.jsx';
// import { useLoginPage } from './useLoginPage.js';
// import Button from '../../../components/ui/button/Button.js';
import cl from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
// import CaptchaInput from '../../../components/ui/field/CaptchaInput.jsx';
import { useHideLayout } from '../../../hooks/useLayout.ts';
import { Button } from '@/components/UI/Button/Button.tsx';
import { ILoginInputs, useLoginPage } from './useLoginPage.ts';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController.tsx';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout.tsx';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
   const navigate = useNavigate();

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
   return (
      <AuthLayout title="Log In" link="signup">
         <form className={cl.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <TextFieldController
               control={control}
               errors={errors}
               label="Username"
               name="username"
               fieldType="input"
               rules={{ required: 'Username number' }}
            />

            <TextFieldController
               control={control}
               errors={errors}
               label="Password"
               name="password"
               fieldType="input"
               rules={{ required: 'Enter password' }}
            />

            <Button type="submit" title="Login">
               Sign In
            </Button>
         </form>
      </AuthLayout>
   );
};

export default LoginPage;
