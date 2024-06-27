import { useCallback, useEffect, useRef, useState } from 'react';
import cl from './CarsLine.module.scss';
import ProductService from '@/api/services/ProductService';
import { IProduct } from '@/api/models/Products';
import defaultPhoto from './assets/defaultPhoto.jpg';

import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

interface Props {}

export const CarsLine: React.FC<Props> = () => {
   const [products, setProducts] = useState<IProduct[]>([]);
   const [imgs, setImgs] = useState<string[]>([]);
   const navigate = useNavigate();

   const handleGetProducts = () => {
      ProductService.getAllProducts({
         page: 0,
         size: 50,
      })
         .then((res) => {
            setProducts(res.data);
         })
         .then(() => {
            products.map((product) => {
               setImgs((prev) => [...prev, '']);
            });
         })
         .catch(() => {});
   };
   useEffect(() => {
      setProducts([]);
      setImgs([]);

      handleGetProducts();

      return () => {
         setProducts([]);
         setImgs([]);
      };
   }, []);

   const loadFunc = () => {};

   const settings = {
      arrows: true,
      infinite: false,
      autoplaySpeed: 0,
      autoplay: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      speed: 10000,
      initialSlide: 0,
      cssEase: 'linear',
      pauseOnHover: false,
   };

   const handleRedirectToProduct = (id: string) => {
      navigate(`/adverts/buy/${id}`);
   };
   return (
      // <ul className={cl.slider}>
      <Slider {...settings}>
         {[
            ...products,
            ...products,
            ...products,
            ...products,
            ...products,
            ...products,
            ...products,
            ...products,
         ].map((product, index) => (
            <li
               className={cl.sliderItem}
               onClick={() => handleRedirectToProduct(product.id)}
            >
               <div className={cl.sliderItem__top}>
                  <img src={imgs[index] ? imgs[index] : defaultPhoto} alt="" />
                  <span className={cl.price}>{product.price} $</span>
               </div>
               <div className={cl.sliderItem__bottom}>
                  <h6 className={cl.name}>{product.name}</h6>
               </div>
            </li>
         ))}
      </Slider>

      // </ul>
   );
};
