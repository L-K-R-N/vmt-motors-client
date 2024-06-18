import cl from './ProductInfoModal.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { Modal } from '@/components/UI/Modal';
import { IProduct } from '@/models/Product.types';
import { LuShoppingCart } from 'react-icons/lu';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { setCartProducts } from '@/store/reducers/CartSlice';

interface CardModalInputs {
   title: string;
}

interface IRules {
   required: boolean;
   minLength: number;
   maxLength: number;
}

interface Props {
   product: IProduct;
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductInfoModal: React.FC<Props> = ({
   product,
   isShow,
   setShow,
}) => {
   const dispatch = useAppDispatch();
   const { cartProducts } = useAppSelector((state) => state.CartReducer);
   let newCartProducts = [...cartProducts];
   const [inCart, setInCart] = useState(cartProducts.includes(product));
   const handleToggleToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (newCartProducts.includes(product)) {
         dispatch(
            setCartProducts(newCartProducts.filter((p) => p.id !== product.id)),
         );
      } else {
         dispatch(setCartProducts([...cartProducts, product]));
         console.log(cartProducts);
      }
   };
   useEffect(() => {
      setInCart(cartProducts.includes(product));
   }, [cartProducts]);

   return (
      <Modal title={product.name} setShow={setShow} isShow={isShow}>
         <div className={cl.container}>
            <div className={cl.content}>
               <p className={cl.desc}>{product.desc}</p>
               <div className={cl.info}>
                  <p>
                     Артикул <span>901290</span>
                  </p>
                  <p>
                     Объем (м) <span>16</span>
                  </p>
                  <p>
                     Масса товара (кг) <span>10</span>
                  </p>
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
            <img src={product.img} alt="" className={cl.img} />
         </div>
      </Modal>
   );
};
