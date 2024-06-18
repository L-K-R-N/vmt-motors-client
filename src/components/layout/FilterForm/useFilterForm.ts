import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { setProducts } from '@/store/reducers/ProductsSlice';
import { TGear, TFuel, TDriveUnit, IProduct, TProductType, TSorting, TColoring, TBody, TBrand, TColor, TOwner, ISelectItem } from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';

interface IFilterInputs {
   page: number;
   size: number;
   sortBy: ISelectItem<TSorting>;
   reverse: boolean;
   name: string;
   type: ISelectItem<TProductType>;
   isNew: boolean;
   brand: ISelectItem<TBrand>;
   body: ISelectItem<TBody>;
   color: ISelectItem<TColor>;
   coloring: ISelectItem<TColoring>;
   model: string;
   owner: ISelectItem<TOwner>;

   priceFrom: number;
   priceTo: number;

   yearFrom: number;
   yearTo: number;

   millageFrom: number;
   millageTo: number;

   from: string;
   exchange: boolean;
   trade: boolean;

   generation: string;
   gear: ISelectItem<TGear>;
   fuel: ISelectItem<TFuel>;
   driveUnit: ISelectItem<TDriveUnit>;
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
   // const [newProducts, setNewProducts] = useState<IProduct[]>(products);

   const handleSearchProducts = async (data: IFilterInputs) => {
      try {
         const response = await ProductService.getFiltredProducts({
            page: data.page,
               size: data.size,
               sortBy: data.sortBy.value,
               reverse: data.reverse,
               name: data.name,
               type: data.type.value,
               isNew: data.isNew,
               color: data.color.value,
               owner: data.owner.value,
               brand: data.brand.value,
               body: data.body.value,
               coloring: data.coloring.value,
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
               gear: data.gear.value,
               fuel: data.fuel.value,
               driveUnit: data.driveUnit.value
         })
   
         dispatch(setProducts(response.data))
      } catch (e) {
         console.log(e)
      }
   }

   const onSubmit: SubmitHandler<IFilterInputs> = async (data) => {
      handleSearchProducts(data)
   };
   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,
         reset,
      }),
      [errors],
   );
};
