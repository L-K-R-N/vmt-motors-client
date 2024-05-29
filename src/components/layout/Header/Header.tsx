import { Link, useLocation, useNavigate } from 'react-router-dom';
import cl from './Header.module.scss';
import logo from './assets/logo.svg';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ChangeEvent, useEffect } from 'react';
import { Menu } from '../Menu/Menu';
import { Wrapper } from '../Wrapper/Wrapper';
import { PiUserThin } from 'react-icons/pi';
import { TextField } from '@/components/UI/TextField/TextField';
import { setProductSearch } from '@/store/reducers/ProductsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IoSearch } from 'react-icons/io5';
import { GoKey } from 'react-icons/go';
import { CiMap } from 'react-icons/ci';
interface Props {}

export const menuItems = [
   {
      id: 1,
      text: 'О нас',
      to: '/home',
   },
   {
      id: 2,
      text: 'Преимущества',
      to: 'news',
   },
   {
      id: 3,
      text: 'Поддержка',
      to: 'tickets',
   },
];

export const Header: React.FC<Props> = () => {
   const { isShowHeader } = useAppSelector((state) => state.LayoutReducer);
   const { isAuth } = useAppSelector((state) => state.AuthReducer);
   const { productSearch } = useAppSelector((state) => state.ProductsReducer);
   const location = useLocation();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      console.log(isShowHeader);
   });

   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setProductSearch(e.target.value));
      console.log(productSearch);
   };

   const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && location.pathname !== '/main') {
         navigate('/main');
      }
   };
   return (
      <>
         {isShowHeader && (
            <header className={cl.header}>
               <Wrapper>
                  <div className={cl.content}>
                     <Link to={isAuth ? '/main' : '/home'} className={cl.logo}>
                        <img
                           src={logo}
                           alt="logo"
                           width={67}
                           className={cl.img}
                        />
                     </Link>

                     {isAuth ? (
                        <div className={cl.searchContainer}>
                           <input
                              className={cl.searchInput}
                              value={productSearch}
                              onChange={handleSearch}
                              placeholder="Введите название товара"
                              title="Введите название товара"
                              onKeyDown={handleEnterSearch}
                           />
                           <IoSearch className={cl.searchIcon} />
                        </div>
                     ) : (
                        <Menu items={menuItems} />
                     )}
                     {isAuth ? (
                        // <div className={cl.profileBlock}>
                        //    <button title="Пункты выдачи" className={cl.mapBtn}>
                        //       <CiMap />
                        //    </button>
                        <Link to={'/profile'} className={cl.authBtn}>
                           <PiUserThin />
                           <span>Профиль</span>
                        </Link>
                     ) : (
                        // </div>
                        <Link to={'/signin'} className={cl.authBtn}>
                           <GoKey /> Войти
                        </Link>
                     )}
                  </div>
               </Wrapper>
            </header>
         )}
      </>
   );
};
