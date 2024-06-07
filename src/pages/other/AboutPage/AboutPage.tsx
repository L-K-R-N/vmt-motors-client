import cl from './AboutPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';

interface Props {}

const AboutPage: React.FC<Props> = () => {
   useHideSidebar();

   return <div className={cl.ads}></div>;
};

export default AboutPage;
