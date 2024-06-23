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
            page: data.page || null,
            size: data.size || null,
            // sortBy: data.sortBy.value || null,
            reverse: data.reverse || null,
            name: data.name || null,
            sortBy: data.sortBy?.value || null,
            type: data.type?.value || null,
            isNew: data.isNew || null,
            color: data.color?.value || null,
            owner: data.owner?.value || null,
            brand: data.brand?.value || null,
            body: data.body?.value || null,
            coloring: data.coloring?.value || null,
            model: data.model || null,
            priceFrom: Number(data.priceFrom) || null,
            priceTo: Number(data.priceTo) || null,
            yearFrom: Number(data.yearFrom) || null,
            yearTo: Number(data.yearTo) || null,
            millageFrom: Number(data.millageFrom) || null,
            millageTo: Number(data.millageTo) || null,
            from: data.from || null,
            exchange: data.exchange || null,
            trade: data.trade || null,
            generation: data.generation || null,
            gear: data.gear?.value || null,
            fuel: data.fuel?.value || null,
            driveUnit: data.driveUnit?.value || null,
         });

         dispatch(setProducts(response.data.result));
         dispatch(setProductsCount(response.data.total));
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
