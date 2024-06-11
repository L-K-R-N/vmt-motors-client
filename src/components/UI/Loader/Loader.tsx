import { useRef, useEffect } from 'react';
import cl from './Loader.module.scss';
export const Loader = () => {
   const videoRef = useRef<HTMLVideoElement | null>(null);

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.currentTime = 0;
         videoRef.current.play();
      }
   }, []);

   return (
      <div className={cl.loaderContainer}>
         {/* <video
            ref={videoRef}
            // src={loadingAnimation}
            autoPlay
            muted
            loop
            className={cl.video}
         /> */}
         {/* <img src={logo} alt="" className={cl.loaderIcon} /> */}
         <div className={cl.loader}></div>
      </div>
   );
};
