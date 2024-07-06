import cl from './ProfilePage.module.scss';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import maleAvatar from './assets/maleAvatar.jpg';
import femaleAvatar from './assets/femaleAvatar.jpg';
import { useHideSidebar } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { BsHouseFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCakeCandles } from 'react-icons/fa6';
import { MdLocationOn } from 'react-icons/md';
// import { logout } from '@/store/reducers/AuthSlice';
import ProductService from '@/api/services/ProductService';
import { handleLogout } from '@/api/hooks/Auth';
import PersonService from '@/api/services/PersonService';
import { IUser } from '@/api/models/Person';
import { IProduct } from '@/api/models/Products';
import { AvatarUpload } from '@/components/layout/UploadAvatar/UploadAvatar';
import { toast } from 'react-toastify';
import { IoSettingsSharp } from 'react-icons/io5';
import { setCurrentPerson } from '@/store/reducers/ChatSlice';
import { Products } from '@/components/layout/Products/Products';
import { handleGetMe } from '@/api/hooks/Person';

export const handleBlob = (data: string) => {
   const blob = new Blob([data], { type: 'image/*' });
   const photoUrl = URL.createObjectURL(blob);

   return photoUrl;
};

interface Props {}

interface IUserInfoItem {
   icon: ReactNode;
   title: string;
   value: string;
   visible: boolean;
}

const ProfilePage: React.FC<Props> = () => {
   const { t } = useTranslation();
   const { lang } = useAppSelector((state) => state.SettingsReducer);
   // const { me } = useAppSelector((state) => state.UserReducer);
   const dispatch = useAppDispatch();
   const params = useParams();
   const { me } = useAppSelector((state) => state.UserReducer);
   const { myProducts } = useAppSelector((state) => state.ProductsReducer);
   const [user, setUser] = useState<IUser | null>(null);
   const [products, setProducts] = useState<IProduct[]>([]);
   const [userInfo, setUserInfo] = useState<IUserInfoItem[]>([
      {
         icon: <FaCakeCandles />,
         title: 'age',
         value: '20',
         visible: false,
      },

      {
         icon: <BsHouseFill />,
         title: 'status',
         value: user?.status ? user.status : 'Not active',
         visible: true,
      },
      {
         icon: <MdLocationOn />,
         title: 'location',
         value: 'London, UK',
         visible: false,
      },
   ]);

   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
   const handleGetAvatar = async () => {
      try {
         if (user) {
            const response = await PersonService.getPersonPhoto({
               id: user.id,
            });

            // const binaryData = Buffer.from(response.data, 'base64');
            // setPhotoBytes(binaryData);

            setAvatarUrl(handleBlob(response.data));
         }
      } catch (e) {
         console.log(e);
      }
   };

   const [isMyProfile, setIsMyProfile] = useState(false);
   useHideSidebar();

   const navigate = useNavigate();

   // const handleEditPassword = () => {
   //    setIsEditPassword(true);
   // };

   const blobPhoto = (bytes: string) => {
      const blob = new Blob([bytes], { type: 'image/png' });

      const photoUrl = URL.createObjectURL(blob);

      return photoUrl;
   };

   const handleSetProducts = async (
      isMyProfile: boolean,
      personId?: string,
   ) => {
      try {
         if (isMyProfile) {
            const response = await ProductService.getMyProducts({
               size: 25,
               page: 0,
            });

            setProducts(response?.data);
         } else if (personId) {
            const response = await ProductService.getProductsByPerson({
               personId,
               params: {
                  limit: 25,
                  page: 0,
               },
            });

            setProducts(response?.data);
         }
      } catch (e) {
         console.log(e);
      }
   };

   const handleSetUser = (id: string) => {
      try {
         const response = PersonService.getPerson(id);

         toast
            .promise(response, {
               error: 'Аккаунт не найден',
            })
            .then((res) => {
               setUser(res?.data);
            })
            .catch(() => {
               navigate('/catalog');
            });
      } catch (e) {}
   };

   useEffect(() => {
      if (user) {
         handleSetProducts(isMyProfile, user.id);
         handleGetMe();
      }
   }, [isMyProfile]);

   useLayoutEffect(() => {
      if (params.id) {
         handleSetUser(params.id);
      }
   }, [params]);

   useLayoutEffect(() => {
      if (user) {
         setIsMyProfile(user.id === me?.id);
      }
      if (user && user.hasProfilePhoto) {
         handleGetAvatar();
      }
   }, [user]);

   const handleSendMessage = () => {
      if (user) {
         dispatch(setCurrentPerson(user));

         navigate(`/chats`);
      }
   };
   return (
      <div className={cl.profile}>
         <div className={cl.content}>
            <div className={cl.left}>
               <img
                  className={cl.avatar}
                  src={
                     avatarUrl
                        ? avatarUrl
                        : user?.gender === 'FEMALE'
                          ? femaleAvatar
                          : maleAvatar
                  }
                  alt="Ваш аватар"
               />
               <div className={cl.left__buttons}>
                  {isMyProfile ? (
                     <>
                        {/* <button>{t('change_avatar')}</button> */}
                        <AvatarUpload
                           onAvatarUpload={() => handleGetAvatar()}
                        />
                        <button
                           title={t('logout')}
                           onClick={() => handleLogout()}
                        >
                           {t('logout')}
                        </button>
                     </>
                  ) : (
                     <>
                        <button
                           title={t('send_message')}
                           onClick={handleSendMessage}
                        >
                           {t('send_message')}
                        </button>
                     </>
                  )}
               </div>
               {isMyProfile ? (
                  <p className={cl.greeting}>
                     {t('greeting')}, {me?.username}
                  </p>
               ) : (
                  <></>
               )}
               <ul className={cl.userInfo}>
                  {userInfo?.map((item) => (
                     <li
                        key={item.title}
                        className={!item.visible ? cl.hidden : ''}
                     >
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
                  <div className={cl.right__infoTop}>
                     <h3 className={cl.right__username}>{user?.username}</h3>
                     {isMyProfile && (
                        <button
                           title={t('settings')}
                           className={cl.settingsBtn}
                           onClick={() => navigate('/profile/me/change')}
                        >
                           <IoSettingsSharp />
                        </button>
                     )}
                  </div>
                  <section className={cl.right__about}>
                     <h4 className={cl.blockTitle}>{t('profile_about')}</h4>
                     <p className={cl.right__about_desc}>
                        {isMyProfile && me?.description
                           ? me?.description
                           : user?.description
                             ? user.description
                             : t('no_desc')}
                     </p>
                  </section>
               </div>
               <div className={cl.right__ads}>
                  <h4 className={cl.blockTitle}>{t('your_ads')}</h4>
                  <div className={cl.right__ads_list}>
                     {products?.length ? (
                        <Products products={products} />
                     ) : isMyProfile ? (
                        <div className={cl.right__about_desc}>
                           Вы пока не разместили ни одно рекламное объявление.{' '}
                           <Link to={'/add'}>Сделайте это прямо сейчас</Link>
                        </div>
                     ) : (
                        <div className={cl.right__about_desc}>
                           У пользователя пока нет активных объявлений.
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
