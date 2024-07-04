import { ISelectItem } from '@/api/models/Products';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { IProductType, IModel, IGeneration } from './AddAdvertPage';

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

// export interface IPostProductInputs {
//    name: string;
//    brand: ISelectItem<TBrand>;
//    model: string;
//    year: number;
//    type: ISelectItem<TProductType>;
//    millage: number;
//    from: string;
//    exchange: boolean;
//    trade: boolean;
//    owner: ISelectItem<TOwner>;
//    body: TBody;
//    photo: string;
//    generation: string;
//    fuel: ISelectItem<TFuel>;
//    gear: ISelectItem<TGear>;
//    driveUnit: ISelectItem<TDriveUnit>;
//    color: ISelectItem<TColor>;
//    coloring: ISelectItem<TColoring>;
//    desc: string;
//    price: number;
// }

export const useAddAdvert = () => {
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
   const [countries, setCountries] = useState<
      {
         label: string;
         value: string;
      }[]
   >([
      {
         label: 'Afghanistan',
         value: 'Afghanistan',
      },
      {
         label: 'Albania',
         value: 'Albania',
      },
      {
         label: 'Algeria',
         value: 'Algeria',
      },
      {
         label: 'Andorra',
         value: 'Andorra',
      },
      {
         label: 'Angola',
         value: 'Angola',
      },
      {
         label: 'Antigua & Deps',
         value: 'Antigua & Deps',
      },
      {
         label: 'Argentina',
         value: 'Argentina',
      },
      {
         label: 'Armenia',
         value: 'Armenia',
      },
      {
         label: 'Australia',
         value: 'Australia',
      },
      {
         label: 'Austria',
         value: 'Austria',
      },
      {
         label: 'Azerbaijan',
         value: 'Azerbaijan',
      },
      {
         label: 'Bahamas',
         value: 'Bahamas',
      },
      {
         label: 'Bahrain',
         value: 'Bahrain',
      },
      {
         label: 'Bangladesh',
         value: 'Bangladesh',
      },
      {
         label: 'Barbados',
         value: 'Barbados',
      },
      {
         label: 'Belarus',
         value: 'Belarus',
      },
      {
         label: 'Belgium',
         value: 'Belgium',
      },
      {
         label: 'Belize',
         value: 'Belize',
      },
      {
         label: 'Benin',
         value: 'Benin',
      },
      {
         label: 'Bhutan',
         value: 'Bhutan',
      },
      {
         label: 'Bolivia',
         value: 'Bolivia',
      },
      {
         label: 'Bosnia Herzegovina',
         value: 'Bosnia Herzegovina',
      },
      {
         label: 'Botswana',
         value: 'Botswana',
      },
      {
         label: 'Brazil',
         value: 'Brazil',
      },
      {
         label: 'Brunei',
         value: 'Brunei',
      },
      {
         label: 'Bulgaria',
         value: 'Bulgaria',
      },
      {
         label: 'Burkina',
         value: 'Burkina',
      },
      {
         label: 'Burundi',
         value: 'Burundi',
      },
      {
         label: 'Cambodia',
         value: 'Cambodia',
      },
      {
         label: 'Cameroon',
         value: 'Cameroon',
      },
      {
         label: 'Canada',
         value: 'Canada',
      },
      {
         label: 'Cape Verde',
         value: 'Cape Verde',
      },
      {
         label: 'Central African Rep',
         value: 'Central African Rep',
      },
      {
         label: 'Chad',
         value: 'Chad',
      },
      {
         label: 'Chile',
         value: 'Chile',
      },
      {
         label: 'China',
         value: 'China',
      },
      {
         label: 'Colombia',
         value: 'Colombia',
      },
      {
         label: 'Comoros',
         value: 'Comoros',
      },
      {
         label: 'Congo',
         value: 'Congo',
      },
      {
         label: 'Congo {Democratic Rep}',
         value: 'Congo {Democratic Rep}',
      },
      {
         label: 'Costa Rica',
         value: 'Costa Rica',
      },
      {
         label: 'Croatia',
         value: 'Croatia',
      },
      {
         label: 'Cuba',
         value: 'Cuba',
      },
      {
         label: 'Cyprus',
         value: 'Cyprus',
      },
      {
         label: 'Czech Republic',
         value: 'Czech Republic',
      },
      {
         label: 'Denmark',
         value: 'Denmark',
      },
      {
         label: 'Djibouti',
         value: 'Djibouti',
      },
      {
         label: 'Dominica',
         value: 'Dominica',
      },
      {
         label: 'Dominican Republic',
         value: 'Dominican Republic',
      },
      {
         label: 'East Timor',
         value: 'East Timor',
      },
      {
         label: 'Ecuador',
         value: 'Ecuador',
      },
      {
         label: 'Egypt',
         value: 'Egypt',
      },
      {
         label: 'El Salvador',
         value: 'El Salvador',
      },
      {
         label: 'Equatorial Guinea',
         value: 'Equatorial Guinea',
      },
      {
         label: 'Eritrea',
         value: 'Eritrea',
      },
      {
         label: 'Estonia',
         value: 'Estonia',
      },
      {
         label: 'Ethiopia',
         value: 'Ethiopia',
      },
      {
         label: 'Fiji',
         value: 'Fiji',
      },
      {
         label: 'Finland',
         value: 'Finland',
      },
      {
         label: 'France',
         value: 'France',
      },
      {
         label: 'Gabon',
         value: 'Gabon',
      },
      {
         label: 'Gambia',
         value: 'Gambia',
      },
      {
         label: 'Georgia',
         value: 'Georgia',
      },
      {
         label: 'Germany',
         value: 'Germany',
      },
      {
         label: 'Ghana',
         value: 'Ghana',
      },
      {
         label: 'Greece',
         value: 'Greece',
      },
      {
         label: 'Grenada',
         value: 'Grenada',
      },
      {
         label: 'Guatemala',
         value: 'Guatemala',
      },
      {
         label: 'Guinea',
         value: 'Guinea',
      },
      {
         label: 'Guinea-Bissau',
         value: 'Guinea-Bissau',
      },
      {
         label: 'Guyana',
         value: 'Guyana',
      },
      {
         label: 'Haiti',
         value: 'Haiti',
      },
      {
         label: 'Honduras',
         value: 'Honduras',
      },
      {
         label: 'Hungary',
         value: 'Hungary',
      },
      {
         label: 'Iceland',
         value: 'Iceland',
      },
      {
         label: 'India',
         value: 'India',
      },
      {
         label: 'Indonesia',
         value: 'Indonesia',
      },
      {
         label: 'Iran',
         value: 'Iran',
      },
      {
         label: 'Iraq',
         value: 'Iraq',
      },
      {
         label: 'Ireland {Republic}',
         value: 'Ireland {Republic}',
      },
      {
         label: 'Israel',
         value: 'Israel',
      },
      {
         label: 'Italy',
         value: 'Italy',
      },
      {
         label: 'Ivory Coast',
         value: 'Ivory Coast',
      },
      {
         label: 'Jamaica',
         value: 'Jamaica',
      },
      {
         label: 'Japan',
         value: 'Japan',
      },
      {
         label: 'Jordan',
         value: 'Jordan',
      },
      {
         label: 'Kazakhstan',
         value: 'Kazakhstan',
      },
      {
         label: 'Kenya',
         value: 'Kenya',
      },
      {
         label: 'Kiribati',
         value: 'Kiribati',
      },
      {
         label: 'Korea North',
         value: 'Korea North',
      },
      {
         label: 'Korea South',
         value: 'Korea South',
      },
      {
         label: 'Kosovo',
         value: 'Kosovo',
      },
      {
         label: 'Kuwait',
         value: 'Kuwait',
      },
      {
         label: 'Kyrgyzstan',
         value: 'Kyrgyzstan',
      },
      {
         label: 'Laos',
         value: 'Laos',
      },
      {
         label: 'Latvia',
         value: 'Latvia',
      },
      {
         label: 'Lebanon',
         value: 'Lebanon',
      },
      {
         label: 'Lesotho',
         value: 'Lesotho',
      },
      {
         label: 'Liberia',
         value: 'Liberia',
      },
      {
         label: 'Libya',
         value: 'Libya',
      },
      {
         label: 'Liechtenstein',
         value: 'Liechtenstein',
      },
      {
         label: 'Lithuania',
         value: 'Lithuania',
      },
      {
         label: 'Luxembourg',
         value: 'Luxembourg',
      },
      {
         label: 'Macedonia',
         value: 'Macedonia',
      },
      {
         label: 'Madagascar',
         value: 'Madagascar',
      },
      {
         label: 'Malawi',
         value: 'Malawi',
      },
      {
         label: 'Malaysia',
         value: 'Malaysia',
      },
      {
         label: 'Maldives',
         value: 'Maldives',
      },
      {
         label: 'Mali',
         value: 'Mali',
      },
      {
         label: 'Malta',
         value: 'Malta',
      },
      {
         label: 'Marshall Islands',
         value: 'Marshall Islands',
      },
      {
         label: 'Mauritania',
         value: 'Mauritania',
      },
      {
         label: 'Mauritius',
         value: 'Mauritius',
      },
      {
         label: 'Mexico',
         value: 'Mexico',
      },
      {
         label: 'Micronesia',
         value: 'Micronesia',
      },
      {
         label: 'Moldova',
         value: 'Moldova',
      },
      {
         label: 'Monaco',
         value: 'Monaco',
      },
      {
         label: 'Mongolia',
         value: 'Mongolia',
      },
      {
         label: 'Montenegro',
         value: 'Montenegro',
      },
      {
         label: 'Morocco',
         value: 'Morocco',
      },
      {
         label: 'Mozambique',
         value: 'Mozambique',
      },
      {
         label: 'Myanmar, {Burma}',
         value: 'Myanmar, {Burma}',
      },
      {
         label: 'Namibia',
         value: 'Namibia',
      },
      {
         label: 'Nauru',
         value: 'Nauru',
      },
      {
         label: 'Nepal',
         value: 'Nepal',
      },
      {
         label: 'Netherlands',
         value: 'Netherlands',
      },
      {
         label: 'New Zealand',
         value: 'New Zealand',
      },
      {
         label: 'Nicaragua',
         value: 'Nicaragua',
      },
      {
         label: 'Niger',
         value: 'Niger',
      },
      {
         label: 'Nigeria',
         value: 'Nigeria',
      },
      {
         label: 'Norway',
         value: 'Norway',
      },
      {
         label: 'Oman',
         value: 'Oman',
      },
      {
         label: 'Pakistan',
         value: 'Pakistan',
      },
      {
         label: 'Palau',
         value: 'Palau',
      },
      {
         label: 'Panama',
         value: 'Panama',
      },
      {
         label: 'Papua New Guinea',
         value: 'Papua New Guinea',
      },
      {
         label: 'Paraguay',
         value: 'Paraguay',
      },
      {
         label: 'Peru',
         value: 'Peru',
      },
      {
         label: 'Philippines',
         value: 'Philippines',
      },
      {
         label: 'Poland',
         value: 'Poland',
      },
      {
         label: 'Portugal',
         value: 'Portugal',
      },
      {
         label: 'Qatar',
         value: 'Qatar',
      },
      {
         label: 'Romania',
         value: 'Romania',
      },
      {
         label: 'Russian Federation',
         value: 'Russian Federation',
      },
      {
         label: 'Rwanda',
         value: 'Rwanda',
      },
      {
         label: 'St Kitts & Nevis',
         value: 'St Kitts & Nevis',
      },
      {
         label: 'St Lucia',
         value: 'St Lucia',
      },
      {
         label: 'Saint Vincent & the Grenadines',
         value: 'Saint Vincent & the Grenadines',
      },
      {
         label: 'Samoa',
         value: 'Samoa',
      },
      {
         label: 'San Marino',
         value: 'San Marino',
      },
      {
         label: 'Sao Tome & Principe',
         value: 'Sao Tome & Principe',
      },
      {
         label: 'Saudi Arabia',
         value: 'Saudi Arabia',
      },
      {
         label: 'Senegal',
         value: 'Senegal',
      },
      {
         label: 'Serbia',
         value: 'Serbia',
      },
      {
         label: 'Seychelles',
         value: 'Seychelles',
      },
      {
         label: 'Sierra Leone',
         value: 'Sierra Leone',
      },
      {
         label: 'Singapore',
         value: 'Singapore',
      },
      {
         label: 'Slovakia',
         value: 'Slovakia',
      },
      {
         label: 'Slovenia',
         value: 'Slovenia',
      },
      {
         label: 'Solomon Islands',
         value: 'Solomon Islands',
      },
      {
         label: 'Somalia',
         value: 'Somalia',
      },
      {
         label: 'South Africa',
         value: 'South Africa',
      },
      {
         label: 'South Sudan',
         value: 'South Sudan',
      },
      {
         label: 'Spain',
         value: 'Spain',
      },
      {
         label: 'Sri Lanka',
         value: 'Sri Lanka',
      },
      {
         label: 'Sudan',
         value: 'Sudan',
      },
      {
         label: 'Suriname',
         value: 'Suriname',
      },
      {
         label: 'Swaziland',
         value: 'Swaziland',
      },
      {
         label: 'Sweden',
         value: 'Sweden',
      },
      {
         label: 'Switzerland',
         value: 'Switzerland',
      },
      {
         label: 'Syria',
         value: 'Syria',
      },
      {
         label: 'Taiwan',
         value: 'Taiwan',
      },
      {
         label: 'Tajikistan',
         value: 'Tajikistan',
      },
      {
         label: 'Tanzania',
         value: 'Tanzania',
      },
      {
         label: 'Thailand',
         value: 'Thailand',
      },
      {
         label: 'Togo',
         value: 'Togo',
      },
      {
         label: 'Tonga',
         value: 'Tonga',
      },
      {
         label: 'Trinidad & Tobago',
         value: 'Trinidad & Tobago',
      },
      {
         label: 'Tunisia',
         value: 'Tunisia',
      },
      {
         label: 'Turkey',
         value: 'Turkey',
      },
      {
         label: 'Turkmenistan',
         value: 'Turkmenistan',
      },
      {
         label: 'Tuvalu',
         value: 'Tuvalu',
      },
      {
         label: 'Uganda',
         value: 'Uganda',
      },
      {
         label: 'Ukraine',
         value: 'Ukraine',
      },
      {
         label: 'United Arab Emirates',
         value: 'United Arab Emirates',
      },
      {
         label: 'United Kingdom',
         value: 'United Kingdom',
      },
      {
         label: 'United States',
         value: 'United States',
      },
      {
         label: 'Uruguay',
         value: 'Uruguay',
      },
      {
         label: 'Uzbekistan',
         value: 'Uzbekistan',
      },
      {
         label: 'Vanuatu',
         value: 'Vanuatu',
      },
      {
         label: 'Vatican City',
         value: 'Vatican City',
      },
      {
         label: 'Venezuela',
         value: 'Venezuela',
      },
      {
         label: 'Vietnam',
         value: 'Vietnam',
      },
      {
         label: 'Yemen',
         value: 'Yemen',
      },
      {
         label: 'Zambia',
         value: 'Zambia',
      },
      {
         label: 'Zimbabwe',
         value: 'Zimbabwe',
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
      countries,
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
