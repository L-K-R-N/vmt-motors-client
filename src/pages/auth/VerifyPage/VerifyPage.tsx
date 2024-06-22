import cl from './VerifyPage.module.scss';
import { Button } from '@/components/UI/Button/Button.tsx';
import { useHideLayout, useShowHeader } from '@/hooks/useLayout';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout/AuthLayout';
import { useState } from 'react';
import { z } from 'zod';
import { TextField } from '@/components/UI/TextField/TextField';
import { getTokens } from '@/api/public.api';
import { handleCheckCode, handleCodeSend } from '@/api/hooks/Auth';

export const verifyFormShema = z.object({
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

export type IVerificationFormShema = z.infer<typeof verifyFormShema>;

const VerifyPage = () => {
   const navigate = useNavigate();
   const [isEmailSend, setIsEmailSend] = useState(false);
   const [code, setCode] = useState('');
   const [email, setEmail] = useState('');

   const handleSendEmail = () => {
      const { accessToken } = getTokens();

      if (accessToken && email) {
         handleCodeSend({
            email,
            accessToken: `Bearer ${accessToken}`,
         });

         setIsEmailSend(true);
      }
   };
   useShowHeader();
   const handleVerify = () => {
      if (code) {
         handleCheckCode(code);
      }
   };

   return (
      <AuthLayout type="signup">
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
                     Send code
                  </Button>
               </>
            ) : (
               <>
                  <TextField
                     title="Verification code"
                     type="input"
                     onChange={(e) => setCode(e.target.value)}
                     value={code}
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

export default VerifyPage;
