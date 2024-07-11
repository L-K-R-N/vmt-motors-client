import React, { useState, useEffect, useRef } from 'react';

interface SliderProps {
   slides: JSX.Element[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
   const [currentTranslateX, setCurrentTranslateX] = useState(0);
   const [slidesPerView, setSlidesPerView] = useState(5);
   const [isUserInteracting, setIsUserInteracting] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleResize = () => {
         const windowWidth = window.innerWidth;
         if (windowWidth <= 768) {
            setSlidesPerView(1);
         } else {
            setSlidesPerView(5);
         }
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      let requestId: number | null = null;
      let previousTimestamp: number | null = null;
      const slideWidth = 100 / slidesPerView;
      const containerElement = containerRef.current;

      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

      const animateSlider = (timestamp: number) => {
         if (!previousTimestamp) {
            previousTimestamp = timestamp;
         }

         const deltaTime = timestamp - previousTimestamp;
         previousTimestamp = timestamp;

         setCurrentTranslateX((prevTranslateX) => {
            let newTranslateX = prevTranslateX;
            if (!isUserInteracting) {
               newTranslateX =
                  prevTranslateX - (deltaTime * slideWidth) / 200000;
            }
            if (newTranslateX <= -100 * (slides.length - 1)) {
               return 0;
            }
            return newTranslateX;
         });

         requestId = requestAnimationFrame(animateSlider);
      };

      if (containerElement) {
         requestId = requestAnimationFrame(animateSlider);
      }

      if (isMobileDevice) {
         containerElement?.addEventListener('touchstart', () =>
            setIsUserInteracting(true),
         );
         containerElement?.addEventListener('touchend', () =>
            setIsUserInteracting(false),
         );
      }

      return () => {
         if (requestId !== null) {
            cancelAnimationFrame(requestId);
         }
         containerElement?.removeEventListener('touchstart', () =>
            setIsUserInteracting(true),
         );
         containerElement?.removeEventListener('touchend', () =>
            setIsUserInteracting(false),
         );
      };
   }, [slides.length, slidesPerView, isUserInteracting]);

   return (
      <div className="slider">
         <div
            className="slider-container"
            ref={containerRef}
            style={{
               transform: `translateX(${currentTranslateX}%)`,
               width: `${100 * slides.length}%`,
               display: 'flex',
            }}
         >
            {[...slides, ...slides, ...slides].map((slide, index) => (
               <div
                  key={index}
                  className="slide"
                  style={{ width: `${100 / slidesPerView}%` }}
               >
                  {slide}
               </div>
            ))}
         </div>
      </div>
   );
};

export default Slider;
