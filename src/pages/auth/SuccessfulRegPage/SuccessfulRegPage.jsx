import LoginLayout from '../../../components/login-layout/LoginLayout.jsx';
import Button from '../../../components/ui/button/Button.js';
import styles from './SuccessfulRegPage.module.scss';
import like from '/Tentacle-like.svg';
import { useNavigate } from 'react-router-dom';

const SuccessfulRegPage = () => {
   const navigate = useNavigate();

   return (
      <LoginLayout heading=" ">
         <div className={styles.block}>
            <div className={styles.title}>
               <p>successful registration</p>
            </div>
            <div className={styles.text}>
               <p>
                  a Thanks! aaaYou have successfully registered on our service!
                  Now you can use the great features of the KRAKEN project!
               </p>
            </div>
            <div className={styles.ellipse} />
            <div className={styles.like}>
               <img src={like} alt="like" />
            </div>
            <div className={styles.likeReverse}>
               <img src={like} alt="like" />
            </div>
            <div className={styles.button}>
               <Button clickHandler={() => navigate('/login')}>
                  Use the site
               </Button>
            </div>
         </div>
      </LoginLayout>
   );
};

export default SuccessfulRegPage;
