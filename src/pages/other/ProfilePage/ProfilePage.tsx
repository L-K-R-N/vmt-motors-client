import cl from './ProfilePage.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import maleAvatar from './assets/maleAvatar.jpg';
import femaleAvatar from './assets/femaleAvatar.jpg';
import { useHideSidebar } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { BsHouseFill } from 'react-icons/bs';
import markerIcon from './assets/marker.svg';
import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
import { useTranslation } from 'react-i18next';
import PersonService from '@/api/services/PersonService';
import { setMe } from '@/store/reducers/UserSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Link, useNavigate } from 'react-router-dom';
import { FaCakeCandles } from 'react-icons/fa6';
import { PiHandbagSimpleFill } from 'react-icons/pi';
import { MdLocationOn } from 'react-icons/md';
import { logout } from '@/store/reducers/AuthSlice';

interface Props {}

interface IUserInfoItem {
   icon: ReactNode;
   title: string;
   value: string;
}

const ProfilePage: React.FC<Props> = () => {
   const { t } = useTranslation();
   const { lang } = useAppSelector((state) => state.SettingsReducer);
   const { me } = useAppSelector((state) => state.UserReducer);
   const { products } = useAppSelector((state) => state.ProductsReducer);
   const dispatch = useAppDispatch();
   const [userInfo, setUserInfo] = useState<IUserInfoItem[]>([
      {
         icon: <FaCakeCandles />,
         title: 'age',
         value: '20',
      },
      {
         icon: <PiHandbagSimpleFill />,
         title: 'occupation',
         value: 'Seller',
      },
      {
         icon: <BsHouseFill />,
         title: 'status',
         value: me?.status ?? 'none',
      },
      {
         icon: <MdLocationOn />,
         title: 'location',
         value: 'London, UK',
      },
   ]);
   useHideSidebar();

   const navigate = useNavigate();

   // const handleEditPassword = () => {
   //    setIsEditPassword(true);
   // };

   const handleLogout = () => {
      logout();
      navigate('/signin');
   };

   useEffect(() => {}, [lang]);

   useEffect(() => {}, []);
   return (
      <div className={cl.profile}>
         <div className={cl.content}>
            <div className={cl.left}>
               <img
                  className={cl.avatar}
                  src={
                     me?.hasProfilePhoto
                        ? ''
                        : me?.gender === 'FEMALE'
                          ? femaleAvatar
                          : maleAvatar
                  }
                  alt="Ваш аватар"
               />
               <div className={cl.left__buttons}>
                  <button>{t('change_avatar')}</button>
                  <button onClick={() => handleLogout()}>{t('logout')}</button>
               </div>
               <p className={cl.greeting}>
                  {t('greeting')}, {me?.username}
               </p>
               <ul className={cl.userInfo}>
                  {userInfo.map((item) => (
                     <li key={item.title}>
                        <span>
                           {item.icon}
                           <span>{t(item.title)}</span>
                        </span>
                        {item.value}
                     </li>
                  ))}
               </ul>
            </div>
            <div className={cl.right}>
               <div className={cl.right__info}>
                  <h5 className={cl.right__title}>{t('profile')}</h5>
                  <h3 className={cl.right__username}>{me?.username}</h3>
                  <section className={cl.right__about}>
                     <h4 className={cl.blockTitle}>{t('profile_about')}</h4>
                     <p className={cl.right__about_desc}>
                        {me?.desc ? me?.desc : t('no_desc')}
                     </p>
                  </section>
               </div>
               <div className={cl.right__ads}>
                  <h4 className={cl.blockTitle}>{t('your_ads')}</h4>
                  <div className={cl.right__ads_list}>
                     {products.filter((p) => !p.moderated) ? (
                        products
                           .filter((p) => !p.moderated)
                           .map((product) => (
                              <AdvertCard advert={product} key={product.id} />
                           ))
                     ) : (
                        <div className={cl.right__about_desc}>
                           Вы пока не разместили ни одно рекламное объявление.{' '}
                           <Link to={'/add'}>Сделайте это прямо сейчас</Link>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;
