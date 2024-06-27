import { useHideSidebar } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cl from './ProductPage.module.scss';
import { IProduct } from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';
import defaultPhoto from './assets/defaultPhoto.jpg';
import maleAvatar from './assets/maleAvatar.jpg';
import femaleAvatar from './assets/femaleAvatar.jpg';
import PersonService from '@/api/services/PersonService';
import { IUser } from '@/api/models/Person';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Props {}

const ProductPage: React.FC<Props> = () => {
   const [product, setProduct] = useState<IProduct | null>(null);
   const params = useParams();
   const [activeImgId, setActiveImgId] = useState(1);
   const [user, setUser] = useState<IUser | null>(null);
   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
   const [isFavorite, setIsFavorite] = useState(false);
   const {} = useForm<IStageInputs>({
      mode: 'onChange',
   });
   const { t } = useTranslation();

   interface IStageInputs {
      start: string;
      end: string;
   }

   const handleSetProduct = async (productId: string) => {
      try {
         const response = await ProductService.getProduct({
            productId: productId,
         });

         setProduct(response.data);
      } catch (e) {
         console.log(e);
      }
   };

   const handleSetUser = (id: string) => {
      try {
         const response = PersonService.getPerson(id);

         toast
            .promise(response, {
               error: 'Пользователь, разместивший данный товар, не найден',
            })
            .then((res) => {
               setUser(res.data);
            })
            .catch(() => {
               navigate(-1);
            });
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      // const newProducts = [...products];
      // const currentProduct = newProducts.find((p) => p.id === );
      if (params.id) {
         handleSetProduct(params.id);
      }
   }, []);

   useEffect(() => {
      if (product?.personId) handleSetUser(product.personId);
      console.log(product);
   }, [product]);
   useHideSidebar();

   const [imgs] = useState<{ id: number; src: string }[]>([]);

   const navigate = useNavigate();

   const handleGetAvatar = async () => {
      try {
         if (user) {
            const response = await PersonService.getPersonPhoto({
               id: user.id,
            });

            setAvatarUrl(response.data);
         }
      } catch (e) {
         console.log(e);
      }
   };

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

   useEffect(() => {
      if (user && user.hasProfilePhoto) {
         handleGetAvatar();
      }
   }, [user]);
   // const toArray = (products: {}) => {
   //    const keys = product
   // }

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
                        src={
                           imgs.find((img) => img.id === activeImgId)?.src
                              ? imgs.find((img) => img.id === activeImgId)?.src
                              : defaultPhoto
                        }
                        alt=""
                     />
                     <button
                        title="Next"
                        className={cl.nextBtn}
                        onClick={() => chooseImg('next')}
                     ></button>
                  </div>
                  {/* <ul className={cl.gallery__list}>
                     {imgs.map((img) => (
                        <li onClick={() => setActiveImgId(img.id)}>
                           <img key={img.id} src={img.src} alt="" />
                        </li>
                     ))}
                  </ul> */}
               </div>
               <div className={cl.page__contentContainer}>
                  <div className={cl.info}>
                     <div
                        className={cl.owner}
                        onClick={() => navigate(`/profile/${user?.id}`)}
                     >
                        <img
                           className={cl.owner__avatar}
                           src={
                              avatarUrl
                                 ? avatarUrl
                                 : user?.gender === 'FEMALE'
                                   ? femaleAvatar
                                   : maleAvatar
                           }
                           alt=""
                        />
                        <span className={cl.owner__name}>{user?.username}</span>
                     </div>
                     {/* <div className={cl.location}>
                        Beverly Hills, CA, United States
                     </div> */}
                     <div className={cl.stats}>
                        <h5 className={cl.stats__title}>
                           Vehicle Characteristics
                        </h5>
                        <ul className={cl.stats__list}>
                           {product &&
                              Object.entries(product).map(
                                 ([key, value]) =>
                                    key !== 'id' &&
                                    key !== 'personId' &&
                                    key !== 'moderated' && (
                                       <li>
                                          <span>{t(key)}:</span>
                                          <span>{value}</span>
                                       </li>
                                    ),
                              )}
                        </ul>
                     </div>
                     <div className={cl.info__btns}>
                        <button title="Get contact" onClick={() => navigate}>
                           Get contact
                        </button>
                        <button
                           title="Send message"
                           onClick={() => navigate(`/chats`)}
                        >
                           Send message
                        </button>
                     </div>
                  </div>
                  {product?.description && (
                     <div className={cl.comment}>
                        <h5 className={cl.comment__title}>
                           Комментарий продавца
                        </h5>

                        <p
                           className={[
                              cl.comment__desc,
                              !product?.description ? cl.no_comment : '',
                           ].join(' ')}
                        >
                           {product?.description
                              ? product?.description
                              : 'Продавец не оставил комментарий'}
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductPage;
