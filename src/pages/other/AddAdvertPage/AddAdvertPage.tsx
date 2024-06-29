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
import { Loader } from '@/components/UI/Loader/Loader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setModels, setBrands } from '@/store/reducers/FilterSlice';
import { brandsData } from '../../../data/brands.json';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

interface Props {}

interface IBody extends ISelectItem<TBody> {
   img: string;
}

export interface IBrand {
   id: string;
   name: string;
}
export interface IModel {
   id: string;
   name: string;
   class: string;
   'year-from': number;
   'year-to': number;
   generations: IGeneration[];
}

export interface IGeneration {
   id: string;
   name: string;
   'year-start': number;
   'year-stop': number;
}

const AddAdvertPage: React.FC<Props> = () => {
   useHideSidebar();
   const { t } = useTranslation();
   const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
   const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
   const [selectedGeneration, setSelectedGeneration] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useAppDispatch();
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
   const [logos, setLogos] = useState<string[]>([]);

   const [selectedBodyValue, setSelectedBodyValue] = useState<TBody>(
      bodies[0].value,
   );

   useEffect(() => {
      const newLogos = brandsData.map((b) => {
         return import(`../../../data/logos/${b.id}.png`).then(
            (res: { default: string }) => res.default,
            //    {
            //    // setLogos([...logos, 'aaa']);
            //    // console.log(res.default);
            // },
         );
      });

      console.log(newLogos);
   }, []);

   useEffect(() => {
      // console.log(logos);
      // console.log(brandsData);
   }, [logos]);

   // const OptionWithImage = (props) => (
   //    <components.Option {...props}>
   //       <img
   //          src={props.data.value === 'audi' ? audiImage : bmwImage} // Используйте соответствующее изображение для каждой марки
   //          alt={props.data.label}
   //          style={{ width: '20px', marginRight: '10px' }}
   //       />
   //       {props.data.label}
   //    </components.Option>
   // );

   useEffect(() => {
      // onFilterChange(selectedBrand, selectedModel);
   }, [selectedBrand, selectedModel]);

   const handleBrandChange = (brand: IBrand) => {
      setSelectedBrand(brand);
      setSelectedModel(null);
      console.log(brand);

      // Загрузка моделей для выбранной марки
      import(`../../../data/models/${brand.id}.json`).then(
         (data: { default: IModel[] }) => {
            console.log(data.default);
            dispatch(
               setModels(
                  data.default.map((model) => ({
                     value: model.id,
                     label: model.name,
                  })),
               ),
            );
         },
      );
   };

   useEffect(() => {
      const newBrands = brandsData.map((brand) => ({
         value: brand.id,
         label: brand.name,
      }));
      dispatch(setBrands(newBrands));
   }, []);

   const handleModelChange = (model: IModel) => {
      setSelectedModel(model);
   };

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

   // const { handleBrandChange, isLoading } = useFetchFilters();

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
                     {/* <SelectController
                        control={control}
                        errors={errors}
                        name="brand"
                        options={brands}
                        placeholder={t('brand')}
                        isMulti={false}
                        handleChange={(brand) =>
                           handleBrandChange({
                              id: brand.value,
                              name: brand.label,
                           })
                        }
                     /> */}
                     <Controller
                        name="brand"
                        control={control}
                        render={({ field }) => (
                           <Select
                              // styles={SelectStyles}
                              placeholder="Brand"
                              isMulti={false}
                              {...field}
                              options={brands}
                              value={{
                                 value: selectedBrand?.id,
                                 label: selectedBrand?.name,
                              }}
                              isDisabled={false}
                              components={{
                                 DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 if (newValue?.value && newValue?.label) {
                                    handleBrandChange({
                                       id: newValue.value,
                                       name: newValue.label,
                                    });
                                 }
                              }}
                           />
                        )}
                     />
                     <Controller
                        name="model"
                        control={control}
                        render={({ field }) => (
                           <Select
                              // styles={SelectStyles}
                              placeholder="Model"
                              isMulti={false}
                              {...field}
                              options={models}
                              value={{
                                 value: selectedModel?.id,
                                 label: selectedModel?.name,
                              }}
                              isDisabled={false}
                              components={{
                                 DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 // if (newValue?.value && newValue?.label) {
                                 //    handleModelChange({
                                 //       id: newValue.value,
                                 //       name: newValue.label,
                                 //    });
                                 // }
                              }}
                           />
                        )}
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
