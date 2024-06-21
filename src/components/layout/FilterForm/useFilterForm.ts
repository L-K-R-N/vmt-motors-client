import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { setProducts, setProductsCount } from '@/store/reducers/ProductsSlice';
import {
   TGear,
   TFuel,
   TDriveUnit,
   IProduct,
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

interface IFilterInputs {
   page: number | undefined;
   size: number | undefined;
   sortBy: ISelectItem<TSorting> | undefined;
   reverse: boolean | undefined;
   name: string | undefined;
   type: ISelectItem<TProductType> | undefined;
   isNew: boolean | undefined;
   brand: ISelectItem<TBrand> | undefined;
   body: ISelectItem<TBody> | undefined;
   color: ISelectItem<TColor> | undefined;
   coloring: ISelectItem<TColoring> | undefined;
   model: string | undefined;
   owner: ISelectItem<TOwner> | undefined;
   sort: ISelectItem<TSorting> | undefined;
   priceFrom: number | undefined;
   priceTo: number | undefined;

   yearFrom: number | undefined;
   yearTo: number | undefined;

   millageFrom: number | undefined;
   millageTo: number | undefined;

   from: string | undefined;
   exchange: boolean | undefined;
   trade: boolean | undefined;
   generation: string | undefined;
   gear: ISelectItem<TGear> | undefined;
   fuel: ISelectItem<TFuel> | undefined;
   driveUnit: ISelectItem<TDriveUnit> | undefined;
}

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
   // const [newProducts, setNewProducts] = useState<IProduct[]>(products);

   const handleSearchProducts = async (data: IFilterInputs) => {
      try {
         const response = await ProductService.getFiltredProducts({
            page: data.page,
            size: data.size,
            // sortBy: data.sortBy.value,
            reverse: data.reverse,
            name: data.name,
            sortBy: data.sortBy?.value,
            type: data.type?.value,
            isNew: data.isNew,
            color: data.color?.value,
            owner: data.owner?.value,
            brand: data.brand?.value,
            body: data.body?.value,
            coloring: data.coloring?.value,
            model: data.model,
            priceFrom: data.priceFrom,
            priceTo: data.priceTo,
            yearFrom: data.yearFrom,
            yearTo: data.yearTo,
            millageFrom: data.millageFrom,
            millageTo: data.millageTo,
            from: data.from,
            exchange: data.exchange,
            trade: data.trade,
            generation: data.generation,
            gear: data.gear?.value,
            fuel: data.fuel?.value,
            driveUnit: data.driveUnit?.value,
         });

         dispatch(setProducts(response.data.result));
         dispatch(setProductsCount(response.data.total));
      } catch (e) {
         console.log(e);
      }
   };

   const handleReset = () => {
      reset();
      setValue('body', undefined);
   };

   const onSubmit: SubmitHandler<IFilterInputs> = async (data) => {
      handleSearchProducts(data);
   };
   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,
         reset,
         handleReset,
      }),
      [errors],
   );
};
