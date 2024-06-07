import cl from './AdsPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';

interface Props {}

const AdsPage: React.FC<Props> = () => {
   useHideSidebar();

   return <div className={cl.ads}></div>;
};

export default AdsPage;
