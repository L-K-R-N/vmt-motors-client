import cl from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { FC, useState } from 'react';

interface Props {
   items: IMenuItem[];
}

interface IMenuItem {
   id: number;
   to: string;
   text: string;
}

export const Menu: FC<Props> = ({ items }) => {
   return (
      <nav className={cl.menu}>
         <ul className={cl.list}>
            {items.map((item) => (
               <li key={item.id} className={cl.listItem}>
                  <a className={cl.link} href={item.to}>
                     {item.text}
                  </a>
               </li>
            ))}
         </ul>
      </nav>
   );
};
