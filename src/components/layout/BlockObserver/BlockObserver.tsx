import React, { useEffect, useRef } from 'react';
import cl from './BlockObserver.module.scss';
export const BlockObserver: React.FC<{ onBlockVisible: () => void }> = ({
   onBlockVisible,
}) => {
   const observerRef = useRef<IntersectionObserver>();

   useEffect(() => {
      observerRef.current = new IntersectionObserver((entries, observer) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               onBlockVisible();
               observer.disconnect();
            }
         });
      });

      if (observerRef.current) {
         observerRef.current.observe(
            document.getElementById('observer-block')!,
         );
      }

      return () => {
         if (observerRef.current) {
            observerRef.current.disconnect();
         }
      };
   }, [onBlockVisible]);

   return <div className={cl.observer} id="observer-block"></div>;
};
