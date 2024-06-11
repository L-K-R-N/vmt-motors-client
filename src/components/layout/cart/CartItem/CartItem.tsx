import cl from './CartItem.module.scss';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IProduct } from '@/models/Product.types';
import { FC, useEffect, useState } from 'react';
import { TiStarOutline } from 'react-icons/ti';
import { setCartProducts } from '@/store/reducers/CartSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useModal } from '@/hooks/useModal';
import { FiTrash2 } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';
import { updateProductCountInCart } from '@/store/reducers/ProductsSlice';
interface Props {
   product: IProduct;
}

export const CartItem: FC<Props> = ({ product }) => {
   const dispatch = useAppDispatch();
   const { cartProducts } = useAppSelector((state) => state.CartReducer);

   const [inCart, setInCart] = useState(cartProducts.includes(product));

   const { isShow, setIsShow, handleOpen } = useModal();

   // const [countItems, setCountItems] = useState(1);
   useEffect(() => {
      setInCart(cartProducts.includes(product));
   }, [cartProducts]);

   const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      let newCartProducts = [...cartProducts];

      dispatch(
         setCartProducts(newCartProducts.filter((p) => p.id !== product.id)),
      );
   };

   const handleAddCountItems = () => {
      if (product.countInCart < 999) {
         dispatch(
            updateProductCountInCart({
               id: product.id,
               countInCart: product.countInCart + 1,
            }),
         );
      }
   };
   const handleReduceCountItems = () => {
      if (product.countInCart > 1) {
         dispatch(
            updateProductCountInCart({
               id: product.id,
               countInCart: product.countInCart - 1,
            }),
         );
      }
   };

   return (
      <>
         <div className={cl.item} onClick={handleOpen}>
            <img className={cl.img} src={product?.img} alt="img" />

            <div className={cl.info}>
               <div className={cl.infoHeader}>
                  <h5 className={cl.title}>{product?.name}</h5>
                  <div className={cl.rating}>
                     <TiStarOutline /> {product.rating}
                  </div>
               </div>
               <p className={cl.desc}>
                  {product?.desc}
                  <span className={cl.descBlur}></span>
               </p>
               <p className={cl.price}>
                  Цена за 1 шт: <span>{product?.price} р</span>
               </p>
               <p className={cl.price}>
                  Цена за {product.countInCart} шт:{' '}
                  <span>{product?.price * product.countInCart} р</span>
               </p>
            </div>
            <div className={cl.control}>
               <div className={cl.counter}>
                  <button
                     title="Убавить"
                     className={cl.reduce}
                     onClick={handleReduceCountItems}
                  >
                     <FiMinus />
                  </button>
                  <span>{product.countInCart}</span>
                  <button
                     title="Добавить"
                     className={cl.add}
                     onClick={handleAddCountItems}
                  >
                     <FiPlus />
                  </button>
               </div>

               <button
                  title="Удалить из корзины"
                  className={cl.deleteBtn}
                  onClick={handleDelete}
               >
                  <FiTrash2 />
               </button>
            </div>
         </div>
      </>
   );
};
