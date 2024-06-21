import { ISelectItem, TBrand, TProductType, TOwner, TBody, TFuel, TGear, TDriveUnit, TColor, TColoring } from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';
import { Data } from '@dnd-kit/core';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


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
   coloring: ISelectItem<TColoring>;
   desc: string;
   price: number;
}

export const useAddAdvert = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset
   } = useForm<IPostProductInputs>({
      mode: 'onChange',
   });
   const navigate = useNavigate();

   

   const onSubmit: SubmitHandler<IPostProductInputs> = (data) => {
      console.log({
         body: 'cabriolet',
         brand: data.brand.value,
         color: data.color.value,
         coloring: data.coloring.value,
         description: data.desc,
         driveUnit: data.driveUnit.value,
         exchange: data.exchange,
         from: data.from,
         fuel: data.fuel.value,
         gear: data.gear.value,
         generation: data.generation,
         isNew: false,
         millage: Number(data.millage),
         model: data.model,
         name: data.name,
         owner: data.owner.value,
         price: Number(data.price),
         trade: data.trade,
         type: data.type.value,
         year: Number(data.year),
         createdAt: Date.now()
      })
      try {
         // console.log(data);
         const productPostRes = ProductService.postProduct({
            body: 'cabriolet',
            brand: data.brand?.value,
            color: data.color?.value,
            coloring: data.coloring?.value,
            description: data.desc,
            driveUnit: data.driveUnit?.value,
            exchange: data.exchange,
            from: data.from,
            fuel: data.fuel?.value,
            gear: data.gear?.value,
            generation: data.generation,
            isNew: false,
            millage: Number(data.millage),
            model: data.model,
            name: data.name,
            owner: data.owner?.value,
            price: Number(data.price),
            trade: data.trade,
            type: data.type?.value,
            year: Number(data.year),
            createdAt: new Date()

         })

         
         toast.promise(productPostRes, {
            pending: 'Проверяем корректность данных...',
            success: 'Объявление отправлено на проверку!',
            error: 'Произошла непредвиденная ошибка'
         }).then(() => {
            reset()
         })
      } catch (e) {
         console.log({
            body: 'cabriolet',
            brand: data.brand.value,
            color: data.color.value,
            coloring: data.coloring.value,
            description: data.desc,
            driveUnit: data.driveUnit.value,
            exchange: data.exchange,
            from: data.from,
            fuel: data.fuel.value,
            gear: data.gear.value,
            generation: data.generation,
            isNew: false,
            millage: Number(data.millage),
            model: data.model,
            name: data.name,
            owner: data.owner.value,
            price: Number(data.price),
            trade: data.trade,
            type: data.type.value,
            year: Number(data.year),
         })

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
