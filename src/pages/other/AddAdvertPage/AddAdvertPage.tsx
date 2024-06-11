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
   const { errors, control } = useAddAdvert();
   const { brands, driveUnits, colors, fuels, gears, types } = useAppSelector(
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

   const [selectedBody, setSelectedBody] = useState<IBody | null>(null);

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
            <div className={cl.addForm}>
               <h4 className={cl.title}>{t('choose_brand')}</h4>

               <div className={cl.block}>
                  <TextFieldController
                     control={control}
                     errors={errors}
                     fieldType="input"
                     label="Name"
                     name="name"
                     placeholder="Name"
                     rules={{ required: 'Name is required' }}
                  />
                  <SelectController
                     control={control}
                     errors={errors}
                     name="brand"
                     options={brands}
                     placeholder="Car brand"
                     isMulti={false}
                     rules={{ required: 'Brand is required' }}
                  />
                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="model"
                     fieldType="input"
                     label="Car model"
                     rules={{ required: 'Model is required' }}
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
                        label="Year of release"
                        name="year"
                        rules={{ required: 'Year is required' }}
                     />
                  </div>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('transmission')}</h5>
                     <SelectController
                        control={control}
                        errors={errors}
                        placeholder="Transmission type"
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
                        label="Car mileage"
                        name="mileage"
                        rules={{ required: 'Car mileage is required' }}
                     />
                  </div>
               </div>
               <div className={cl.block}>
                  <h5 className={cl.subtitle}>{t('body')}</h5>

                  <ul className={cl.bodies}>
                     {bodies.map((b) => (
                        <li
                           className={[
                              cl.body,
                              b.value === selectedBody?.value ? cl.active : '',
                           ].join(' ')}
                           onClick={() => setSelectedBody(b)}
                           key={b.value}
                        >
                           <img className={cl.body__img} src={b.img} alt="" />
                           <h6 className={cl.body__name}>{b.label}</h6>
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
                        name="drive"
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
                        name="mileage"
                        rules={{ required: 'Car mileage is required' }}
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
                  <h5 className={cl.subtitle}>{t('contact')}</h5>
                  <div className={cl.block__content}>
                     <form className={cl.contactForm}>
                        <TextFieldController
                           control={control}
                           errors={errors}
                           fieldType="input"
                           label="Phone number"
                           name="phoneNumber"
                        />
                        <TextFieldController
                           control={control}
                           errors={errors}
                           fieldType="input"
                           label="Adress"
                           name="adress"
                        />
                        <TextFieldController
                           control={control}
                           errors={errors}
                           fieldType="input"
                           label="Email"
                           name="email"
                        />
                     </form>
                     {/* <img className={cl.contacFormImg} src={formImg} alt="" /> */}
                  </div>
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
                  <Button type="submit" title={t('place_ad')}>
                     {t('place_ad')}
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddAdvertPage;
