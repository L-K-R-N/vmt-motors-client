import cl from './AuthLayout.module.scss';
import { ReactNode, useState } from 'react';
import logo from './assets/logo.svg';
import googleLogo from './assets/authLogos/google.svg';
import talkLogo from './assets/authLogos/talk.svg';
import appleLogo from './assets/authLogos/apple.svg';
import naverLogo from './assets/authLogos/naver.svg';
import { Link } from 'react-router-dom';
interface Props {
   title: string;
   children: ReactNode;
   link: string;
}

interface AuthVariant {
   img: string;
   name: string;
   link: string;
}

export const AuthLayout: React.FC<Props> = ({ children, title, link }) => {
   const [authVariants] = useState<AuthVariant[]>([
      {
         img: googleLogo,
         link: '',
         name: 'Google',
      },
      {
         img: appleLogo,
         link: '',
         name: 'Apple',
      },
      {
         img: talkLogo,
         link: '',
         name: 'KakaoTalk',
      },
      {
         img: naverLogo,
         link: '',
         name: 'Naver',
      },
   ]);
   return (
      <>
         <div className={cl.authLayout}>
            <div className={cl.authLayout__content}>
               <img src={logo} alt="" />
               <h4 className={cl.authLayout__title}>{title}</h4>
               <ul className={cl.authLayout__variants}>
                  {authVariants.map((av, index) => (
                     <li key={index}>
                        <img src={av.img} alt="" />
                        Continue with {av.name}
                     </li>
                  ))}
               </ul>
               <span>OR</span>
               <div className={cl.authLayout__children}>{children}</div>
               <div className={cl.control}>
                  <Link to={'/vmt-motors-client/recover'} className={cl.link}>
                     Forgot password?
                  </Link>
                  <p>
                     Not a remember yet?{' '}
                     <Link
                        to={`/vmt-motors-client/${link}`}
                        className={cl.link}
                     >
                        Sign Up
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};
