import { useHideFooter } from '@/hooks/useLayout';
import cl from './OrdersPage.module.scss';

interface Props {}

const OrdersPage: React.FC<Props> = () => {
   useHideFooter();
   return <div className={cl.verifications}></div>;
};

export default OrdersPage;
