import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProductService, {
   TDriveUnit,
   TFuel,
   TGear,
   TProductType,
} from '@/api/services/ProductService';
import { ISelectItem, TBody } from '@/store/reducers/FilterSlice';

export interface IAddInputs {
   name: string;
   brand: string;
   model: string;
   year: number;
   type: ISelectItem<TProductType>;
   mileage: number;
   body: ISelectItem<TBody>;
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

export const useAddAdvert = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IAddInputs>({
      mode: 'onChange',
   });
   const navigate = useNavigate();

   const onSubmit: SubmitHandler<IAddInputs> = (data) => {
      try {
         ProductService.postProduct(
            data.type.value,
            data.name,
            data.desc,
            true,
            data.brand,
            data.body.value,
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
