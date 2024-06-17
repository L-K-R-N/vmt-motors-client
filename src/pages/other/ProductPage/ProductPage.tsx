import { useHideSidebar } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import img2 from './assets/3.jpg';
import img3 from './assets/2.webp';
import img4 from './assets/4.jpg';
import img5 from './assets/5.webp';
import img6 from './assets/6.jpg';
import cl from './ProductPage.module.scss';
import { IProduct } from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';

interface Props {}

const ProductPage: React.FC<Props> = () => {
   const { products } = useAppSelector((state) => state.ProductsReducer);

   const [product, setProduct] = useState<IProduct | null>(null);
   const params = useParams();
   const [activeImgId, setActiveImgId] = useState(1);
   const {} = useForm<IStageInputs>({
      mode: 'onChange',
   });

   interface IStageInputs {
      start: string;
      end: string;
   }

   const handleGetProduct = async (productId: string) => {
      try {
         const response = await ProductService.getProduct({
            productId: productId,
         });

         setProduct(response.data);
      } catch (e) {
         console.log(e);
      }
   };
   useEffect(() => {
      // const newProducts = [...products];
      // const currentProduct = newProducts.find((p) => p.id === );

      if (params.id) {
         handleGetProduct(params.id);
      }
   }, []);
   useHideSidebar();

   const [imgs] = useState<{ id: number; src: string }[]>([
      {
         id: 1,
         src: img6,
      },
      {
         id: 2,
         src: img2,
      },
      {
         id: 3,
         src: img3,
      },
      {
         id: 4,
         src: img4,
      },
      {
         id: 5,
         src: img5,
      },
   ]);

   const navigate = useNavigate();

   const chooseImg = (direction: 'next' | 'prev') => {
      switch (direction) {
         case 'prev':
            setActiveImgId((prev) => (prev < imgs.length ? ++prev : 1));
            break;

         case 'next':
            setActiveImgId((prev) => (prev > 1 ? --prev : imgs.length));
            break;
      }
   };

   return (
      <div className={cl.page}>
         <div className={cl.wrapper}>
            <h3 className={cl.pageTitle}>
               {product?.name} {product?.model} {product?.brand}
            </h3>
            <div className={cl.page__content}>
               <div className={cl.gallery}>
                  <div className={cl.gallery__main}>
                     <button
                        title="Prev"
                        className={cl.prevBtn}
                        onClick={() => chooseImg('prev')}
                     ></button>
                     <img
                        src={imgs.find((img) => img.id === activeImgId)?.src}
                        alt=""
                     />
                     <button
                        title="Next"
                        className={cl.nextBtn}
                        onClick={() => chooseImg('next')}
                     ></button>
                  </div>
                  <ul className={cl.gallery__list}>
                     {imgs.map((img) => (
                        <li onClick={() => setActiveImgId(img.id)}>
                           <img key={img.id} src={img.src} alt="" />
                        </li>
                     ))}
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
                              {product?.year}
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
                              {product?.millage} км
                           </li>
                           <li>
                              <span>Gear: </span>
                              {product?.gear}
                           </li>
                           <li>
                              <span>Generation: </span>
                              {product?.generation}
                           </li>
                        </ul>
                     </div>
                     <div className={cl.info__btns}>
                        <button title="Get contact" onClick={() => navigate}>
                           Get contact
                        </button>
                        <button title="Send message">Send message</button>
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
