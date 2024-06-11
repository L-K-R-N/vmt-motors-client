import { useEffect } from 'react';
import cl from './Activity.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';

interface Props {}

export const Activity: React.FC<Props> = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {}, []);
   return (
      <div className={cl.activity}>
         <h4 className={cl.activity__title}>ACTIVITY</h4>
         <div className={cl.activity__body}></div>
         <input
            type="text"
            className={cl.activity__input}
            title="Execute the command"
            placeholder="Execute the command"
         />
      </div>
   );
};
