import { IProduct, ISelectItem } from '@/api/models/Products';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useSearchBrand } from '@/hooks/useSearchBrand';
import {
   setSelectedBrand,
   setSelectedModel,
   setSelectedGeneration,
   setModels,
   setGenerations,
   setBrands,
   setSelectedBodyValue,
   setSelectedFuelValue,
   setSelectedGearValue,
   setSelectedDriveUnitValue,
} from '@/store/reducers/FilterSlice';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import glossyImg from './assets/glossy.png';
import matteImg from './assets/matte.png';
import nacreImg from './assets/nacre.png';
import metalicImg from './assets/metalic.png';
import { brandsData } from '../../../data/brands.json';
import typeCar from './assets/types/car.png';
import typeMotorcycle from './assets/types/motorcycle.png';

import coupeImg from './assets/bodies/coupe.png';
import cabrioletImg from './assets/bodies/cabriolet.png';
import compactImg from './assets/bodies/compact.png';
import crossoverImg from './assets/bodies/crossover.png';
import hatchbackImg from './assets/bodies/hatchback.png';
import liftbackImg from './assets/bodies/liftback.png';
import microcarImg from './assets/bodies/microcar.png';
import offroadImg from './assets/bodies/offroad.png';
import roadsterImg from './assets/bodies/roadster.png';
import sedanImg from './assets/bodies/sedan.png';
import subcompactImg from './assets/bodies/subcompact.png';
import universalImg from './assets/bodies/universal.png';
import ProductService from '@/api/services/ProductService';
import { countriesList } from '@/data/constants/countries';
import { toast } from 'react-toastify';

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

