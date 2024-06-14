import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProductService, {
   TDriveUnit,
   TFuel,
   TGear,
   TProductType,
} from '@/api/services/ProductService';
import {
   ISelectItem,
   TBody,
   TBrand,
   TColor,
} from '@/store/reducers/FilterSlice';
import { TOwner } from '@/store/reducers/ProductsSlice';

export interface IPostProductInputs {
   name: string;
   brand: ISelectItem<TBrand>;
   model: string;
   year: number;
   type: ISelectItem<TProductType>;
   mileage: number;
   from: string;
   exchange: boolean;
   trade: boolean;
   owner: ISelectItem<TOwner>;
   body: ISelectItem<TBody>;
   photo: string;
   generation: string;
   fuel: ISelectItem<TFuel>;
   gear: ISelectItem<TGear>;
   driveUnit: ISelectItem<TDriveUnit>;
   color: ISelectItem<TColor>;
   coloring: string;
   desc: string;
   price: number;
}

export const useAddAdvert = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IPostProductInputs>({
      mode: 'onChange',
   });
   const navigate = useNavigate();

   const onSubmit: SubmitHandler<IPostProductInputs> = (data) => {
      try {
         ProductService.postProduct({
            body: data.body.value,
            brand: data.brand.value,
            color: data.color.value,
            coloring: data.coloring,
            desc: data.desc,
            driveUnit: data.driveUnit.value,
            exchange: data.exchange,
            from: data.from,
            fuel: data.fuel.value,
            gear: data.gear.value,
            generation: data.generation,
            isNew: true,
            mileage: data.mileage,
            model: data.model,
            name: data.name,
            owner: data.owner.value,
            photo: data.photo,
            price: data.price,
            trade: data.trade,
            type: data.type.value,
            year: data.year,
         });
      } catch (e) {
         console.log(e);
      }
   };

   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,
      }),
      [errors],
   );
};
