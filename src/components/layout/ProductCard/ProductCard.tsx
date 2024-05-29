import cl from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IProduct } from '@/models/Product.types';
import { FC, useEffect, useState } from 'react';
import { TiStarOutline } from 'react-icons/ti';
import { LuShoppingCart } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';
import { setCartProducts } from '@/store/reducers/CartSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ProductInfoModal } from '@/components/modals/ProductInfoModal/ProductInfoModal';
import { useModal } from '@/hooks/useModal';
import { GoDotFill } from 'react-icons/go';
interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { cartProducts } = useAppSelector((state) => state.CartReducer);

   const [cartCounter, setCartCounter] = useState(0);
   const [inCart, setInCart] = useState(cartProducts.includes(product));

   const { isShow, setIsShow, handleOpen } = useModal();
   useEffect(() => {
      setInCart(cartProducts.includes(product));
   }, [cartProducts]);

   const handleToggleToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      let newCartProducts = [...cartProducts];

      if (newCartProducts.includes(product)) {
         dispatch(
            setCartProducts(newCartProducts.filter((p) => p.id !== product.id)),
         );
      } else {
         dispatch(setCartProducts([...cartProducts, product]));
         console.log(cartProducts);
      }
      localStorage.clear();
   };

   return (
      <>
         <div className={cl.block} onClick={handleOpen}>
            <img className={cl.img} src={product?.img} alt="img" />

            <div className={cl.info}>
               <h5 className={cl.title}>
                  <span className={cl.desc}>{product?.name}</span>
                  <GoDotFill />
                  {product?.desc}
               </h5>
               <span className={cl.price}>{product?.price} р</span>

               <div className={cl.rating}>
                  <span>
                     <FaStar /> {product.rating}{' '}
                  </span>
                  <GoDotFill />
                  10000 оценок
               </div>
            </div>
            <button
               title="Добавить в корзину"
               className={[cl.cartBtn, inCart ? cl.inCart : ''].join(' ')}
               onClick={handleToggleToCart}
            >
               <LuShoppingCart />
               {inCart ? 'Удалить' : 'Добавить'}
            </button>
         </div>
         <ProductInfoModal
            isShow={isShow}
            setShow={setIsShow}
            product={product}
         />
      </>
   );
};
