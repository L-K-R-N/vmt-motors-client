import cl from './ForgotPassPage.module.scss';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useShowHeader } from '@/hooks/useLayout';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout';
import { useState } from 'react';
import { z } from 'zod';
import { TextField } from '@/components/UI/TextField/TextField';
import { handleForgotSend, handleForgotVerify } from '@/api/hooks/Auth';

export const forgotPassFormShema = z.object({
   email: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(3, 'Слишком короткая почта')
      .email(),
   code: z.string({
      required_error: 'Это обязательное поле',
   }),
});

export type IForgotPassFormShema = z.infer<typeof forgotPassFormShema>;

const ForgotPassPage = () => {
   useShowHeader();
   const navigate = useNavigate();
   const [isEmailSend, setIsEmailSend] = useState(false);
   const [email, setEmail] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [verificationCode, setVerificationCode] = useState('');

   const handleSendEmail = async () => {
      if (email) {
         const res = await handleForgotSend(email);

         setIsEmailSend(await res);
      }
   };

   const handleVerify = () => {
      if (verificationCode) {
         handleForgotVerify({
            email,
            newPassword,
            verificationCode,
         });
      }
   };

   return (
      <AuthLayout type="recover">
         <form className={cl.form}>
            {!isEmailSend ? (
               <>
                  <TextField
                     title="Email"
                     type="input"
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                  />
                  <Button
                     type="button"
                     title="Send email"
                     onClick={handleSendEmail}
                  >
                     Send
                  </Button>
               </>
            ) : (
               <>
                  <TextField
                     title="Verification code"
                     type="input"
                     onChange={(e) => setVerificationCode(e.target.value)}
                     value={verificationCode}
                  />
                  <TextField
                     title="New password"
                     type="input"
                     onChange={(e) => setNewPassword(e.target.value)}
                     value={newPassword}
                  />
                  <Button
                     type="button"
                     title="Verification"
                     onClick={handleVerify}
                  >
                     Verify
                  </Button>
                  <Button
                     type="button"
                     title="Back"
                     onClick={() => setIsEmailSend(false)}
                  >
                     Change email
                  </Button>
               </>
            )}
         </form>
      </AuthLayout>
   );
};

export default ForgotPassPage;
