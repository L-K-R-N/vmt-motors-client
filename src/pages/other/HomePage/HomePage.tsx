import cl from './HomePage.module.scss';
// import introImg from './assets/intro.png';
import { Link } from 'react-router-dom';
import { useHideSidebar } from '../../../hooks/useLayout';
import { Button } from '@/components/UI/Button/Button';

const HomePage = () => {
   useHideSidebar();

   return (
      <div className={cl.home}>
         <div className={cl.intro} id="#intro">
            <div className={[cl.wrapper, cl.content].join(' ')}>
               <div className={cl.info}>
                  <h1 className={cl.title}>
                     Бобер бобр
                     <br />
                     логистик Трейд
                  </h1>

                  <ul className={cl.links}>
                     <li className={cl.link}>
                        <Button title="a" type="button">
                           <Link to={'/signin'}>Вход</Link>
                        </Button>
                     </li>
                     <li className={cl.link}>
                        <Link to={'/signup'}>Регистрация</Link>
                     </li>
                  </ul>
               </div>
               {/* <img className={cl.img} src={introImg} alt="" /> */}
            </div>
         </div>
         {/* <div className={cl.video}>
            <div className={[cl.wrapper, cl.content].join(' ')}>
               <div className={cl.info}>
                  <img className={cl.img} src={videoImg} alt="" />

                  <div className={cl.container}>
                     <h2 className={cl.title}>How to use service?</h2>
                     <h3 className={cl.subtitle}>
                        Watch the video and you will understand everything for
                        yourself!
                     </h3>
                  </div>
                  <div className={cl.blur}></div>
               </div>
               <div className={cl.videoContainer}>
                  <video className={cl.video} src={video} />
               </div>
            </div>
         </div>
         <div className={cl.benefits}>
            <div className={[cl.wrapper, cl.content].join(' ')}>
               {benefitsCards.map((card) => (
                  <div className={cl.card} key={card.title}>
                     <img
                        width={card.img.width}
                        height={card.img.height}
                        className={cl.img}
                        src={card.img.src}
                        alt=""
                     />
                     <h5 className={cl.title}>{card.title}</h5>
                     <p className={cl.desc}>{card.desc}</p>
                  </div>
               ))}
            </div>
         </div>
         <div className={cl.faq}>
            <div className={cl.wrapper}>
               <h2 className={cl.title}>
                  FAQ <span>- Question answer</span>
               </h2>
               <div className={cl.cards}>
                  {faqCards.map((card) => (
                     <div
                        className={[
                           cl.card,
                           activeFaqIds.find((id) => id === card.id)
                              ? cl.active
                              : '',
                        ].join(' ')}
                        onClick={() => handleCheckAnswer(card)}
                        key={card.id}
                     >
                        <div className={cl.info}>
                           <h5 className={cl.title}>Question {card.id}</h5>
                           <h6 className={cl.question}>{card.question}</h6>
                           <p className={cl.answer}>{card.answer}</p>
                        </div>
                        <button className={cl.button}>
                           <IoArrowBackOutline />
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className={cl.referal}>
            <div className={[cl.wrapper, cl.content].join(' ')}>
               <div className={cl.imgContainer}>
                  <img className={cl.img} src={referalImg} alt="" />
                  <div className={cl.blur}></div>
               </div>
               <div className={cl.info}>
                  <h2 className={cl.title}>Referral Programs</h2>
                  <h3 className={cl.subtitle}>
                     You can earn money with us. Invite people and get a good
                     reward!
                  </h3>
                  <Link className={cl.link} to={'/register'}>
                     Sign UP
                  </Link>
               </div>
            </div>
         </div>
         <div className={cl.feedback}>
            <div className={cl.blurLeft}></div>
            <div className={cl.blurRight}></div>
            <div className={cl.wrapper}>
               <div className={cl.content}>
                  <h2 className={cl.title}>
                     Feedback from
                     <br />
                     regular customers
                  </h2>
                  <div className={cl.cards} ref={feedbackRef}>
                     {feedbacks.map((card) => (
                        <div
                           className={cl.card}
                           key={card.id}
                           ref={feedbackCardRef}
                        >
                           <div className={cl.header}>
                              <img
                                 className={cl.avatar}
                                 src={card.avatar}
                                 alt=""
                              />
                              <h5 className={cl.name}>{card.username}</h5>
                           </div>

                           <p className={cl.text}>{card.text}</p>
                        </div>
                     ))}
                  </div>
                  <div className={cl.control}>
                     <button
                        title="button"
                        className={cl.prev}
                        onClick={handleClickPrev}
                     >
                        <img src={longArrowSvg} alt="" />
                     </button>
                     <button
                        title="button"
                        className={cl.next}
                        onClick={handleClickNext}
                     >
                        <img src={longArrowSvg} alt="" />
                     </button>
                  </div>
               </div>
            </div>
            <div className={cl.imgContainer}>
               <img src={feedbackImg} alt="" />
               <div className={cl.blur}></div>
            </div>
         </div> */}
         <div className={cl.form}></div>
      </div>
   );
};

export default HomePage;
