import cl from './AddAdvertPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useEffect, useState } from 'react';
import { useAddAdvert } from './useAddAdvert';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button/Button';
import { ISelectItem, TBody } from '@/api/models/Products';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
   setBrands,
   setModels,
   setSelectedBrand,
   setSelectedModel,
} from '@/store/reducers/FilterSlice';
import { brandsData } from '../../../data/brands.json';
import typeCar from './assets/types/car.png';
import typeMotorcycle from './assets/types/motorcycle.png';
import { Carousel, ConfigProvider } from 'antd';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAppSelector } from '@/hooks/useAppSelector';

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

export interface IProductType {
   label: string;
   value: string;
   img: string;
}

interface Props {}

const AddAdvertPage: React.FC<Props> = () => {
   useHideSidebar();
   const { t } = useTranslation();
   const dispatch = useAppDispatch();
   // const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
   // const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
   const [selectedGeneration, setSelectedGeneration] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [stage, setStage] = useState(1);

   // const fetchProducts = async () => {
   //    const products = await CatalogService.getProducts();

   //    console.log(products);
   // };
   const { errors, control, handleSubmit, onSubmit, handleImageUpload } =
      useAddAdvert();
   const {
      brands,
      driveUnits,
      colors,
      fuels,
      gears,
      owners,
      colorings,
      models,
      selectedBrand,
      selectedModel,
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
      const newLogos = brandsData?.map((b) => {
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

   // useEffect(() => {
   //    // onFilterChange(selectedBrand, selectedModel);
   // }, [selectedBrand, selectedModel]);

   const handleBrandChange = (brand: ISelectItem<string>) => {
      dispatch(setSelectedBrand(brand));
      dispatch(setSelectedModel(null));
      console.log(brand);

      // Загрузка моделей для выбранной марки
      import(`../../../data/models/${brand.value}.json`).then(
         (data: { default: IModel[] }) => {
            console.log(data.default);
            dispatch(
               setModels(
                  data.default?.map((model) => ({
                     value: model.id,
                     label: model.name,
                  })),
               ),
            );
         },
      );
   };

   const handleModelChange = (model: ISelectItem<string>) => {
      dispatch(setSelectedModel(model));
      // console.log(brand);

      // Загрузка моделей для выбранной марки
      // import(`../../../data/models/${brand.value}.json`).then(
      //    (data: { default: IModel[] }) => {
      //       console.log(data.default);
      //       dispatch(
      //          setModels(
      //             data.default?.map((model) => ({
      //                value: model.id,
      //                label: model.name,
      //             })),
      //          ),
      //       );
      //    },
      // );
   };

   useEffect(() => {
      const newBrands = brandsData?.map((brand) => ({
         value: brand.id,
         label: brand.name,
      }));
      dispatch(setBrands(newBrands));
   }, []);

   // const handleModelChange = (model: IModel) => {
   //    dispatch(setModel))
   // };

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

   const [types] = useState<IProductType[]>([
      {
         label: 'automobile',
         value: 'automobile',
         img: typeCar,
      },
      {
         label: 'motorcycle',
         value: 'motorcycle',
         img: typeMotorcycle,
      },
      // {
      //    label: 'automobile',
      //    value: 'automobile',
      //    img: typeCar,

      // },
      // {
      //    label: 'automobile',
      //    value: 'automobile',
      //    img: typeCar,

      // },
   ]);
   const [selectedType, setSelectedType] = useState<string>(types[0].value);

   // const settings = {
   //    dots: true,
   //    dotsClass: 'slick-dots slick-thumb',
   //    infinite: true,
   //    speed: 500,
   //    slidesToShow: 1,
   //    slidesToScroll: 1,
   // };

   useEffect(() => {
      console.log(stage);
   }, [stage]);
   return (
      <>
         {isLoading && <Loader />}
         <div className={cl.add}>
            <div className={cl.addHeader}>
               <h3 className={cl.addTitle}>{t('submit_your_ad')}</h3>
            </div>
            <div className={cl.wrapper}>
               <form className={cl.addForm} onSubmit={handleSubmit(onSubmit)}>
                  <ConfigProvider
                     theme={{
                        components: {
                           Carousel: {
                              arrowSize: 38,
                              arrowOffset: 26,
                              dotHeight: 5,
                           },
                        },
                     }}
                  >
                     {stage === 1 && (
                        <div>
                           <h4 className={cl.title}>{t('choose_type')}</h4>
                           <Carousel
                              speed={350}
                              arrows
                              afterChange={(i) => {
                                 setSelectedType(types[i].value);
                                 console.log(selectedType);
                              }}
                           >
                              {types.map((type) => (
                                 <div className={cl.typeCard}>
                                    <img src={type.img} alt="" />
                                    <p>{t(type.label)}</p>
                                 </div>
                              ))}
                           </Carousel>
                        </div>
                     )}
                     {stage === 2 && (
                        <div className={cl.block}>
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
                                    value={selectedBrand}
                                    isDisabled={false}
                                    components={{
                                       DropdownIndicator: null, // Убираем индикатор создания нового значения
                                       IndicatorSeparator: null, // Убираем разделитель индикатора
                                    }}
                                    isClearable={true}
                                    onChange={(newValue) => {
                                       if (newValue?.value && newValue?.label) {
                                          handleBrandChange(newValue);
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
                                    value={selectedModel}
                                    isDisabled={false}
                                    components={{
                                       DropdownIndicator: null, // Убираем индикатор создания нового значения
                                       IndicatorSeparator: null, // Убираем разделитель индикатора
                                    }}
                                    isClearable={true}
                                    onChange={(newValue) => {
                                       if (newValue?.value && newValue?.label) {
                                          handleModelChange(newValue);
                                       }
                                    }}
                                 />
                              )}
                           />
                        </div>
                     )}

                     <button onClick={() => setStage((prev) => --prev)}>
                        {t('prev')}
                     </button>
                     <button onClick={() => setStage((prev) => ++prev)}>
                        {t('next')}
                     </button>
                  </ConfigProvider>
                  {/* <div className={cl.block}>
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
                              value={selectedBrand}
                              isDisabled={false}
                              components={{
                                 DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 if (newValue?.value && newValue?.label) {
                                    handleBrandChange(newValue);
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
                     <TextFieldController
                        control={control}
                        errors={errors}
                        name="exchange"
                        fieldType="input"
                        label={t('model')}
                     />
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
                  </div>
                  <div className={cl.block}>
                     <h5 className={cl.subtitle}>{t('photo')}</h5>
                     <ImageUpload
                        maxImages={15}
                        maxImageSize={1}
                        onImageUpload={handleImageUpload}
                     />
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
                  </div> */}
                  {/* <Button type="submit" title={t('place_ad')}>
                     {t('place_ad')}
                  </Button> */}
               </form>
            </div>
         </div>
      </>
   );
};

export default AddAdvertPage;