export const useChangeAdvert = () => {
   const dispatch = useAppDispatch();

   const {
      brands,
      colors,
      // gears,
      owners,
      models,
      generations,
      selectedModel,
      selectedGeneration,
      selectedGearValue,
      selectedBodyValue,
      selectedDriveUnitValue,
      selectedFuelValue,
   } = useAppSelector((state) => state.FilterReducer);
   const params = useParams();
   const [product, setProduct] = useState<IProduct | null>(null);
   // const fetchProducts = async () => {
   //    const products = await CatalogService.getProducts();

   //    console.log(products);
   // };

   useEffect(() => {
      if (params.productId) {
         const productRes = ProductService.getProduct({
            productId: params?.productId,
         }).then((res) => {
            setProduct(res?.data);

            // toast.error('ухади');
         });

         toast.promise(productRes, {
            error: 'Ухади',
         });
         console.log(product);
      }
   }, []);
   useEffect(() => {
      if (product) {
         setSelectedType(product.type);
         setSelectedBrand(
            brands.find((p) => p.value === product.brand) || null,
         );
         // setSelectedModel(product.type);
         // setSelectedType(product.type);
         // setSelectedType(product.type);
      }
   }, [product]);
   const [bodies] = useState<{ img: string; value: string }[]>([
      {
         img: coupeImg,
         value: 'coupe',
      },
      {
         img: universalImg,
         value: 'universal',
      },
      {
         img: hatchbackImg,
         value: 'hatchback',
      },
      {
         img: roadsterImg,
         value: 'roadster',
      },
      {
         img: liftbackImg,
         value: 'liftback',
      },
      {
         img: crossoverImg,
         value: 'crossover',
      },
      {
         img: sedanImg,
         value: 'sedan',
      },
      {
         img: offroadImg,
         value: 'offroad',
      },
      {
         img: compactImg,
         value: 'compact',
      },
      {
         img: cabrioletImg,
         value: 'cabriolet',
      },
      {
         img: microcarImg,
         value: 'microcar',
      },
      {
         img: subcompactImg,
         value: 'subcompact',
      },
   ]);

   const [colorings] = useState<{ img: string; value: string }[]>([
      {
         img: glossyImg,
         value: 'glossy',
      },
      {
         img: matteImg,
         value: 'matte',
      },
      {
         img: metalicImg,
         value: 'metalic',
      },
      {
         img: nacreImg,
         value: 'nacre',
      },
   ]);
   const [gears] = useState<{ img: string; value: string }[]>([
      {
         img: coupeImg,
         value: 'automatic',
      },
      {
         img: universalImg,
         value: 'manual',
      },
      {
         img: hatchbackImg,
         value: 'robotic',
      },
      {
         img: roadsterImg,
         value: 'other',
      },
   ]);
   const [fuels] = useState<{ img: string; value: string }[]>([
      {
         img: coupeImg,
         value: 'biodiesel',
      },
      {
         img: universalImg,
         value: 'diesel',
      },
      {
         img: hatchbackImg,
         value: 'electric',
      },
      {
         img: roadsterImg,
         value: 'gasoline',
      },
      {
         img: roadsterImg,
         value: 'other',
      },
   ]);
   const [driveUnits] = useState<
      { img: string; value: string; label: string }[]
   >([
      {
         img: coupeImg,
         label: 'driveUnits_all',
         value: 'all',
      },
      {
         img: universalImg,
         label: 'driveUnits_fwd',
         value: 'fwd',
      },
      {
         img: hatchbackImg,
         label: 'driveUnits_rwd',
         value: 'rwd',
      },
      // {
      //    img: roadsterImg,
      //    label: 'driveUnits_controlled_all',
      //    value: 'controlled_all',
      // },
      {
         img: roadsterImg,
         label: 'other',
         value: 'other',
      },
   ]);

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

   const [stage, setStage] = useState(1);
   const [desc, setDesc] = useState('');
   const [price, setPrice] = useState<string | undefined>(undefined);
   const [isExchange, setIsExchange] = useState<boolean>(false);
   const [isTrade, setIsTrade] = useState<boolean>(false);
   const [selectedCountryValue, setSelectedCountryValue] = useState<
      string | null
   >(null);
   const [selectedYear, setSelectedYear] = useState<number | null>(null);
   const [selectedOwnerValue, setSelectedOwnerValue] = useState<string | null>(
      null,
   );
   const [selectedColorValue, setSelectedColorValue] = useState<string | null>(
      null,
   );
   const [selectedColoringValue, setSelectedColoringValue] = useState<
      string | null
   >(null);
   const [selectedType, setSelectedType] = useState<string>(types[0].value);
   const [mileage, setMileage] = useState<string | undefined>(undefined);
   const { selectedBrand } = useAppSelector((state) => state.FilterReducer);
   const navigate = useNavigate();
   const [images, setImages] = useState<File[]>([]);
   const handleImageUpload = (newImages: File[]) => {
      setImages([...images, ...newImages]);
      console.log(images);
   };

   const [logos, setLogos] = useState<string[]>([]);

   const handleGenerateYears = (min?: number, max?: number) => {
      if (!min && !max) {
         min = 1800;
         max = new Date().getFullYear();
      }
      if (!min && max) {
         min = max;
      }
      if (!max && min) {
         max = min;
      }

      let newYears: number[] = [];

      if (min && max) {
         for (let i = min; i <= max; i++) {
            newYears.push(i);
         }
      }

      return newYears;
   };
   const handleSetLogos = async () => {
      const newLogos = await brandsData?.map((b) => {
         return import(`../../../data/logos/${b.id}.png`).then(
            (res: { default: string }) => {
               setLogos((prev) => [...prev, res.default]);
               // console.log(res.default);
            },
         );
      });

      console.log(newLogos);
   };
   useEffect(() => {
      handleSetLogos();
   }, []);

   const handleBrandChange = (brand: ISelectItem<string>) => {
      dispatch(setSelectedBrand(brand));
      dispatch(setSelectedModel(null));
      dispatch(setSelectedGeneration(null));
      setSelectedYear(null);
      console.log(brand);

      // Загрузка моделей для выбранной марки
      import(`../../../data/models/${brand.value}.json`).then(
         (data: { default: IModel[] }) => {
            console.log(data.default);
            dispatch(setModels(data.default));
         },

         // data.default?.map((model) => ({
         //    value: model.id,
         //    label: model.name,
         // })),
      );
   };

   const handleModelChange = (model?: IModel) => {
      if (model) {
         dispatch(setSelectedModel(model));
         dispatch(setSelectedGeneration(null));
         setSelectedYear(null);
         dispatch(setGenerations(model.generations));
      }
   };
   const handleDescChange = (newDesc: string) => {
      setDesc(newDesc);
   };
   const handleGenerationChange = (gen?: IGeneration) => {
      if (gen) {
         setSelectedYear(null);
         dispatch(setSelectedGeneration(gen));
      }
   };
   const handleYearChange = (year?: number) => {
      if (year) {
         setSelectedYear(year);
      }
   };

   useEffect(() => {
      const newBrands = brandsData?.map((brand) => ({
         value: brand.id,
         label: brand.name,
      }));
      dispatch(setBrands(newBrands));
   }, []);

   // const settings = {
   //    dots: true,
   //    dotsClass: 'slick-dots slick-thumb',
   //    infinite: true,
   //    speed: 500,
   //    slidesToShow: 1,
   //    slidesToScroll: 1,
   // };

   const handleNumberInputChange = (
      newValue: string,
      prevValue: string | undefined,
      minValue: number,
      maxValue: number,
      handleChange: (v: string | undefined) => void,
   ) => {
      try {
         console.log(newValue.replace(/ /g, ''));
         const newNumberValue = Number(newValue.replace(/ /g, ''));
         console.log(newNumberValue);

         if (isNaN(newNumberValue)) return;
         if (newNumberValue < minValue) {
            const minFormatedValue = minValue
               .toString()
               .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

            handleChange(minFormatedValue);
         } else if (newNumberValue > maxValue) {
            const maxFormatedValue = maxValue
               .toString()
               .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            handleChange(maxFormatedValue);
         } else {
            const newFormatedValue = newNumberValue
               .toString()
               .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            console.log(newFormatedValue);
            handleChange(newFormatedValue);
         }
      } catch (e) {
         handleChange(prevValue);
      }
   };

   const createGenerationString = (gen: IGeneration) => {
      const string =
         gen.name && gen['year-start'] && gen['year-stop']
            ? `${gen.name} (${gen['year-start']}-${gen['year-stop']})`
            : !gen.name && gen['year-start'] && gen['year-stop']
              ? `${gen['year-start']}-${gen['year-stop']}`
              : !gen.name && gen['year-start'] && !gen['year-stop']
                ? gen['year-start']
                : gen.name;

      return string;
   };

   useEffect(() => {
      console.log(stage);
   }, [stage]);

   const { search, filteredBrands, handleSearch } = useSearchBrand(brands);

   const bodySliderSettings = {
      // className: cl.center,
      centerMode: true,
      infinite: true,
      // centerPadding: '60px',
      slidesToShow: 3,
      dots: true,
      speed: 300,
      afterChange: (index: number) => {
         dispatch(setSelectedBodyValue(bodies[index]?.value));
      },
   };
   const fuelSliderSettings = {
      // className: cl.center,
      centerMode: true,
      infinite: true,
      // centerPadding: '60px',
      slidesToShow: 3,
      dots: true,
      speed: 300,
      afterChange: (index: number) => {
         dispatch(setSelectedFuelValue(fuels[index]?.value));
      },
   };
   const gearSliderSettings = {
      // className: cl.center,
      centerMode: true,
      infinite: true,
      // centerPadding: '60px',
      slidesToShow: 3,
      dots: true,
      speed: 300,
      afterChange: (index: number) => {
         dispatch(setSelectedGearValue(gears[index]?.value));
      },
   };
   const driveUnitSliderSettings = {
      // className: cl.center,
      centerMode: true,
      infinite: true,
      // centerPadding: '60px',
      slidesToShow: 3,
      dots: true,
      speed: 300,
      afterChange: (index: number) => {
         dispatch(setSelectedDriveUnitValue(driveUnits[index]?.value));
      },
   };
   const coloringUnitSliderSettings = {
      // className: cl.center,
      centerMode: true,
      infinite: true,
      // centerPadding: '60px',
      slidesToShow: 3,
      dots: true,
      speed: 300,
      afterChange: (index: number) => {
         setSelectedColoringValue(colorings[index]?.value);
      },
   };
   const onSubmit = () => {
      try {
         console.log();
         if (
            selectedBodyValue &&
            selectedBrand &&
            selectedColorValue &&
            selectedColoringValue &&
            selectedDriveUnitValue &&
            selectedCountryValue &&
            selectedFuelValue &&
            selectedGearValue &&
            selectedGeneration &&
            mileage &&
            selectedModel &&
            selectedOwnerValue &&
            price &&
            selectedType &&
            selectedYear
         ) {
            ProductService.postProduct({
               body: selectedBodyValue,
               brand: selectedBrand.value,
               color: selectedColorValue,
               coloring: selectedColoringValue,
               description: desc,
               driveUnit: selectedDriveUnitValue.toUpperCase(),
               exchange: isExchange,
               from: selectedCountryValue,
               fuel: selectedFuelValue.toUpperCase(),
               gear: selectedGearValue.toUpperCase(),
               generation:
                  createGenerationString(selectedGeneration).toString(),
               isNew: false,
               millage: Number(mileage.replace(/ /g, '')),
               model: selectedModel.name,
               // name: data?.name,
               owner: selectedOwnerValue.toUpperCase(),
               price: Number(price.replace(/ /g, '')),
               trade: isTrade,
               type: selectedType.toUpperCase(),
               year: selectedYear,
               createdAt: new Date(),
            }).then((res) => {
               const formData = new FormData();
               images.map((image) => {
                  formData.append('files', image);
               });
               formData.append('commodityId', res.data.id);
               ProductService.uploadPhotos(formData);
               setImages([]);
               // reset();
            });
         }
      } catch (e) {
         console.log(e);
      }
   };

   return {
      handleImageUpload,
      bodies,
      bodySliderSettings,
      brands,
      brandsData,
      coloringUnitSliderSettings,
      colorings,
      colors,
      countriesList,
      createGenerationString,
      desc,
      driveUnitSliderSettings,
      driveUnits,
      filteredBrands,
      fuelSliderSettings,
      fuels,
      gearSliderSettings,
      gears,
      generations,
      handleBrandChange,
      handleModelChange,
      handleGenerationChange,
      handleNumberInputChange,
      handleSearch,
      search,
      handleSetLogos,
      handleYearChange,
      stage,
      selectedBrand,
      setStage,
      logos,
      selectedModel,
      selectedGeneration,
      models,
      setSelectedType,
      selectedType,
      types,
      handleGenerateYears,
      selectedYear,
      mileage,
      setMileage,
      selectedCountryValue,
      setSelectedCountryValue,
      owners,
      selectedOwnerValue,
      setSelectedOwnerValue,
      selectedBodyValue,
      selectedGearValue,
      selectedFuelValue,
      selectedDriveUnitValue,
      handleDescChange,
      selectedColorValue,
      setSelectedColorValue,
      selectedColoringValue,
      price,
      onSubmit,
      setPrice,
      isExchange,
      setIsExchange,
      setIsTrade,
      isTrade,
   };
};
