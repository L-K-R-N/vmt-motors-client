import { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';
import cl from './PagingSlider.module.scss';
export type TFieldType = 'input' | 'textarea';

const styles = {
   display: 'flex',
   background: 'transparent',
   opacity: 0.6,
   height: '100%',

   alignItems: 'center',
   width: 'auto',

   zIndex: 100,
};

function SampleNextArrow(props: any) {
   const { className, style, onClick } = props;
   return (
      <div
         className={className}
         style={{ ...styles, right: 0, padding: '0 15px 0 75px' }}
         onClick={onClick}
      />
   );
}

function SamplePrevArrow(props: any) {
   const { className, style, onClick } = props;
   return (
      <div
         className={className}
         style={{ ...styles, left: 0, padding: '0 75px 0 15px' }}
         onClick={onClick}
      />
   );
}

interface Props {
   urls: string[];
}

export const PagingSlider: FC<Props> = ({ urls }) => {
   const [slider1, setSlider1] = useState<Slider | null>(null);
   const [slider2, setSlider2] = useState<Slider | null>(null);

   useEffect(() => {
      // Устанавливаем ссылки на слайдеры в состояние компонента
      setSlider1(slider1Ref);
      setSlider2(slider2Ref);
   }, []);

   let slider1Ref: Slider | null = null;
   let slider2Ref: Slider | null = null;

   const settings = {
      asNavFor: slider2 ? slider2 : undefined,
      ref: (slider: Slider) => {
         slider1Ref = slider;
      },
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
   };

   const secondSettings = {
      asNavFor: slider1 ? slider1 : undefined,
      ref: (slider: Slider) => {
         slider2Ref = slider;
      },
      slidesToShow: 3,
      arrows: false,
      swipeToSlide: true,
      focusOnSelect: true,
   };
   return (
      <div className="slider-container">
         <Slider {...settings}>
            {urls.map((url) => (
               <div className={cl.slide} key={url}>
                  <img src={url} alt="" />
               </div>
            ))}
         </Slider>

         <Slider {...secondSettings}>
            {urls.map((url) => (
               <div className={cl.slide} key={url}>
                  <img src={url} alt="" />
               </div>
            ))}
         </Slider>
      </div>
   );
};
