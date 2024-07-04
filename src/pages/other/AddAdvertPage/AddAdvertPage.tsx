import cl from './AddAdvertPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useEffect, useState } from 'react';
import { useAddAdvert } from './useAddAdvert';
import { useTranslation } from 'react-i18next';
import { ISelectItem } from '@/api/models/Products';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import glossyImg from './assets/glossy.png';
import matteImg from './assets/matte.png';
import nacreImg from './assets/nacre.png';
import metalicImg from './assets/metalic.png';
import {
   setBrands,
   setGenerations,
   setModels,
   setSelectedBodyValue,
   setSelectedBrand,
   setSelectedDriveUnitValue,
   setSelectedFuelValue,
   setSelectedGearValue,
   setSelectedGeneration,
   setSelectedModel,
} from '@/store/reducers/FilterSlice';
import { brandsData } from '../../../data/brands.json';
import typeCar from './assets/types/car.png';
import typeMotorcycle from './assets/types/motorcycle.png';
import { Carousel, ConfigProvider } from 'antd';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAppSelector } from '@/hooks/useAppSelector';

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
import { useSearchBrand } from '@/hooks/useSearchBrand';
import Slider from 'react-slick';
import ImageUpload from '@/components/layout/ProductPhotoUpload/ProductPhotoUpload';

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
      colors,
      // gears,
      owners,
      models,
      generations,
      selectedBrand,
      selectedModel,
      selectedGeneration,
      selectedGearValue,
      selectedBodyValue,
      selectedDriveUnitValue,
      selectedFuelValue,
   } = useAppSelector((state) => state.FilterReducer);
   const [desc, setDesc] = useState('');
   const [price, setPrice] = useState<string | undefined>(undefined);
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

   // fuels: [
   //    // {
   //    //    value: 'BIODIESEL',
   //    //    label: 'biodiesel',
   //    // },
   //    {
   //       value: 'DIESEL',
   //       label: 'diesel',
   //    },
   //    {
   //       value: 'ELECTRIC',
   //       label: 'electric',
   //    },
   //    {
   //       value: 'GASOLINE',
   //       label: 'gasoline',
   //    },
   //    // {
   //    //    value: 'METHANE',
   //    //    label: 'methane',
   //    // },
   //    {
   //       value: 'OTHER',
   //       label: 'other',
   //    },
   //    // {
   //    //    value: 'PROPANE',
   //    //    label: 'propane',
   //    // },
   // ],

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
   const [driveUnits] = useState<{ img: string; value: string }[]>([
      {
         img: coupeImg,
         value: 'driveUnits_all',
      },
      {
         img: universalImg,
         value: 'driveUnits_fwd',
      },
      {
         img: hatchbackImg,
         value: 'driveUnits_rwd',
      },
      {
         img: roadsterImg,
         value: 'driveUnits_controlled_all',
      },
      {
         img: roadsterImg,
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
   const [logos, setLogos] = useState<string[]>([]);
   const [years, setYears] = useState<number[]>([]);
   const [selectedYear, setSelectedYear] = useState<number | null>(null);
   const [isExchange, setIsExchange] = useState<boolean>(false);
   const [isTrade, setIsTrade] = useState<boolean>(false);
   const [selectedCountryValue, setSelectedCountryValue] = useState<
      string | null
   >(null);
   const [selectedOwnerValue, setSelectedOwnerValue] = useState<string | null>(
      null,
   );
   const [selectedColorValue, setSelectedColorValue] = useState<string | null>(
      null,
   );
   const [selectedColoringValue, setSelectedColoringValue] = useState<
      string | null
   >(null);
   const [mileage, setMileage] = useState<string | undefined>(undefined);
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

   const getFormatedString = (value: string) => {
      const parts = value
         .split('')
         .reverse()
         .reduce((acc, char, index) => {
            if (index > 0 && index % 3 === 0) {
               acc.push(' ');
            }
            acc.push(char);
            return acc;
         }, [] as string[])
         .reverse()
         .join('');

      return parts;
   };

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
   return (
      <>
         <div className={cl.add}>
            <div className={cl.addHeader}>
               <h3 className={cl.addTitle}>
                  {stage === 1
                     ? t('Select the product type')
                     : stage === 2
                       ? t('Select the product type')
                       : t('submit_your_ad')}
               </h3>
            </div>
            <div className={cl.wrapper}>
               <form className={cl.addForm}>
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
                        <div className={cl.block}>
                           {/* <h4 className={cl.title}>{t('choose_type')}</h4> */}
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
                           <div className={cl.stageControl}>
                              <button
                                 className={[
                                    stage <= 5 ? cl.visible : '',
                                    cl.stageBtn,
                                 ].join(' ')}
                                 onClick={() => setStage((prev) => ++prev)}
                              >
                                 {t('next')}
                              </button>
                           </div>
                        </div>
                     )}
                     {stage === 2 && (
                        <div className={cl.block}>
                           <div className={cl.formElem}>
                              <label htmlFor="brand">{t('brand')}</label>
                              <input
                                 title="search"
                                 className={cl.input}
                                 value={search}
                                 onChange={(e) => handleSearch(e.target.value)}
                                 id="brand"
                              />
                              <div className={cl.brands}>
                                 {(filteredBrands.length
                                    ? filteredBrands
                                    : brands
                                 ).map((brand) => (
                                    <div
                                       className={[
                                          cl.brandCard,
                                          brand.value === selectedBrand?.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                       key={brand.value}
                                       onClick={() => handleBrandChange(brand)}
                                    >
                                       <img
                                          src={logos.find((logo) =>
                                             logo.includes(brand.value),
                                          )}
                                          alt=""
                                       />

                                       {brand.label}
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div
                              className={[
                                 cl.formElem,
                                 !selectedBrand ? cl.hidden : '',
                              ].join(' ')}
                           >
                              <label htmlFor="model">{t('model')}</label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder="Model"
                                 id="model"
                                 isMulti={false}
                                 options={models.map((model) => ({
                                    value: model.id,
                                    label: model.name,
                                 }))}
                                 value={{
                                    value: selectedModel?.id,
                                    label: selectedModel?.id,
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue) {
                                       handleModelChange(
                                          models.find(
                                             (model) =>
                                                model.id === newValue.value,
                                          ),
                                       );
                                    }
                                 }}
                              />
                           </div>
                           <div
                              className={[
                                 cl.formElem,
                                 !selectedModel ? cl.hidden : '',
                              ].join(' ')}
                           >
                              <label htmlFor="generation">
                                 {t('generation')}
                              </label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder="Generation"
                                 isMulti={false}
                                 id="generation"
                                 options={generations.map((gen) => ({
                                    value: gen.id,
                                    label: createGenerationString(gen),
                                 }))}
                                 value={{
                                    value: selectedGeneration?.id,
                                    label:
                                       selectedGeneration &&
                                       createGenerationString(
                                          selectedGeneration,
                                       ),
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue) {
                                       handleGenerationChange(
                                          generations.find(
                                             (g) => g.id === newValue.value,
                                          ),
                                       );
                                    }
                                 }}
                              />
                           </div>
                           <div
                              className={[
                                 cl.formElem,
                                 !selectedGeneration ? cl.hidden : '',
                              ].join(' ')}
                           >
                              <label htmlFor="year_of_release">
                                 {t('year_of_release')}
                              </label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder={t('year_of_release')}
                                 isMulti={false}
                                 id="year_of_release"
                                 options={handleGenerateYears(
                                    selectedGeneration?.['year-start'],
                                    selectedGeneration?.['year-stop'],
                                 ).map((year) => ({
                                    label: year,
                                    value: year,
                                 }))}
                                 value={{
                                    value: selectedYear,
                                    label: selectedYear,
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue?.value) {
                                       handleYearChange(newValue?.value);
                                    }
                                 }}
                              />
                           </div>
                           <div className={[cl.formElem].join(' ')}>
                              <label htmlFor="mileage">{t('mileage')}</label>
                              <input
                                 title={t('mileage')}
                                 type="text"
                                 id="mileage"
                                 onChange={(e) =>
                                    handleNumberInputChange(
                                       e.target.value,
                                       mileage,
                                       0,
                                       1000000000,
                                       setMileage,
                                    )
                                 }
                                 value={mileage}
                              />
                           </div>
                           <div className={[cl.formElem].join(' ')}>
                              <label htmlFor="car_from">{t('car_from')}</label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder={t('car_from')}
                                 id="car_from"
                                 isMulti={false}
                                 options={countries}
                                 value={{
                                    label: selectedCountryValue,
                                    value: selectedCountryValue,
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue) {
                                       setSelectedCountryValue(newValue.value);
                                    }
                                 }}
                              />
                           </div>
                           <div className={[cl.formElem].join(' ')}>
                              <label htmlFor="owner">{t('owner')}</label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder={t('owner')}
                                 id="owner"
                                 isMulti={false}
                                 options={owners.map((owner) => ({
                                    label: t(owner.label),
                                    value: t(owner.value),
                                 }))}
                                 value={{
                                    label: selectedOwnerValue
                                       ? t(selectedOwnerValue)
                                       : selectedOwnerValue,
                                    value: selectedOwnerValue
                                       ? t(selectedOwnerValue)
                                       : selectedOwnerValue,
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue) {
                                       setSelectedOwnerValue(newValue.label);
                                    }
                                 }}
                              />
                           </div>
                           <div className={cl.stageControl}>
                              <button
                                 className={cl.stageBtn}
                                 onClick={() => setStage((prev) => --prev)}
                              >
                                 {t('prev')}
                              </button>
                              <button
                                 className={cl.stageBtn}
                                 disabled={
                                    !(
                                       mileage !== undefined &&
                                       selectedYear &&
                                       selectedCountryValue &&
                                       selectedOwnerValue
                                    )
                                 }
                                 onClick={() => setStage((prev) => ++prev)}
                              >
                                 {t('next')}
                              </button>
                           </div>
                        </div>
                     )}
                     {stage === 3 && (
                        <div className={cl.block}>
                           <div className={cl.sliderContainer}>
                              <h4 className={cl.sliderContainer__title}>
                                 Type of car body
                              </h4>
                              <Slider {...bodySliderSettings}>
                                 {bodies.map((body) => (
                                    <div
                                       className={[
                                          cl.bodyCard,
                                          selectedBodyValue === body.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                    >
                                       <img
                                          src={body.img}
                                          alt={body.value}
                                          className={
                                             selectedBodyValue === body.value
                                                ? cl.active
                                                : ''
                                          }
                                          onClick={() =>
                                             console.log(
                                                selectedBodyValue,
                                                body.value,
                                             )
                                          }
                                       />
                                       <p>{body.value}</p>
                                    </div>
                                 ))}
                              </Slider>
                           </div>
                           <div className={cl.sliderContainer}>
                              <h4 className={cl.sliderContainer__title}>
                                 Type of car gear
                              </h4>
                              <Slider {...gearSliderSettings}>
                                 {gears.map((gear) => (
                                    <div
                                       className={[
                                          cl.bodyCard,
                                          selectedGearValue === gear.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                    >
                                       <img src={gear.img} alt={gear.value} />
                                       <p>{gear.value}</p>
                                    </div>
                                 ))}
                              </Slider>
                           </div>
                           <div className={cl.sliderContainer}>
                              <h4 className={cl.sliderContainer__title}>
                                 Type of car fuel
                              </h4>
                              <Slider {...fuelSliderSettings}>
                                 {fuels.map((fuel) => (
                                    <div
                                       className={[
                                          cl.bodyCard,
                                          selectedFuelValue === fuel.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                    >
                                       <img src={fuel.img} alt={fuel.value} />
                                       <p>{fuel.value}</p>
                                    </div>
                                 ))}
                              </Slider>
                           </div>
                           <div className={cl.sliderContainer}>
                              <h4 className={cl.sliderContainer__title}>
                                 Type of car drive unit
                              </h4>
                              <Slider {...driveUnitSliderSettings}>
                                 {driveUnits.map((driveUnit) => (
                                    <div
                                       className={[
                                          cl.bodyCard,
                                          selectedDriveUnitValue ===
                                          driveUnit.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                    >
                                       <img
                                          src={driveUnit.img}
                                          alt={driveUnit.value}
                                       />
                                       <p>{driveUnit.value}</p>
                                    </div>
                                 ))}
                              </Slider>
                           </div>

                           <div className={cl.stageControl}>
                              <button
                                 className={cl.stageBtn}
                                 onClick={() => setStage((prev) => --prev)}
                              >
                                 {t('prev')}
                              </button>
                              <button
                                 className={cl.stageBtn}
                                 disabled={
                                    !selectedBodyValue ||
                                    !selectedFuelValue ||
                                    !selectedGearValue ||
                                    !selectedDriveUnitValue
                                 }
                                 onClick={() => setStage((prev) => ++prev)}
                              >
                                 {t('next')}
                              </button>
                           </div>
                        </div>
                     )}
                     {stage === 4 && (
                        <div className={cl.block}>
                           <div className={cl.formElem}>
                              <label htmlFor="photo">{t('photo')}</label>
                              <ImageUpload
                                 maxImageSize={1}
                                 onImageUpload={handleImageUpload}
                                 maxImages={15}
                              />
                           </div>
                           <div className={cl.formElem}>
                              <label htmlFor="desc">{t('desc')}</label>
                              <textarea
                                 id="desc"
                                 onChange={(e) =>
                                    handleDescChange(e.target.value)
                                 }
                                 value={desc}
                              />
                           </div>

                           <div className={cl.formElem}>
                              <label htmlFor="color">{t('color')}</label>
                              <ul className={cl.colors}>
                                 {colors.map((color) => (
                                    <li
                                       className={
                                          selectedColorValue === color.value
                                             ? cl.active
                                             : ''
                                       }
                                       onClick={() =>
                                          setSelectedColorValue(color.value)
                                       }
                                    >
                                       <span
                                          style={{ background: color.value }}
                                       ></span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div className={cl.block}>
                              <div className={cl.sliderContainer}>
                                 <h4 className={cl.sliderContainer__title}>
                                    Type of coating
                                 </h4>
                                 <Slider {...coloringUnitSliderSettings}>
                                    {colorings.map((coloring) => (
                                       <div
                                          className={[
                                             cl.bodyCard,
                                             selectedColoringValue ===
                                             coloring.value
                                                ? cl.active
                                                : '',
                                          ].join(' ')}
                                       >
                                          <img
                                             src={coloring.img}
                                             alt={coloring.value}
                                             className={
                                                selectedColoringValue ===
                                                coloring.value
                                                   ? cl.active
                                                   : ''
                                             }
                                             onClick={() =>
                                                console.log(
                                                   selectedColoringValue,
                                                   coloring.value,
                                                )
                                             }
                                          />
                                          <p>{coloring.value}</p>
                                       </div>
                                    ))}
                                 </Slider>
                              </div>
                              <div className={[cl.formElem].join(' ')}>
                                 <label htmlFor="price">{t('price')} $</label>
                                 <input
                                    title={t('price')}
                                    type="text"
                                    id="price"
                                    onChange={(e) =>
                                       handleNumberInputChange(
                                          e.target.value,
                                          price,
                                          0,
                                          1000000000,
                                          setPrice,
                                       )
                                    }
                                    value={price}
                                 />
                                 <div>
                                    <input
                                       title={t('exchange')}
                                       id="exchange"
                                       type="checkbox"
                                       checked={isExchange}
                                       onChange={() =>
                                          setIsExchange(!isExchange)
                                       }
                                    />
                                    <label htmlFor="exchange">
                                       An exchange is possible
                                    </label>
                                 </div>
                                 <div>
                                    <input
                                       title={t('trade')}
                                       id="trade"
                                       type="checkbox"
                                       checked={isTrade}
                                       onChange={() => setIsTrade(!isTrade)}
                                    />
                                    <label htmlFor="trade">
                                       Bargaining is appropriate
                                    </label>
                                 </div>
                              </div>
                              <div className={cl.stageControl}>
                                 <button
                                    className={cl.stageBtn}
                                    onClick={() => setStage((prev) => --prev)}
                                 >
                                    {t('prev')}
                                 </button>
                                 <button
                                    className={cl.stageBtn}
                                    disabled={
                                       !(
                                          selectedColorValue &&
                                          selectedColoringValue &&
                                          price
                                       )
                                    }
                                    onClick={onSubmit}
                                 >
                                    {t('submit')}
                                 </button>
                              </div>
                           </div>
                        </div>
                     )}
                  </ConfigProvider>

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
