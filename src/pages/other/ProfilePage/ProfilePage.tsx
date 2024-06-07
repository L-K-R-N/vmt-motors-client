import cl from './ProfilePage.module.scss';
import { useEffect, useState } from 'react';
import defaultAvatar from './assets/defaultAvatar.jpg';
import { useHideSidebar } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLogout } from '@/hooks/useLogout';
import bagIcon from './assets/bag.svg';
import cakeIcon from './assets/cake.svg';
import markerIcon from './assets/marker.svg';
import houseIcon from './assets/house.svg';
import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
import { useTranslation } from 'react-i18next';

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
   const [userInfo, setUserInfo] = useState<IUserInfoItem[]>([
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
   useHideSidebar();

   // const handleEditPassword = () => {
   //    setIsEditPassword(true);
   // };

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
   const handleLogout = useLogout();
   return (
      <div className={cl.profile}>
         <div className={cl.content}>
            <div className={cl.left}>
               <img
                  className={cl.avatar}
                  src={me.avatar ? me.avatar : defaultAvatar}
                  alt="Ваш аватар"
               />
               <div className={cl.left__buttons}>
                  <button>{t('change_avatar')}</button>
                  <button>{t('logout')}</button>
               </div>
               <p className={cl.greeting}>{t('greeting')}, Vladislav</p>
               <ul className={cl.userInfo}>
                  {userInfo.map((item) => (
                     <li>
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
                  <h3 className={cl.right__username}>Vladislav Khvan</h3>
                  <section className={cl.right__about}>
                     <h4 className={cl.blockTitle}>{t('profile_about')}</h4>
                     <p className={cl.right__about_desc}>
                        Vladislav is rushing forward on the VMT MOTORS website,
                        where car sales are in full swing! He starts with an
                        attractive description of the cars, emphasizing their
                        excellent performance and condition. He then adds
                        additional photos from different angles so that
                        potential buyers can fully appreciate the cars on offer.
                        Not forgetting the importance of details, Vladislav also
                        makes sure that all information about vehicles is fully
                        relevant and accurate. It provides complete technical
                        specifications, service history and vehicle reports to
                        ensure the trust and confidence of potential buyers.
                        Vladislav actively interacts with site visitors, quickly
                        answering their questions and providing additional
                        information about the models they are interested in. He
                        also participates in online chat rooms and forums where
                        people share their experiences and tips on choosing a
                        car. In addition, Vladislav regularly updates the range
                        of cars on the site, adding new arrivals and removing
                        already sold cars so that visitors always see up-to-date
                        information.
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
                     {products.map((product) => (
                        <AdvertCard advert={product} key={product.id} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;
