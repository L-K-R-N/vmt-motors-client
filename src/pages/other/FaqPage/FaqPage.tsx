import cl from './FaqPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';

interface Props {}

const FaqPage: React.FC<Props> = () => {
   useHideSidebar();

   return <div className={cl.ads}></div>;
};

export default FaqPage;
