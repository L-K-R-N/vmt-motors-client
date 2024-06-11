import cl from './MainPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { Button } from '@/components/UI/Button/Button';
import instIcon from './assets/inst.svg';
import tgIcon from './assets/tg.svg';
import youtubeIcon from './assets/youtube.svg';
import mapJpg from './assets/map.jpg';
import { useTranslation } from 'react-i18next';

interface Props {}

const MainPage: React.FC<Props> = () => {
   useHideSidebar();
   const { t } = useTranslation();
   return (
      <div className={cl.mainPage}>
         <div className={cl.mainPage__intro}>
            <h1 className={cl.mainPage__title}>VMT MOTORS</h1>
            <p className={cl.mainPage__desc}>
               <span>
                  <span className={cl.vmt}>VMT MOTORS</span> - {t('slogan')}
               </span>
               <br />
               {t('info')}
            </p>
            <Button title="Sign In" type="button">
               {t('signin')}
            </Button>
         </div>
         <div className={cl.mainPage__about}>
            <div className={cl.wrapper}>
               <div className={cl.mainPage__about_content}>
                  <h3 className={cl.title}>{t('services')}:</h3>
                  <span>{t('what_we_offer')}:</span>
                  <ul className={cl.mainPage__about_desc}>
                     <li>{t('assortment')}</li>
                     <li>{t('quality')}</li>
                     <li>{t('convenience')}</li>
                     <li>{t('maintenance')}</li>
                  </ul>

                  <h3 className={cl.title}>{t('why_us')}:</h3>
                  <ul className={cl.mainPage__about_desc}>
                     <li>{t('professionalism')}</li>
                     <li>{t('approach')}</li>
                     <li>{t('transparency')}</li>
                  </ul>
                  <p>{t('contact_us')}</p>
               </div>
            </div>
         </div>
         <div className={cl.mainPage__contacts}>
            <div className={cl.mainPage__contacts_content}>
               <h4 className={cl.mainPage__contacts_title}>{t('contacts')}</h4>
               <ul className={cl.mainPage__contacts_list}>
                  <li>{t('phone')}: +1 123 456 78</li>
                  <li>Email: hello@firm.com</li>
               </ul>
               <div className={cl.mainPage__contacts_social}>
                  <h5>USA NY NEW YORK</h5>
                  <ul className={cl.mainPage__contacts_socialList}>
                     <li>
                        <img src={instIcon} alt="" />
                     </li>
                     <li>
                        <img src={tgIcon} alt="" />
                     </li>
                     <li>
                        <img src={youtubeIcon} alt="" />
                     </li>
                  </ul>
               </div>
            </div>
            <img className={cl.mainPage__contacts_img} src={mapJpg} alt="" />
         </div>
         <div className={cl.mainPage__form}>
            <div className={cl.wrapper}>
               <div className={cl.mainPage__form_content}>
                  <h4 className={cl.title}>VMT MOTORS</h4>
                  <p className={cl.mainPage__form_desc}>
                     <span>{t('to_contact')}:</span> {t('we_will_be_able')}
                  </p>
               </div>
            </div>
         </div>
         <div className={cl.mainPage__form_auth}></div>
      </div>
   );
};

export default MainPage;
