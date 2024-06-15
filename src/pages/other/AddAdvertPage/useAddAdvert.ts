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
   millage: number;
   from: string;
   exchange: boolean;
   trade: boolean;
   owner: ISelectItem<TOwner>;
   body: TBody;
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
         console.log(data);
         ProductService.postProduct({
            body: 'cabriolet',
            brand: data.brand.value,
            color: data.color.value,
            coloring: 'aaaa',
            desc: data.desc,
            driveUnit: data.driveUnit.value,
            exchange: true,
            from: data.from,
            fuel: data.fuel.value,
            gear: data.gear.value,
            generation: data.generation,
            isNew: true,
            millage: Number(data.millage),
            model: data.model,
            name: data.name,
            owner: data.owner.value,
            price: Number(data.price),
            trade: true,
            type: data.type.value,
            year: Number(data.year),
         });
      } catch (e) {
         console.log({
            body: 'cabriolet',
            brand: data.brand.value,
            color: data.color.value,
            coloring: 'aaaa',
            desc: data.desc,
            driveUnit: data.driveUnit.value,
            exchange: true,
            from: data.from,
            fuel: data.fuel.value,
            gear: data.gear.value,
            generation: data.generation,
            isNew: true,
            millage: Number(data.millage),
            model: data.model,
            name: data.name,
            owner: data.owner.value,
            price: Number(data.price),
            trade: true,
            type: data.type.value,
            year: Number(data.year),
         });
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
