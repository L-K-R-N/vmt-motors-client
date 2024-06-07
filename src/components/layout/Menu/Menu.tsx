import { Link } from 'react-router-dom';
import cl from './Menu.module.scss';
import { FC, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';
interface Props {
   items: IMenuItem[];
}

interface IMenuItem {
   to: string;
   text: string;
}

export const Menu: FC<Props> = ({ items }) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className={cl.menuContainer}>
         <button
            title="Открыть / закрыть меню"
            className={cl.menuBurger}
            onClick={() => setIsOpen(!isOpen)}
         >
            {isOpen ? <IoCloseOutline /> : <RxHamburgerMenu />}
         </button>
         <nav className={[cl.menu, isOpen ? cl.active : ''].join(' ')}>
            <ul className={cl.list}>
               {items.map((item, index) => (
                  <li key={index} className={cl.listItem}>
                     <Link
                        className={cl.link}
                        to={item.to}
                        onClick={() => setIsOpen(!isOpen)}
                     >
                        {item.text}
                     </Link>
                  </li>
               ))}
            </ul>
         </nav>
      </div>
   );
};
