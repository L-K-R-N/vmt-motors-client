import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { Button } from '@/components/UI/Button/Button.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHideSidebar } from '@/hooks/useLayout';
import { useNavigate } from 'react-router-dom';
import cl from './ForgotPassPage.module.scss';
import { AuthFormLayout } from '@/components/layout/AuthFormLayout/AuthFormLayout';

export interface IForgotPassInputs {
   email: string;
}
const ForgotPassPage = () => {
   const navigate = useNavigate();

   // const {
   //    captchaValue,
   //    setCaptchaValue,
   //    loading,
   //    req_error,
   //    errors,
   //    handleSubmit,
   //    onSubmit,
   //    register,
   //    control,
   // } = useLoginPage();

   const {
      handleSubmit,
      formState: { errors },
      control,
      setFocus,
   } = useForm<IForgotPassInputs>();
   useHideSidebar();
   const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigate('/forgot-password');
   };

   const onSubmit: SubmitHandler<IForgotPassInputs> = (data) => {
      console.log(data);
   };

   return (
      <AuthFormLayout>
         <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={cl.title}>Восстановление пароля</h3>
            <TextFieldController
               fieldType="input"
               control={control}
               errors={errors}
               label="Ваша почта"
               name="email"
               rules={{ required: 'Введите почту' }}
            />

            <Button type="submit" title="Submit">
               Отправить письмо
            </Button>
         </form>
      </AuthFormLayout>
   );
};

export default ForgotPassPage;
