import cl from './ProductPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IProduct } from '@/store/reducers/ProductsSlice';
import img from './assets/car.png';
interface Props {}

const ProductPage: React.FC<Props> = () => {
   const { products } = useAppSelector((state) => state.ProductsReducer);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [product, setProduct] = useState<IProduct | null>(null);
   const params = useParams();

   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IStageInputs>({
      mode: 'onChange',
   });

   interface IStageInputs {
      start: string;
      end: string;
   }
   useEffect(() => {
      const newProducts = [...products];
      const currentProduct = newProducts.find((p) => p.id === params.id);

      if (currentProduct) {
         setProduct(currentProduct);
      }
   }, []);
   useHideSidebar();

   return (
      <div className={cl.page}>
         <div className={cl.wrapper}>
            <h3 className={cl.pageTitle}>
               {product?.name} {product?.model.value} {product?.brand.value}
            </h3>
            <div className={cl.page__content}>
               <div className={cl.gallery}>
                  <div className={cl.gallery__main}>
                     <img src={img} alt="" />
                  </div>
                  <ul className={cl.gallery__list}>
                     <li>
                        <img src={img} alt="" />
                     </li>
                     <li>
                        <img src={img} alt="" />
                     </li>
                     <li>
                        <img src={img} alt="" />
                     </li>
                     <li>
                        <img src={img} alt="" />
                     </li>
                  </ul>
               </div>
               <div className={cl.page__contentContainer}>
                  <div className={cl.info}>
                     <div className={cl.owner}>
                        <img className={cl.owner__avatar} src="" alt="" />
                        <span className={cl.owner__name}>Владислав Найков</span>
                     </div>
                     <div className={cl.location}>
                        Beverly Hills, CA, United States
                     </div>
                     <div className={cl.stats}>
                        <h5 className={cl.stats__title}>
                           Vehicle Characteristics
                        </h5>
                        <ul className={cl.stats__list}>
                           <li>
                              <span>Year of release: </span>
                              {/* {product?.createdAt.toString()} */}
                           </li>
                           <li>
                              <span>Color: </span>
                              {product?.color}
                           </li>
                           <li>
                              <span>The body: </span>
                              {product?.body}
                           </li>
                           <li>
                              <span>Fuel: </span>
                              {product?.fuel}
                           </li>
                           <li>
                              <span>Mileage: </span>
                              {product?.driveUnit}
                           </li>
                           <li>
                              <span>Gear: </span>
                              {product?.gear}
                           </li>
                           <li>
                              <span>Generation: </span>
                              {product?.generation}
                           </li>
                           <li>
                              <span>Moderated: </span>
                              {product?.moderated}
                           </li>
                        </ul>
                     </div>
                     <div className={cl.info__btns}>
                        <button>Get contact</button>
                        <button>Send message</button>
                     </div>
                  </div>
                  <div className={cl.comment}>
                     <h5 className={cl.comment__title}>Комментарий продавца</h5>

                     <div className={cl.comment__text}>
                        <h6 className={cl.comment__subtitle}>About this car</h6>
                        <p className={cl.comment__desc}>{product?.desc}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductPage;
