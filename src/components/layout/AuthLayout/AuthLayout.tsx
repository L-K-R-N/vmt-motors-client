import { useLocation, useNavigate } from 'react-router-dom';
import cl from './AuthLayout.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ReactNode } from 'react';
import logo from './assets/logo.svg';
interface Props {
   title: string;
   children: ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children, title }) => {
   const { isShowHeader } = useAppSelector((state) => state.LayoutReducer);
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { productSearch } = useAppSelector((state) => state.ProductsReducer);
   const location = useLocation();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   return (
      <>
         <div className={cl.authLayout}>
            <div className={cl.authLayout__content}>
               <img src={logo} alt="" />
               <h4 className={cl.authLayout__title}>{title}</h4>
               <ul className={cl.authLayout__variants}>
                  <li>Continue with Google</li>
               </ul>
               <span>OR</span>
               {children}
            </div>
         </div>
      </>
   );
};
