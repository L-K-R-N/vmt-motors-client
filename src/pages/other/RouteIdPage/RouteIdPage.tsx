import cl from './RouteIdPage.module.scss';
import { useHideFooter } from '@/hooks/useLayout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button } from '@/components/UI/Button/Button';
import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IRoute, updateRoute } from '@/store/reducers/RoutesSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';

interface Props {}

const RouteIdPage: React.FC<Props> = () => {
   const { routes } = useAppSelector((state) => state.RoutesReducer);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [route, setRoute] = useState<IRoute | null>(null);
   const params = useParams();

   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IStageInputs>({
      mode: 'onChange',
   });

   interface IStageInputs {
      start: string;
      end: string;
   }
   useLayoutEffect(() => {
      const newRoutes = [...routes];
      const currentRoute = newRoutes.find((r) => r.id === Number(params.id));

      if (currentRoute) {
         setRoute(currentRoute);
      }
   }, []);
   useHideFooter();

   const onSubmit: SubmitHandler<IStageInputs> = (data) => {
      if (route) {
         console.log(data.end, data.start);
         dispatch(
            updateRoute({
               id: route.id,
               price: 1000,
               start: data.start,
               end: data.end,
               title: route?.title,
               type: route.type,
            }),
         );
         navigate('/profile');
      }
   };

   return (
      <div className={cl.route}>
         <div className={cl.routeHeader}>
            <h4 className={cl.title}>{route?.title}</h4>
         </div>
         <div className={cl.routeMain}>
            <form className={cl.routeForm} onSubmit={handleSubmit(onSubmit)}>
               <div className={cl.formElem}>
                  <p>Склад</p>
                  <TextFieldController
                     // control={control}
                     errors={errors}
                     control={control}
                     fieldType="input"
                     label="Введите адрес пункта"
                     // label="Адрес склада"
                     name="start"
                     // fieldType="input"
                     // control={control}
                     // isMulti={false}
                     // options={[]}
                     defaultValue={route?.start}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               {/* <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="second"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="trird"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="fourth"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  {' '}
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="fourth"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="fiveth"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="sixth"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>

               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="seventh"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="seventh"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="eighth"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="nineth"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div>
               <div className={cl.formElem}>
                  {' '}
                  <p>Пункт выдачи</p>
                  <SelectController
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="tenth"
                     // fieldType="input"
                     control={control}
                     isMulti={false}
                     options={[]}
                     placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес склада' }}
                  />
               </div> */}
               <div className={cl.formElem}>
                  <p>Пункт выдачи</p>
                  <TextFieldController
                     control={control}
                     fieldType="input"
                     label="Введите адрес ПВЗ"
                     // control={control}
                     errors={errors}
                     // label="Адрес склада"
                     name="end"
                     // fieldType="input"
                     // control={control}
                     // isMulti={false}
                     // options={[]}
                     // placeholder="Введите адрес пункта"
                     rules={{ required: 'Введите адрес ПВЗ' }}
                  />
               </div>

               <Button type="submit" title="Сохранить маршрут">
                  Сохранить
               </Button>
               {/* <div className={cl.control}>
               <Link to={'/recover'} className={cl.link}>
                  Восстановить пароль
               </Link>
               <Link to={'/signup'} className={cl.link}>
                  Регистрация
               </Link>
            </div> */}
            </form>
            <div className={cl.sum}>
               <div className={cl.sumHeader}>
                  <h5 className={cl.sumTitle}>Расчёты</h5> <span>10 000 р</span>
               </div>
               <div className={cl.sumMain}>
                  <p>
                     Время в пути: <span>4 ч</span>
                  </p>
                  <p>
                     Цена за час:<span> 100 h</span>
                  </p>
                  <p>
                     Километраж: <span>4 ч</span>
                  </p>
                  <p>
                     Сумма: <span>100 000 р</span>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RouteIdPage;
