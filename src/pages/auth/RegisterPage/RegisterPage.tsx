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

const RegisterPage = () => {
   const navigate = useNavigate();
   const registerForm = useRegisterForm();
   // const verificationForm = useVerificationForm();
   // const verificationForm = useVerification();
   const { isVerifing } = useAppSelector((state) => state.AuthReducer);
   useHideLayout();

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (isVerifing) {
         navigate('/verify');
      }
   }, [isVerifing]);
   return (
      <AuthLayout title="Sign Up" link="signin">
         <form
            className={cl.form}
            onSubmit={registerForm.handleSubmit(registerForm.onSubmit)}
         >
            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label="Username"
               name="username"
               fieldType="input"
               rules={{ required: 'Username is required' }}
            />

            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label="Name"
               name="name"
               fieldType="input"
               rules={{ required: 'Name is required' }}
            />
            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label="Date of birth"
               name="dateOfBirth"
               fieldType="input"
               rules={{ required: 'Date of birth is required' }}
            />
            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label="Password"
               name="password"
               fieldType="input"
               rules={{ required: 'Password is required' }}
            />
            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label="Email"
               name="email"
               fieldType="input"
               rules={{ required: 'Email is required' }}
            />
            <TextFieldController
               control={registerForm.control}
               errors={registerForm.errors}
               label="Gender"
               name="gender"
               fieldType="input"
               rules={{ required: 'Gender is required' }}
            />
            <Button type="submit" title="Registration">
               Sign Up
            </Button>
         </form>
      </AuthLayout>
   );
};

export default RegisterPage;
