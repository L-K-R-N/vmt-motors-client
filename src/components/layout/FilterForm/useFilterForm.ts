import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { brandsData } from '../../../data/brands.json';
import { setProducts, setProductsCount } from '@/store/reducers/ProductsSlice';
import { ISelectItem } from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { IModel, IGeneration } from '@/hooks/useFetchFilters';
import { setBrands } from '@/store/reducers/FilterSlice';
import { useTranslation } from 'react-i18next';
import { setCountry } from '@/store/reducers/SettingsSlice';

export const useFilterForm = () => {
   const [checkboxOptions] = useState([
      {
         label: 'no_matter',
         value: undefined,
      },
      {
         label: 'yes',
         value: true,
      },
      {
         label: 'no',
         value: false,
      },
   ]);
   const { t } = useTranslation();
   const dispatch = useAppDispatch();
   const { types } = useAppSelector((state) => state.FilterReducer);
   // const [newProducts, setNewProducts] = useState<IProduct[]>(products);

   const [models, setModels] = useState<IModel[]>([]);
   // const [brands, setBrands] = useState<ISelectItem<string>[]>([]);
   const [generations, setGenerations] = useState<IGeneration[]>([]);
   const [stage, setStage] = useState(1);
   const [desc, setDesc] = useState('');
   const [priceFrom, setPriceFrom] = useState<string | undefined>(undefined);
   const [priceTo, setPriceTo] = useState<string | undefined>(undefined);
   const [mileageFrom, setMileageFrom] = useState<string | undefined>(
      undefined,
   );

   const [mileageTo, setMileageTo] = useState<string | undefined>(undefined);
   const [isExchange, setIsExchange] = useState<boolean | undefined>(undefined);
   const [isTrade, setIsTrade] = useState<boolean | undefined>(undefined);
   const [selectedCountry, setSelectedCountry] =
      useState<ISelectItem<string> | null>(null);
   const [selectedDriveUnit, setSelectedDriveUnit] =
      useState<ISelectItem<string> | null>(null);
   const [selectedGear, setSelectedGear] = useState<ISelectItem<string> | null>(
      null,
   );
   const [selectedOwner, setSelectedOwner] =
      useState<ISelectItem<string> | null>(null);
   const [selectedFuel, setSelectedFuel] = useState<ISelectItem<string> | null>(
      null,
   );
   const [selectedBody, setSelectedBody] = useState<ISelectItem<string> | null>(
      null,
   );
   const [selectedYear, setSelectedYear] = useState<{
      from?: number;
      to?: number;
   } | null>(null);
   // const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
   const [selectedOwnerValue, setSelectedOwnerValue] = useState<string | null>(
      null,
   );
   const [selectedType, setSelectedType] = useState<ISelectItem<string> | null>(
      null,
   );
   const [isNew, setIsNew] = useState<ISelectItem<boolean | null> | null>(null);
   const [isNewOptions, setIsNewOptions] = useState([
      {
         label: 'all',
         value: null,
      },
      {
         label: 'used_cars',
         value: false,
      },
      {
         label: 'new',
         value: true,
      },
   ]);
   // const [isNewOptions, setIsNewOptions] = useState<IS | null>(null);
   const [selectedColors, setSelectedColors] = useState<string[]>([]);
   const [selectedColoring, setSelectedColoring] =
      useState<ISelectItem<string> | null>(null);
   // const [mileage, setMileage] = useState<
   //    { from: string; to: string } | undefined
   // >(undefined);
   const [selectedBrand, setSelectedBrand] =
      useState<ISelectItem<string> | null>(null);
   const [selectedGeneration, setSelectedGeneration] =
      useState<IGeneration | null>(null);
   const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
   const navigate = useNavigate();
   const [images, setImages] = useState<File[]>([]);
   const handleImageUpload = (newImages: File[]) => {
      setImages([...images, ...newImages]);
      console.log(images);
   };
   const { brands } = useAppSelector((state) => state.FilterReducer);
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
   // const handleSetLogos = async () => {
   //    const newLogos = await brandsData?.map((b) => {
   //       return import(`../../../data/logos/${b.id}.png`).then(
   //          (res: { default: string }) => {
   //             setLogos((prev) => [...prev, res.default]);
   //             // console.log(res.default);
   //          },
   //       );
   //    });

   //    console.log(newLogos);
   // };
   // useEffect(() => {
   //    handleSetLogos();
   // }, []);

   const handleBrandChange = (brand: ISelectItem<string> | null) => {
      setSelectedBrand(brand);
      console.log(brand);
      setSelectedModel(null);
      setModels([]);
      setSelectedGeneration(null);
      setGenerations([]);
      setSelectedYear(null);
      console.log(brand);

      // Загрузка моделей для выбранной марки
      if (brand) {
         import(`../../../data/models/${brand.value}.json`).then(
            (data: { default: IModel[] }) => {
               console.log(data.default);
               setModels(data.default);
            },

            // data.default?.map((model) => ({
            //    value: model.id,
            //    label: model.name,
            // })),
         );
      }
   };

   const handleModelChange = (model: IModel | null) => {
      setSelectedModel(model);
      console.log(model);
      setSelectedGeneration(null);
      setGenerations([]);
      setSelectedYear(null);

      if (model) {
         setGenerations(model.generations);
      }
   };
   const handleDescChange = (newDesc: string) => {
      setDesc(newDesc);
   };
   const handleGenerationChange = (gen: IGeneration | null) => {
      setSelectedYear(null);
      setSelectedGeneration(gen);
   };
   const handleYearChange = (year?: { from?: number; to?: number }) => {
      if (year) {
         if (year.from && year.to) {
            if (year.from > year.to) {
               setSelectedYear({
                  from: year.from,
                  to: undefined,
               });
            } else {
               setSelectedYear(year);
            }
         } else {
            setSelectedYear(year);
         }
      }
   };
   const handleSearch = (
      type: ISelectItem<string> | null,
      isNew: ISelectItem<boolean | null> | null,
   ) => {
      try {
         ProductService.getFiltredProducts({
            type: type?.value,
            isNew: isNew?.value,
         }).then((res) => {
            dispatch(setProducts(res?.data?.result));
            dispatch(setProductsCount(res?.data?.total));
         });
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      const newBrands = brandsData?.map((brand) => ({
         value: brand.id,
         label: brand.name,
      }));
      dispatch(setBrands(newBrands));
   }, []);

   useEffect(() => {
      handleSearchProducts();
   }, [selectedType, isNew]);
   const handleNumberInputChange = (
      newValue: string,
      prevValue: string | undefined,
      minValue: number,
      maxValue: number,
      handleChange: (v: string | undefined) => void,
   ) => {
      try {
         if (newValue.length === 0) {
            handleChange(undefined);
            return;
         }

         console.log(newValue.replace(/ /g, ''));
         const newNumberValue = Number(newValue.replace(/ /g, ''));
         console.log(newNumberValue);

         if (isNaN(newNumberValue)) {
            handleChange('0');
            return;
         }
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
   // const { search, filteredBrands, handleSearch } = useSearchBrand(brands);

   // useEffect(() => {
   //    setIsNew(
   //       activeVariant === 'new'
   //          ? true
   //          : activeVariant === 'used_cars'
   //            ? false
   //            : null,
   //    );
   // }, [activeVariant]);

   const handleSearchProducts = async () => {
      try {
         const response = await ProductService.getFiltredProducts({
            page: null,
            size: null,
            // sortBy: data?.sortBy.value || null,
            reverse: null,
            // name: data?.name || null,
            sortBy: null,
            type: selectedType?.value,
            isNew: isNew?.value,
            color: selectedColors[0] || null,
            owner: selectedOwner?.value,
            brand: selectedBrand?.value,
            body: selectedBody?.value,
            coloring: selectedColoring?.value,
            model: selectedModel?.id,
            priceFrom: Number(priceFrom?.replace(/ /g, '')) || null,
            priceTo: Number(priceTo?.replace(/ /g, '')) || null,
            yearFrom: selectedYear?.from,
            yearTo: selectedYear?.to,
            millageFrom: Number(mileageFrom?.replace(/ /g, '')) || null,
            millageTo: Number(mileageTo?.replace(/ /g, '')) || null,
            from: selectedCountry?.value,
            exchange: isExchange,
            trade: isTrade,
            generation: selectedGeneration
               ? createGenerationString(selectedGeneration).toString()
               : null,
            gear: selectedGear?.value,
            fuel: selectedFuel?.value,
            driveUnit: selectedDriveUnit?.value,
         });

         dispatch(setProducts(response?.data?.result));
         dispatch(setProductsCount(response?.data?.total));
      } catch (e) {
         console.log(e);
      }
   };

   const handleReset = () => {
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedGeneration(null);
      setSelectedYear(null);
      setPriceFrom('');
      setPriceTo('');
      setMileageFrom('');
      setMileageTo('');
      setSelectedBody(null);
      setSelectedGear(null);
      setSelectedFuel(null);
      setSelectedDriveUnit(null);
      setSelectedCountry(null);
      setSelectedOwner(null);
      setSelectedColors([]);
      setSelectedColoring(null);
      setIsTrade(undefined);
      setIsExchange(undefined);
      setIsNew(null);
      setSelectedType(null);

      handleSearchProducts();
   };

   const onSubmit = () => {
      handleSearchProducts();
   };
   return {
      onSubmit,

      handleReset,
      isNew,
      handleModelChange,
      handleGenerationChange,
      handleGenerateYears,
      handleBrandChange,
      handleNumberInputChange,
      handleYearChange,
      createGenerationString,
      brands,
      selectedBrand,
      selectedGeneration,
      selectedModel,
      models,
      generations,
      priceFrom,
      priceTo,
      setPriceFrom,
      setPriceTo,
      selectedYear,
      isNewOptions,
      mileageFrom,
      mileageTo,
      setMileageFrom,
      setMileageTo,
      selectedBody,
      setSelectedBody,
      selectedGear,
      setSelectedGear,
      selectedFuel,
      setSelectedFuel,
      selectedDriveUnit,
      selectedCountry,
      setSelectedCountry,
      setSelectedDriveUnit,
      selectedOwner,
      setSelectedOwner,
      selectedColors,
      selectedColoring,
      setSelectedColoring,
      setSelectedColors,
      isTrade,
      setIsTrade,
      isExchange,
      setIsExchange,
      checkboxOptions,
      handleSearch,
      setIsNew,
      setSelectedType,
      types,
      selectedType,
   };
};
