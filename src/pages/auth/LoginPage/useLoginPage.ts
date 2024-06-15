import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

// import {TOKEN} from '../../../app/api/app.constants.js'
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getBrowserAndOS, login, setIsAuth } from '@/store/reducers/AuthSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import AuthService from '@/api/services/AuthService';

export interface ILoginInputs {
   username: string;
   password: string;
   deviceName: string;
}

export const useLoginPage = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<ILoginInputs>({
      mode: 'onChange',
   });

   

   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const dispatch = useAppDispatch();
   const navigate = useNavigate(); 
   const location = useLocation(); 
   // const [accessToken, setAccessToken] = useState<string | null>(null);
   // useEffect(() => {
   //    if (isAuth) {
   //       navigate('/about');
   //    }
   //    console.log(isAuth);
   // }, [isAuth]);
   const from = location.state?.from?.pathname || '/';


   const handleLogin = async (inputs: ILoginInputs) => {
      try {
         const { password, username } = inputs;
         const loginResponse = await AuthService.login({
            username,
            password,
            deviceName: getBrowserAndOS(navigator.userAgent)
         });
         console.log(loginResponse);
   
            localStorage.setItem(
               'token',
               loginResponse.data.jwtToken,
            );
   
            localStorage.setItem(
               'refresh',
               loginResponse.data.refreshToken,
            );
   
            dispatch(setIsAuth(true));
   
   
            // navigate(from, {replace: true})
            navigate('/about')
            console.log(isAuth);
            // getMe();
      } catch (e) {
         console.log(e)
      }

      
}

   const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
      // dispatch(login(data));
      
      handleLogin(data)

   };

   

   return useMemo(
      () => ({
         handleSubmit,
         errors,
         // isLoading,
         onSubmit,

         control,
      }),
      [errors],
   );
};
