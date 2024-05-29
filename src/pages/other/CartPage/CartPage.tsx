import cl from './CartPage.module.scss';
import { useHideFooter } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { CartItem } from '@/components/layout/cart/CartItem/CartItem';
import { Button } from '@/components/UI/Button/Button';
import { useEffect, useState } from 'react';

interface Props {}

const CartPage: React.FC<Props> = () => {
   const { cartProducts } = useAppSelector((state) => state.CartReducer);
   const dispatch = useAppDispatch();

   // const [prices, setPrices] = useState(
   //    cartProducts?.map((item) => item.price),
   // );
   useHideFooter();
   const [sum, setSum] = useState(0);
   // useEffect(() => {
   //    setPrices(cartProducts?.map((item) => item.price));
   // }, [cartProducts]);

   useEffect(() => {
      // const newSum = cartProducts.reduce((prev, item) =>
      // );
      // setSum(newSum + sum);
   }, [cartProducts]);
   return (
      <div className={cl.cart}>
         <div className={cl.cartHeader}>
            <div className={cl.cartHeaderInfo}>
               <h4 className={cl.title}>Корзина</h4>
               <p>Общая сумма: {}</p>
               <p>Выбранно на сумму: {0}</p>
            </div>
            <Button title="Перейти к оформению" type="button">
               Перейти к оформлению
            </Button>
         </div>
         {/* <ServicesControl /> */}
         <div className={cl.cartList}>
            {cartProducts &&
               cartProducts.map((p) => <CartItem product={p} key={p.id} />)}
         </div>
         <div className={cl.productsList}>aaa</div>
         <div className={cl.cartControl}></div>
      </div>
   );
};

export default CartPage;
