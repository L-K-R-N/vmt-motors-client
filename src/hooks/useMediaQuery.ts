import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
   const [isMatch, setIsMatch] = useState(false);

   useEffect(() => {
      const mediaQuery = window.matchMedia(query);

      const updateMatch = () => {
         setIsMatch(mediaQuery.matches);
      };

      updateMatch();

      mediaQuery.addListener(updateMatch);

      return () => {
         mediaQuery.removeListener(updateMatch);
      };
   }, [query]);

   return isMatch;
};

export default useMediaQuery;
