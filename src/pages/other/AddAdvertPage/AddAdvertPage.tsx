import cl from './AddAdvertPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import CatalogService from '@/api/services/CatalogService';
import { useEffect, useState } from 'react';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { IBody, useAddAdvert } from './useAddAdvert';
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
import { IOption } from '@/models/Select.types';
import { useTranslation } from 'react-i18next';

interface Props {}

const AddAdvertPage: React.FC<Props> = () => {
   useHideSidebar();
   const { t } = useTranslation();
   const fetchProducts = async () => {
      const products = await CatalogService.getProducts();

      console.log(products);
   };
   const { errors, handleSubmit, onSubmit, control, setSelectedBody } =
      useAddAdvert();
   let brandsOptions = [];
   const [brands, setBrands] = useState<IOption[]>([
      {
         value: 'BMW',
         label: 'BMW',
      },
      {
         value: 'Nissan',
         label: 'Nissan',
      },
      {
         value: 'Toyota',
         label: 'Toyota',
      },
      {
         value: 'Audi',
         label: 'Audi',
      },
      {
         value: 'Mercedes benz',
         label: 'Mercedes benz',
      },
      {
         value: 'Renault',
         label: 'Renault',
      },
   ]);
   const [bodies, setBodies] = useState<IBody[]>([
      {
         img: coupeImg,
         name: 'Coupe',
      },
      {
         img: universalImg,
         name: 'Universal',
      },
      {
         img: hatchbackImg,
         name: 'Hatchback',
      },
      {
         img: roadsterImg,
         name: 'Roadster',
      },
      {
         img: liftbackImg,
         name: 'Liftback',
      },
      {
         img: crossoverImg,
         name: 'Crossover',
      },
      {
         img: sedanImg,
         name: 'Sedan',
      },
      {
         img: offroadImg,
         name: 'Offroad',
      },
      {
         img: compactImg,
         name: 'Compact',
      },
      {
         img: cabrioletImg,
         name: 'Cabriolet',
      },
   ]);
   const [engines, setEngines] = useState<IBody[]>([
      {
         img: coupeImg,
         name: 'Coupe',
      },
      {
         img: universalImg,
         name: 'Universal',
      },
      {
         img: hatchbackImg,
         name: 'Hatchback',
      },
      {
         img: roadsterImg,
         name: 'Roadster',
      },
      {
         img: liftbackImg,
         name: 'Liftback',
      },
      {
         img: crossoverImg,
         name: 'Crossover',
      },
      {
         img: sedanImg,
         name: 'Sedan',
      },
      {
         img: offroadImg,
         name: 'Offroad',
      },
      {
         img: compactImg,
         name: 'Compact',
      },
      {
         img: cabrioletImg,
         name: 'Cabriolet',
      },
   ]);

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
                  <SelectController
                     control={control}
                     errors={errors}
                     name="brand"
                     options={brands}
                     placeholder="Car brand"
                     isMulti={false}
                     rules={{ required: 'Brand is required' }}
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
                     <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        label="Transmission type"
                        name="type"
                        rules={{ required: 'Transmission type is required' }}
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
                           className={cl.body}
                           onClick={() => setSelectedBody(b)}
                        >
                           <img className={cl.body__img} src={b.img} alt="" />
                           <h6 className={cl.body__name}>{b.name}</h6>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className={cl.block}>
                  <h5 className={cl.subtitle}>{t('photo')}</h5>
               </div>
               <div className={cl.block}>
                  <h5 className={cl.subtitle}>{t('generation')}</h5>
               </div>
               <div className={[cl.block, cl.spec].join(' ')}>
                  <div className={cl.elem}>
                     <h5 className={cl.subtitle}>{t('engine')}</h5>
                     <SelectController
                        control={control}
                        errors={errors}
                        name="engine"
                        rules={{ required: 'Engine is required' }}
                        isMulti={false}
                        options={[
                           {
                              value: '1',
                              label: '1',
                           },
                        ]}
                        placeholder={t('engine')}
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
                        options={[
                           {
                              value: '1',
                              label: '1',
                           },
                        ]}
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
                        isMulti={false}
                        options={[
                           {
                              value: '1',
                              label: '1',
                           },
                        ]}
                        placeholder={t('color')}
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
                  <button>{t('place_ad')}</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddAdvertPage;
