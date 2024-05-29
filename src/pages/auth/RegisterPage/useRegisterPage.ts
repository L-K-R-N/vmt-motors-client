import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { setIsAuth } from '@/store/reducers/AuthSlice.js';

export interface IRegisterInputs {
   email: string;
   password: string;
   phoneNumber: string;
}

export const useRegisterPage = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      register,
   } = useForm<IRegisterInputs>({
      mode: 'onChange',
   });
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const [errorReq, setErrorReq] = useState(false);
   const [errorCap, setErrorCap] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const [accessToken, setAccessToken] = useState<string | null>(null);

   // useEffect(() => {
   //    if (accessToken) {
   //       navigate('/main');

   //       window.location.reload();
   //    }
   // }, [accessToken]);

   const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
      console.log(data);

      dispatch(setIsAuth(true));

      navigate('/main');

      // if (data.password === data.passwordConfirm) {
      //    const response = await post_register(data);

      //    if (response.status === 200) {
      //       const newResponse = await get_token({
      //          email: data.email,
      //          password: data.password,
      //       });

      //       const access = newResponse.data.token;

      //       if (newResponse.status === 200 && access) {
      //          localStorage.setItem('access', access);
      //          // dispatch(setIsAuth(true));
      //          setAccessToken(access);
      //       }
      //    }
      // }
      //    post_register(data)
      //       .then((r) => {
      //          if (r.status === 200) {
      //             reset();
      //             get_token({ email: data.email, password: data.password });
      //          } else {
      //             setErrorReq(true);
      //          }
      //       })
      //       .catch((e) => {
      //          console.log(e);
      //          setErrorMessage(e.response.data.detail);
      //          setErrorReq(true);
      //       });
      // } else {
      //    setErrorReq(true);
      // }
   };

   return useMemo(
      () => ({
         handleSubmit,
         errors,
         onSubmit,
         errorReq,
         errorCap,
         errorMessage,
         control,
         register,
      }),
      [errors, errorReq, errorCap, errorMessage],
   );
};
