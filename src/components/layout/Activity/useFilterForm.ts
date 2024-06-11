import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IProduct, setFiltredProducts } from '@/store/reducers/ProductsSlice';

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

   const { brands, models } = useAppSelector((state) => state.FilterReducer);

   const { products } = useAppSelector((state) => state.ProductsReducer);

   const onSubmit: SubmitHandler<IFilterInputs> = (data) => {
      let newProducts: IProduct[] = [...products];
      console.log(newProducts);

      newProducts = useMemo(() => {
         return data.brand
            ? newProducts.filter((p) => p.brand.value === data.brand)
            : newProducts;
      }, [data]);
      dispatch(setFiltredProducts(newProducts));
   };
   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,

         reset,
      }),
      [errors, brands, models],
   );
};
