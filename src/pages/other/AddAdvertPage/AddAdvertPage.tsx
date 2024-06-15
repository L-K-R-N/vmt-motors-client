import cl from './AddAdvertPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useEffect, useState } from 'react';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useAddAdvert } from './useAddAdvert';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import coupeImg from './assets/body_imgs/coupe.png';
import universalImg from './assets/body_imgs/universal.png';
import hatchbackImg from './assets/body_imgs/hatchback.png';
import roadsterImg from './assets/body_imgs/roadster.png';
import liftbackImg from './assets/body_imgs/liftback.png';
import crossoverImg from './assets/body_imgs/coupe.png';
import sedanImg from './assets/body_imgs/sedan.png';
import offroadImg from './assets/body_imgs/offroad.png';
import compactImg from './assets/body_imgs/compact.png';
import cabrioletImg from './assets/body_imgs/cabriolet.png';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button/Button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ISelectItem, TBody } from '@/store/reducers/FilterSlice';
import { Controller } from 'react-hook-form';

interface Props {}

interface IBody extends ISelectItem<TBody> {
   img: string;
}

const AddAdvertPage: React.FC<Props> = () => {
   useHideSidebar();
   const { t } = useTranslation();
   // const fetchProducts = async () => {
   //    const products = await CatalogService.getProducts();

   //    console.log(products);
   // };
   const { errors, control, handleSubmit, onSubmit } = useAddAdvert();
   const { brands, driveUnits, colors, fuels, gears, types, owners } = useAppSelector(
      (state) => state.FilterReducer,
   );

   const [bodies] = useState<IBody[]>([
      {
         img: coupeImg,
         value: 'coupe',
         label: 'Coupe',
      },
      {
         img: universalImg,
         value: 'universal',
         label: 'Universal',
      },
      {
         img: hatchbackImg,
         value: 'hatchback',
         label: 'Hatchback',
      },
      {
         img: roadsterImg,
         value: 'roadster',
         label: 'Roadster',
      },
      {
         img: liftbackImg,
         value: 'liftback',
         label: 'Liftback',
      },
      {
         img: crossoverImg,
         value: 'crossover',
         label: 'Crossover',
      },
      {
         img: sedanImg,
         value: 'sedan',
         label: 'Sedan',
      },
      {
         img: offroadImg,
         value: 'offroad',
         label: 'Offroad',
      },
      {
         img: compactImg,
         value: 'compact',
         label: 'Compact',
      },
      {
         img: cabrioletImg,
         value: 'cabriolet',
         label: 'Cabriolet',
      },
   ]);

   const [selectedBodyValue, setSelectedBodyValue] = useState<TBody>(bodies[0].value);

   // const toIOption = (items: string[]) => {
   //    const brandsOptions: IOption[] = [];
   //    for (const item of brands) {
   //       brandsOptions.push({
   //          value: item,
   //          label: item,
   //       });
   //    }

   //    return brandsOptions;
   // };

   useEffect(() => {
      // brandsOptions = toIOption(brands);
   }, []);
   return (
      <div className={cl.add}>
         <div className={cl.addHeader}>
            <h3 className={cl.addTitle}>{t('submit_your_ad')}</h3>
         </div>
         <div className={cl.wrapper}>
            <form className={cl.addForm} onSubmit={handleSubmit(onSubmit)}>
               <h4 className={cl.title}>{t('choose_brand')}</h4>

               <div className={cl.block}>
                  <TextFieldController
                     control={control}
                     errors={errors}
                     fieldType="input"
                     label="Name"
                     name="name"
                     placeholder={t("name")}
                     rules={{ required: 'Name is required' }}
                  />
                  <SelectController
                     control={control}
                     errors={errors}
                     name="brand"
                     options={brands}
                     placeholder={t("brand")}
                     isMulti={false}
                     rules={{ required: 'Brand is required' }}
                  />
                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="model"
                     fieldType="input"
                     label={t("model")}
                     rules={{ required: 'Model is required' }}
                  />
                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="from"
                     fieldType="input"
                     label={t("car_from")}
                     rules={{ required: 'Model is required' }}
                  />
                  {/* <TextFieldController
                     control={control}
                     errors={errors}
                     name="exchange"
                     fieldType="input"
                     label={t("model")}
                     rules={{ required: 'Model is required' }}
                  /> */}
                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="trade"
                     fieldType="input"
                     label={t("trade")}
                     rules={{ required: 'Model is required' }}
                  />
                  <SelectController
                        control={control}
                        errors={errors}
                        placeholder={t("owner")}
                        name="owner"
                        rules={{ required: 'Transmission type is required' }}
                        options={owners}
                        isMulti={false}
                     />
               </div>
               <h4 className={cl.title}>{t('specifications')}</h4>
               <div className={[cl.block, cl.spec].join(' ')}>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('year_of_release')}</h5>
                     <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        label={t('year_of_release')}
                        name="year"
                        rules={{ required: 'Year is required' }}
                     />
                  </div>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('transmission')}</h5>
                     <SelectController
                        control={control}
                        errors={errors}
                        placeholder={t("transmission")}
                        name="type"
                        rules={{ required: 'Transmission type is required' }}
                        options={types}
                        isMulti={false}
                     />
                  </div>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('mileage')}</h5>
                     <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        label={t("mileage")}
                        name="millage"
                        rules={{ required: 'Car mileage is required' }}
                     />
                  </div>
               </div>
               <div className={cl.block}>
                  <h5 className={cl.subtitle}>{t('body')}</h5>
                     {/* <Controller control={control} name='body' render={({ field }) => (
                        <select value={selectedBodyValue} onChange={(e) => setSelectedBodyValue(e.target.value)}>

                           {  
                              bodies.map((body) => 
                                 <option value={body.value}>
                                    {body.label}
                                 </option>
                              )
                           }  
                        </select>
                           
                     )}/> */}
                  <ul className={cl.bodies}>
                     {bodies.map((b) => (
                        <li
                           className={[
                              cl.body,
                              b.value === selectedBodyValue ? cl.active : '',
                           ].join(' ')}
                           onClick={() => setSelectedBodyValue(b.value)}
                           key={b.value}
                        >
                           <img className={cl.body__img} src={b.img} alt="" />
                           <h6 className={cl.body__name}>{t(b.value)}</h6>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className={cl.block}>
                  <h5 className={cl.subtitle}>{t('photo')}</h5>
               </div>
               <div className={cl.block}>
                  <h5 className={cl.subtitle}>{t('generation')}</h5>
                  <TextFieldController
                     control={control}
                     errors={errors}
                     fieldType="input"
                     label={t('generation')}
                     name="generation"
                     // rules={{t('desc')} }
                  />
               </div>
               <div className={[cl.block, cl.spec].join(' ')}>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('engine')}</h5>
                     <SelectController
                        control={control}
                        errors={errors}
                        name="fuel"
                        rules={{ required: 'Engine is required' }}
                        isMulti={false}
                        options={fuels}
                        placeholder={t('engine')}
                     />
                  </div>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('gear')}</h5>
                     <SelectController
                        control={control}
                        errors={errors}
                        name="gear"
                        rules={{ required: 'Gear is required' }}
                        isMulti={false}
                        options={gears}
                        placeholder={t('gear')}
                     />
                  </div>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('drive')}</h5>
                     <SelectController
                        control={control}
                        errors={errors}
                        name="driveUnit"
                        rules={{ required: 'Drive is required' }}
                        isMulti={false}
                        options={driveUnits}
                        placeholder={t('drive')}
                     />
                  </div>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('color')}</h5>
                     <SelectController
                        control={control}
                        errors={errors}
                        name="color"
                        rules={{ required: 'Car color is required' }}
                        placeholder={t('color')}
                        isMulti={false}
                        options={colors}
                     />
                  </div>
               </div>
               <div className={cl.block}>
                  <h5 className={cl.subtitle}>{t('desc')}</h5>
                  <TextFieldController
                     control={control}
                     errors={errors}
                     fieldType="textarea"
                     label={t('desc')}
                     name="desc"
                     // rules={{t('desc')} }
                  />
               </div>

               <div className={cl.block}>
                  <h5 className={cl.subtitle}>{t('price')}</h5>
                  <TextFieldController
                     control={control}
                     errors={errors}
                     fieldType="input"
                     label={t('price')}
                     name="price"
                     // rules={{t('desc')} }
                  />
               </div>
               <Button type="submit" title={t('place_ad')}>
                  {t('place_ad')}
               </Button>
            </form>
         </div>
      </div>
   );
};

export default AddAdvertPage;
