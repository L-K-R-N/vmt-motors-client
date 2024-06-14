import cl from './RegisterPage.module.scss';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useHideLayout } from '@/hooks/useLayout';
import { useNavigate } from 'react-router-dom';
import { useRegister } from './useRegister';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout';
import { IVerificationInputs } from './useVerification';
import { useLayoutEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { verify } from '@/store/reducers/AuthSlice';

const RegisterPage = () => {
   const navigate = useNavigate();

   const registerForm = useRegister();
   // const verificationForm = useVerification();
   const [code, setCode] = useState('');
   useHideLayout();
   // const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
   //    e.preventDefault();
   //    navigate('/forgot-password');
   // };
   const { handleSubmit } = useForm<IVerificationInputs>({
      mode: 'onChange',
   });
   const dispatch = useAppDispatch();
   // const navigate = useNavigate();

   const onSubmit: SubmitHandler<IVerificationInputs> = () => {
      dispatch(verify({ code: code }));
   };

   // useLayoutEffect(() => {
   //    if (localStorage.getItem('isAuth')) {
   //       navigate('/about');
   //    }
   // }, []);
   return (
      <AuthLayout title="Sign Up" link="signin">
         {!registerForm.isVerifing ? (
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
         ) : (
            <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
               {/* <TextFieldController
                  control={verificationForm.control}
                  errors={verificationForm.errors}
                  label="Verification code"
                  name="code"
                  fieldType="input"
                  rules={{ required: 'Verification code is required' }}
               /> */}
               <input
                  type="text"
                  value={code}
                  title="Verification Code"
                  onChange={(e) => setCode(e.target.value)}
               />
               <Button type="submit" title="Verification">
                  Confirm
               </Button>
            </form>
         )}
      </AuthLayout>
   );
};

export default RegisterPage;
