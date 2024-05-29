import { FC, ReactElement } from 'react';
import cl from './Button.module.scss';

interface Props {
   children: string | ReactElement;
   title: string;
   type: 'button' | 'submit' | 'reset' | undefined;
   onClick?: () => void;
   styles?: {};
   disabled?: boolean;
}

export const Button: FC<Props> = ({
   children,
   title,
   type,
   styles,
   onClick,
   disabled,
}) => {
   return (
      <button
         type={type}
         title={title}
         className={cl.button}
         style={styles}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   );
};
