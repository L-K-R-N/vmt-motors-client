import cl from './BlockObserver.module.scss';

import { useState, useEffect, useRef, FC } from 'react';

interface BlockObserverProps {
   onBlockVisible: () => void;
}

export const BlockObserver: FC<BlockObserverProps> = ({ onBlockVisible }) => {
   const [isVisible, setIsVisible] = useState<boolean>(false);
   const blockRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setIsVisible(true);
                  onBlockVisible();
               } else {
                  setIsVisible(false);
               }
            });
         },
         {
            rootMargin: '0px',
            threshold: 1.0,
         },
      );

      if (blockRef.current) {
         observer.observe(blockRef.current);
      }

      return () => {
         if (blockRef.current) {
            observer.unobserve(blockRef.current);
         }
      };
   }, [onBlockVisible]);

   return <div className={cl.observer} ref={blockRef}></div>;
};
