import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
   setBrands,
   setModels,
   setSelectedBrand,
} from '@/store/reducers/FilterSlice';

interface IFilterInputs {
   brand: string;
   model: string;
   priceFrom: number;
   priceTo: number;
   generation: string;
   yearFrom: number;
   yearTo: number;
   gear: string;
   fuel: string;
   driveUnit: string;
   color: string;
   coloring: string;
   withPhoto: boolean;
   notSold: boolean;
   mileage: number;
   carFrom: string;
   exchange: boolean;
   trade: boolean;
   any: boolean;
   owner: boolean;
   privateOwner: boolean;
   company: boolean;
}

export const useFilterForm = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
   } = useForm<IFilterInputs>({
      mode: 'onChange',
   });
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { brands, models, selectedBrand } = useAppSelector(
      (state) => state.FilterReducer,
   );
   const { products } = useAppSelector((state) => state.ProductsReducer);
   useEffect(() => {
      const newBrands = products.map((p) => p.brand);
      dispatch(setBrands(newBrands));
      console.log(newBrands);
   }, []);

   useEffect(() => {
      const newModels = products
         .filter((p) => p.brand.value === selectedBrand)
         .map((p) => p.model);

      dispatch(setModels(newModels));
      console.log(1);
   }, [selectedBrand]);

   const handleBrandChange = (option: string) => {
      dispatch(setSelectedBrand(option));
   };

   const onSubmit: SubmitHandler<IFilterInputs> = (data) => {};
   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,
         brands,
         models,
         handleBrandChange,
         reset,
      }),
      [errors, brands, models],
   );
};
