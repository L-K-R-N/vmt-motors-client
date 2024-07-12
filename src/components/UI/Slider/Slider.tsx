import React, { useState, useEffect, useRef } from 'react';

interface SliderProps {
   slides: JSX.Element[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
   const [currentTranslateX, setCurrentTranslateX] = useState(0);
   const [slidesPerView, setSlidesPerView] = useState(5);
   const [isUserInteracting, setIsUserInteracting] = useState(false);
   const [speed, setSpeed] = useState(200000);
   const containerRef = useRef<HTMLDivElement>(null);
   const [requestId, setRequestId] = useState<number | null>(null);
   useEffect(() => {
      const handleResize = () => {
         const windowWidth = window.innerWidth;
         if (windowWidth <= 768) {
            setSlidesPerView(1);
            setSpeed(600000);
         } else if (windowWidth <= 1000) {
            setSlidesPerView(3);
            setSpeed(250000);
         } else {
            setSlidesPerView(5);
            setSpeed(200000);
         }
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      // let requestId: number | null = null;
      let previousTimestamp: number | null = null;
      const slideWidth = 100 / slidesPerView;
      const containerElement = containerRef.current;

      const isMobileDevice = window.innerWidth <= 768;

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
                  prevTranslateX - (deltaTime * slideWidth) / speed;
            }
            if (newTranslateX <= -100 * (slides.length - 1)) {
               return 0;
            }
            return newTranslateX;
         });

         setRequestId(requestAnimationFrame(animateSlider));
      };

      if (containerElement) {
         setRequestId(requestAnimationFrame(animateSlider));
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

   // useEffect(() => {
   //    if (slidesPerView === 1 && requestId !== null) {
   //       cancelAnimationFrame(requestId);
   //    }
   // }, [slidesPerView]);
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
            {slides.map((slide, index) => (
               <div
                  key={index}
                  className="slide"
                  style={{ width: `${100 / slidesPerView}vw` }}
               >
                  {slide}
               </div>
            ))}
         </div>
      </div>
   );
};

export default Slider;
