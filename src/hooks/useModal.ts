import { useState } from 'react';

export const useModal = () => {
   const [isShow, setIsShow] = useState(false);

   const handleOpen = () => {
      setIsShow(true);
   };

   return { isShow, setIsShow, handleOpen };
};
