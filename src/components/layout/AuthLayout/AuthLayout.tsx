import cl from './AuthLayout.module.scss';
import { ReactNode, useState } from 'react';
import logo from './assets/logo.svg';
import googleLogo from './assets/authLogos/google.svg';
import talkLogo from './assets/authLogos/talk.svg';
import appleLogo from './assets/authLogos/apple.svg';
import naverLogo from './assets/authLogos/naver.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface Props {
   children: ReactNode;
   type: 'signin' | 'signup';
}

interface AuthVariant {
   img: string;
   name: string;
   link: string;
}

export const AuthLayout: React.FC<Props> = ({ children, type }) => {
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

   const { t } = useTranslation();
   return (
      <>
         <div className={cl.authLayout}>
            <div className={cl.authLayout__content}>
               <img className={cl.logo} src={logo} alt="" />
               <h4 className={cl.authLayout__title}>{t(type)}</h4>
               <ul className={cl.authLayout__variants}>
                  {authVariants.map((av, index) => (
                     <li key={index}>
                        <img src={av.img} alt="" />
                        {t('continue_with')} {av.name}
                     </li>
                  ))}
               </ul>
               <span>{t('or')}</span>
               <div className={cl.authLayout__children}>{children}</div>
               <div className={cl.control}>
                  <Link to={'/recover'} className={cl.link}>
                     {t('forgot_pass')}?
                  </Link>
                  <p>
                     {t(
                        type === 'signin'
                           ? 'no_account?'
                           : 'already_have_an_account',
                     )}{' '}
                     <Link
                        to={`/${type === 'signin' ? 'signup' : 'signin'}`}
                        className={cl.link}
                     >
                        {t(type === 'signin' ? 'signup' : 'signin')}
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};
