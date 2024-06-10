import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import ProductService, {
   TDriveUnit,
   TFuel,
   TGear,
   TProductType,
} from '@/api/services/ProductService';

export interface IAddInputs {
   name: string;
   brand: string;
   model: string;
   year: number;
   type: TProductType;
   mileage: number;
   body: IBody;
   photo: string;
   generation: string;
   fuel: TFuel;
   gear: TGear;
   drive: TDriveUnit;
   color: string;
   coloring: string;
   desc: string;
   phoneNumber: string;
   adress: string;
   email: string;
   price: number;
}
export interface IBody {
   name: string;
   img: string;
}

type TBody =
   | 'coupe'
   | 'universal'
   | 'hatchaback'
   | 'roadster'
   | 'liftback'
   | 'crossover';

export const useAddAdvert = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IAddInputs>({
      mode: 'onChange',
   });
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onSubmit: SubmitHandler<IAddInputs> = (data) => {
      try {
         ProductService.postProduct(
            data.type,
            data.name,
            data.desc,
            true,
            data.brand,
            data.body.name,
            data.color,
            data.model,
            data.price,
            data.year,
            data.generation,
            data.gear,
            data.fuel,
            data.drive,
         );
         navigate('/main');
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
