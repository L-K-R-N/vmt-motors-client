import { ReactNode } from 'react';
import cl from './ContextMenu.module.scss';

export interface IContextMenuItem {
   handleClick: () => void;
   title: string;
   icon?: ReactNode;
}

export interface ICoords {
   x: number;
   y: number;
}

interface Props {
   isShow: boolean;
   list: IContextMenuItem[];
}

export const ContextMenu: React.FC<Props> = ({ isShow, list }) => {
   return (
      <ul className={[cl.menu, isShow ? cl.show : ''].join(' ')}>
         {list.map((item) => (
            <li onClick={() => item.handleClick()} key={item.title}>
               {item.icon}
               {item.title}
            </li>
         ))}
      </ul>
   );
};
