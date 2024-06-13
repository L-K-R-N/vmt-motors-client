import { useEffect } from 'react';
import cl from './Activity.module.scss';

interface Props {}

export const Activity: React.FC<Props> = () => {
   useEffect(() => {}, []);
   return (
      <div className={cl.activity}>
         <h4 className={cl.activity__title}>ACTIVITY</h4>
         <div className={cl.activity__body}></div>
      </div>
   );
};
