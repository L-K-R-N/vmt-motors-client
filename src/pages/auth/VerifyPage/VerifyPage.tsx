import cl from './VerifyPage.module.scss';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useHideLayout } from '@/hooks/useLayout';
import { Navigate, useNavigate } from 'react-router-dom';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout';
import { useVerificationForm } from './useVerification';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

const VerifyPage = () => {
   const navigate = useNavigate();
   const { isVerifing } = useAppSelector((state) => state.AuthReducer);
   // const verificationForm = useVerificationForm();
   const { control, errors, handleSubmit, onSubmit } = useVerificationForm();
   const [code, setCode] = useState('');

   useHideLayout();

   const dispatch = useAppDispatch();

   return (
      <AuthLayout title="Verification" link="signup">
         <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <TextFieldController
               control={control}
               errors={errors}
               label="Verification code"
               name="code"
               fieldType="input"
               rules={{ required: 'Verification code is required' }}
            />
            {/* <input
               type="text"
               value={code}
               name="code"
               title="Verification Code"
               onChange={(e) => setCode(e.target.value)}
            /> */}
            <Button type="submit" title="Verification">
               Verify
            </Button>
         </form>
      </AuthLayout>
   );
};

export default VerifyPage;
