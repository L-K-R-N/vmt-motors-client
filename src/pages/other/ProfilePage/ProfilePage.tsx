import cl from './ProfilePage.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import maleAvatar from './assets/maleAvatar.jpg';
import femaleAvatar from './assets/femaleAvatar.jpg';
import { useHideSidebar } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { BsHouseFill } from 'react-icons/bs';
import { AdvertCard } from '@/components/UI/AdvertCard/AdvertCard';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Link, useNavigate } from 'react-router-dom';
import { FaCakeCandles } from 'react-icons/fa6';
import { PiHandbagSimpleFill } from 'react-icons/pi';
import { MdLocationOn } from 'react-icons/md';
// import { logout } from '@/store/reducers/AuthSlice';
import { setMyProducts } from '@/store/reducers/ProductsSlice';
import ProductService from '@/api/services/ProductService';
import { handleLogout } from '@/api/hooks/Auth';
import { handleGetMe } from '@/api/hooks/Person';

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
   const { myProducts } = useAppSelector((state) => state.ProductsReducer);
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
         value: me?.status ? me.status : 'none',
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

   const handleGetMyProducts = async (params: IParams) => {
      try {
         const response = await ProductService.getMyProducts(params);

         console.log(response.data);
         dispatch(setMyProducts(response.data));

         console.log(myProducts);
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      console.log(myProducts);
   }, [myProducts]);

   useEffect(() => {
      handleGetMe(dispatch);
      handleGetMyProducts({
         page: 0,
         size: 50,
      });
   }, []);

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
                  <button onClick={() => handleLogout(dispatch, navigate)}>
                     {t('logout')}
                  </button>
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
                        {me?.description ? me?.description : t('no_desc')}
                     </p>
                  </section>
               </div>
               <div className={cl.right__ads}>
                  <h4 className={cl.blockTitle}>{t('your_ads')}</h4>
                  <div className={cl.right__ads_list}>
                     {myProducts.length ? (
                        myProducts.map((product) => (
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
