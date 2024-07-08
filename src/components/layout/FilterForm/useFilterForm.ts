import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { brandsData } from '../../../data/brands.json';
import { setProducts, setProductsCount } from '@/store/reducers/ProductsSlice';
import {
   TGear,
   TFuel,
   TDriveUnit,
   TProductType,
   TSorting,
   TColoring,
   TBody,
   TBrand,
   TColor,
   TOwner,
   ISelectItem,
} from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { IModel, IGeneration } from '@/hooks/useFetchFilters';
import { setBrands } from '@/store/reducers/FilterSlice';

interface IFilterInputs {
   page: number;
   size: number;
   sortBy: ISelectItem<TSorting> | null;
   reverse: boolean | null;
   name: string;
   type: ISelectItem<TProductType> | null;
   isNew: boolean | null;
   brand: ISelectItem<TBrand> | null;
   body: ISelectItem<TBody> | null;
   color: ISelectItem<TColor> | null;
   coloring: ISelectItem<TColoring> | null;
   model: string;
   owner: ISelectItem<TOwner> | null;
   priceFrom: string;
   priceTo: string;

   yearFrom: string;
   yearTo: string;

   millageFrom: string;
   millageTo: string;

   from: string;
   exchange: boolean | null;
   trade: boolean | null;
   generation: string;
   gear: ISelectItem<TGear> | null;
   fuel: ISelectItem<TFuel> | null;
   driveUnit: ISelectItem<TDriveUnit> | null;
}

const variants = ['all', 'used_cars', 'new'];

export const useFilterForm = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
      setValue,
   } = useForm<IFilterInputs>({
      mode: 'onChange',
   });
   const dispatch = useAppDispatch();
   const { activeVariant } = useAppSelector((state) => state.FilterReducer);
   // const [newProducts, setNewProducts] = useState<IProduct[]>(products);
   const [isNew, setIsNew] = useState<boolean | null>(null);
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
   const [isExchange, setIsExchange] = useState<boolean>(false);
   const [isTrade, setIsTrade] = useState<boolean>(false);
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
   const [selectedOwnerValue, setSelectedOwnerValue] = useState<string | null>(
      null,
   );
   const [selectedColorValue, setSelectedColorValue] = useState<string | null>(
      null,
   );
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

   useEffect(() => {
      const newBrands = brandsData?.map((brand) => ({
         value: brand.id,
         label: brand.name,
      }));
      dispatch(setBrands(newBrands));
   }, []);

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

   useEffect(() => {
      setIsNew(
         activeVariant === 'new'
            ? true
            : activeVariant === 'used_cars'
              ? false
              : null,
      );
   }, [activeVariant]);

   const handleSearchProducts = async (data: IFilterInputs) => {
      try {
         const response = await ProductService.getFiltredProducts({
            page: data?.page || null,
            size: data?.size || null,
            // sortBy: data?.sortBy.value || null,
            reverse: data?.reverse || null,
            // name: data?.name || null,
            sortBy: data?.sortBy?.value || null,
            type: data?.type?.value || null,
            isNew: isNew,
            color: data?.color?.value || null,
            owner: data?.owner?.value || null,
            brand: data?.brand?.value || null,
            body: data?.body?.value || null,
            coloring: data?.coloring?.value || null,
            model: data?.model || null,
            priceFrom: Number(data?.priceFrom) || null,
            priceTo: Number(data?.priceTo) || null,
            yearFrom: Number(data?.yearFrom) || null,
            yearTo: Number(data?.yearTo) || null,
            millageFrom: Number(data?.millageFrom) || null,
            millageTo: Number(data?.millageTo) || null,
            from: data?.from || null,
            exchange: data?.exchange || null,
            trade: data?.trade || null,
            generation: data?.generation || null,
            gear: data?.gear?.value || null,
            fuel: data?.fuel?.value || null,
            driveUnit: data?.driveUnit?.value || null,
         });

         dispatch(setProducts(response?.data?.result));
         dispatch(setProductsCount(response?.data?.total));
      } catch (e) {
         console.log(e);
      }
   };

   const handleReset = () => {
      reset();
      setValue('body', null);
      setValue('brand', null);
      setValue('color', null);
      setValue('coloring', null);
      setValue('driveUnit', null);
      setValue('exchange', null);
      setValue('from', '');
      setValue('fuel', null);
      setValue('gear', null);
      setValue('generation', '');
      setValue('isNew', null);
      setValue('millageFrom', '');
      setValue('millageTo', '');
      setValue('model', '');
      setValue('name', '');
      setValue('owner', null);
      setValue('page', 0);
      setValue('priceFrom', '');
      setValue('priceTo', '');
      setValue('reverse', null);
      setValue('size', 25);
      setValue('sortBy', null);
      setValue('trade', null);
      setValue('type', null);
      setValue('yearFrom', '');
      setValue('yearTo', '');
   };

   const onSubmit: SubmitHandler<IFilterInputs> = async (data) => {
      handleSearchProducts(data);
   };
   return {
      errors,
      onSubmit,
      control,
      handleSubmit,
      reset,
      handleReset,
      isNew,
      variants,
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
      selectedColorValue,
      selectedColoring,
      setSelectedColoring,
      setSelectedColorValue,
   };
};
