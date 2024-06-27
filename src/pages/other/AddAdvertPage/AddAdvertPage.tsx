import cl from './AddAdvertPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useEffect, useState } from 'react';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useAddAdvert } from './useAddAdvert';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button/Button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ISelectItem, TBody } from '@/api/models/Products';
import { CheckboxController } from '@/components/UI/CheckboxController/CheckboxController';
import { useFetchFilters } from '@/hooks/useFetchFilters';
import { Loader } from '@/components/UI/Loader/Loader';

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
   const {
      brands,
      driveUnits,
      colors,
      fuels,
      gears,
      types,
      owners,
      colorings,
      models,
   } = useAppSelector((state) => state.FilterReducer);

   const [bodies] = useState<ISelectItem<TBody>[]>([
      {
         // img: coupeImg,
         value: 'coupe',
         label: 'Coupe',
      },
      {
         // img: universalImg,
         value: 'universal',
         label: 'Universal',
      },
      {
         // img: hatchbackImg,
         value: 'hatchback',
         label: 'Hatchback',
      },
      {
         // img: roadsterImg,
         value: 'roadster',
         label: 'Roadster',
      },
      {
         // img: liftbackImg,
         value: 'liftback',
         label: 'Liftback',
      },
      {
         // img: crossoverImg,
         value: 'crossover',
         label: 'Crossover',
      },
      {
         // img: sedanImg,
         value: 'sedan',
         label: 'Sedan',
      },
      {
         // img: offroadImg,
         value: 'offroad',
         label: 'Offroad',
      },
      {
         // img: compactImg,
         value: 'compact',
         label: 'Compact',
      },
      {
         // img: cabrioletImg,
         value: 'cabriolet',
         label: 'Cabriolet',
      },
   ]);

   const [selectedBodyValue, setSelectedBodyValue] = useState<TBody>(
      bodies[0].value,
   );

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

   const {
      handleGenerationChange,
      handleMakeChange,
      handleModelChange,
      isLoading,
   } = useFetchFilters();

   useEffect(() => {
      // brandsOptions = toIOption(brands);
   }, []);
   return (
      <>
         {isLoading && <Loader />}
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
                        placeholder={t('name')}
                     />
                     <SelectController
                        control={control}
                        errors={errors}
                        name="brand"
                        options={brands}
                        placeholder={t('brand')}
                        isMulti={false}
                        handleChange={(brand) => handleMakeChange(brand)}
                     />
                     <SelectController
                        control={control}
                        errors={errors}
                        name="model"
                        options={models}
                        placeholder={t('model')}
                        isMulti={false}
                     />
                     <TextFieldController
                        control={control}
                        errors={errors}
                        name="from"
                        fieldType="input"
                        label={t('car_from')}
                     />
                     {/* <TextFieldController
                     control={control}
                     errors={errors}
                     name="exchange"
                     fieldType="input"
                     label={t("model")}
                  /> */}
                     <SelectController
                        control={control}
                        errors={errors}
                        placeholder={t('owner')}
                        name="owner"
                        options={owners}
                        isMulti={false}
                     />
                     <CheckboxController
                        control={control}
                        errors={errors}
                        name="trade"
                        label={t('trade')}
                        fieldType="input"
                     />
                     <CheckboxController
                        control={control}
                        errors={errors}
                        name="exchange"
                        label={t('exchange')}
                        fieldType="input"
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
                           inputType="number"
                        />
                     </div>
                     <div className={cl.elem}>
                        <h5 className={cl.subtitle}>{t('Type')}</h5>
                        <SelectController
                           control={control}
                           errors={errors}
                           placeholder={t('Type')}
                           name="type"
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
                           label={t('mileage')}
                           name="millage"
                        />
                     </div>
                  </div>
                  <div className={cl.block}>
                     <h5 className={cl.subtitle}>{t('body')}</h5>
                     <SelectController
                        control={control}
                        errors={errors}
                        placeholder={t('body')}
                        name="body"
                        options={bodies}
                        isMulti={false}
                     />
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
                     {/* <ul className={cl.bodies}>
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
                  </ul> */}
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
                     />
                  </div>
                  <div className={[cl.block, cl.spec].join(' ')}>
                     <div className={cl.elem}>
                        <h5 className={cl.subtitle}>{t('engine')}</h5>
                        <SelectController
                           control={control}
                           errors={errors}
                           name="fuel"
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
                           placeholder={t('color')}
                           isMulti={false}
                           options={colors}
                        />
                     </div>
                     <div className={cl.elem}>
                        <h5 className={cl.subtitle}>{t('color')}</h5>
                        <SelectController
                           control={control}
                           errors={errors}
                           name="coloring"
                           placeholder={t('coloring')}
                           isMulti={false}
                           options={colorings}
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
                        name="description"
                     />
                  </div>

                  <div className={cl.block}>
                     <h5 className={cl.subtitle}>{t('price')}</h5>
                     <TextFieldController
                        control={control}
                        errors={errors}
                        fieldType="input"
                        label={`${t('price')} $`}
                        name="price"
                     />
                  </div>
                  <Button type="submit" title={t('place_ad')}>
                     {t('place_ad')}
                  </Button>
               </form>
            </div>
         </div>
      </>
   );
};

export default AddAdvertPage;
