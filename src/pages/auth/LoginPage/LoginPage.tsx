// import LoginLayout from '../../../components/login-layout/LoginLayout.jsx';
// import Field from '../../../components/ui/field/Field.jsx';
// import { useLoginPage } from './useLoginPage.js';
// import Button from '../../../components/ui/button/Button.js';
import cl from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
// import CaptchaInput from '../../../components/ui/field/CaptchaInput.jsx';
import { useHideSidebar, useShowHeader } from '../../../hooks/useLayout.ts';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useLoginPage } from './useLoginPage.ts';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController.tsx';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout.tsx';

const LoginPage = () => {
   const navigate = useNavigate();

   const { errors, handleSubmit, onSubmit, control } = useLoginPage();

   // const {
   //    handleSubmit,
   //    formState: { errors },
   //    control,
   //    setFocus,
   // } = useForm<ILoginInputs>();
   useShowHeader();

   // const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
   //    console.log(data);
   // };
   return (
      <AuthLayout title="Log In">
         <form className={cl.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <TextFieldController
               control={control}
               errors={errors}
               label="E-mail/Phone number"
               name="email"
               fieldType="input"
               rules={{ required: 'E-mail/Phone number' }}
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
            <div className={cl.control}>
               <Link to={'/recover'} className={cl.link}>
                  Восстановить пароль
               </Link>
               <Link to={'/signup'} className={cl.link}>
                  Регистрация
               </Link>
            </div>
         </form>
      </AuthLayout>
   );
};

export default LoginPage;
