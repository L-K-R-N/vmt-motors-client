import cl from './ProfilePage.module.scss';
import { useEffect, useState } from 'react';
import defaultAvatar from './assets/defaultAvatar.jpg';
import { useHideSidebar } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import bagIcon from './assets/bag.svg';
import cakeIcon from './assets/cake.svg';
import markerIcon from './assets/marker.svg';
import houseIcon from './assets/house.svg';
import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
import { useTranslation } from 'react-i18next';
import PersonService from '@/api/services/PersonService';
import { setMe } from '@/store/reducers/UserSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Link } from 'react-router-dom';

interface Props {}

interface IUserInfoItem {
   icon: string;
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
         icon: cakeIcon,
         title: t('age'),
         value: '20',
      },
      {
         icon: bagIcon,
         title: t('occupation'),
         value: 'Seller',
      },
      {
         icon: houseIcon,
         title: t('status'),
         value: me?.status ?? 'none',
      },
      {
         icon: markerIcon,
         title: t('location'),
         value: 'London, UK',
      },
   ]);
   useHideSidebar();

   // const handleEditPassword = () => {
   //    setIsEditPassword(true);
   // };

   const fetchMe = async () => {
      const response = await PersonService.getMe();

      console.log(response.data);
      if (response.status !== 200) return;

      dispatch(setMe(response.data));
   };

   useEffect(() => {
      setUserInfo([
         {
            icon: cakeIcon,
            title: t('age'),
            value: '26',
         },
         {
            icon: bagIcon,
            title: t('occupation'),
            value: 'Seller',
         },
         {
            icon: houseIcon,
            title: t('status'),
            value: 'active',
         },
         {
            icon: markerIcon,
            title: t('location'),
            value: 'London, UK',
         },
      ]);
   }, [lang]);

   useEffect(() => {
      fetchMe();
   }, []);
   return (
      <div className={cl.profile}>
         <div className={cl.content}>
            <div className={cl.left}>
               <img
                  className={cl.avatar}
                  src={me?.hasProfilePhoto ? '' : defaultAvatar}
                  alt="Ваш аватар"
               />
               <div className={cl.left__buttons}>
                  <button>{t('change_avatar')}</button>
                  <button>{t('logout')}</button>
               </div>
               <p className={cl.greeting}>
                  {t('greeting')}, {me?.username}
               </p>
               <ul className={cl.userInfo}>
                  {userInfo.map((item) => (
                     <li key={item.title}>
                        <span>
                           <img src={item.icon} alt="" />
                           <span>{item.title}</span>
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
                        {me?.desc ? me?.desc : 'Описание отсутствует'}
                     </p>
                  </section>
                  {/* <button
                     className={cl.logoutBtn}
                     title="Выйти"
                     onClick={handleLogout}
                  >
                     Выйти
                     <FiLogOut />
                  </button> */}
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
                           <Link to={'/vmt-motors-client/add'}>
                              Сделайте это прямо сейчас
                           </Link>
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
