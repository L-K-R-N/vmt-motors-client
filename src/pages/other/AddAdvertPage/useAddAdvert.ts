import {
   ISelectItem,
   TBrand,
   TProductType,
   TOwner,
   TBody,
   TFuel,
   TGear,
   TDriveUnit,
   TColor,
   TColoring,
} from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';
import { Data } from '@dnd-kit/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

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

export const addProductFormShema = z.object({
   name: z
      .string()
      .trim()
      .min(4, 'Слишком короткое имя')
      .max(64, 'Слишком длинное имя'),
   // status: z.string().optional(),
   // gender: z
   //    .object({
   //       value: z.union([z.literal('MALE'), z.literal('FEMALE')]).optional(),
   //       label: z.string().optional(),
   //    })
   //    .nullable(),
   // model: z
   //    .string()
   //    .trim()
   //    .min(4, 'Слишком короткая модель')
   //    .max(30, 'Слишком длинная модель'),

   // year: z
   //    .number({ required_error: 'Это обязательное поле' })
   //    .min(1990)
   //    .max(2024),
   // type: z.object({
   //    value: z
   //       .union([z.literal('MALE'), z.literal('FEMALE')])
   //       .optional(),
   //    label: z.string().optional(),
   // }),
   // millage: number,
   // from: string,
   // exchange: boolean,
   // trade: boolean,
   // owner: ISelectItem<TOwner>,
   // body: TBody,
   // photo: string,
   // generation: string,
   // fuel: ISelectItem<TFuel>,
   // gear: ISelectItem<TGear>,
   // driveUnit: ISelectItem<TDriveUnit>,
   // color: ISelectItem<TColor>,
   // coloring: ISelectItem<TColoring>,
   // desc: string,
   // price: number,
   // phoneNumber: z
   //    .string()
   //    .trim()
   //    .min(4, 'Телефон не должен быть короче 4 символов')
   //    .max(13, 'Телефон не должен быть длиннее 13 символов'),
});

export type IProductFormShema = z.infer<typeof addProductFormShema>;

export const useAddAdvert = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
   } = useForm<IProductFormShema>({
      resolver: zodResolver(addProductFormShema),
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
         createdAt: Date.now(),
      });
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
            createdAt: new Date(),
         });

         toast
            .promise(productPostRes, {
               pending: 'Проверяем корректность данных...',
               success: 'Объявление отправлено на проверку!',
               error: 'Произошла непредвиденная ошибка',
            })
            .then(() => {
               reset();
            });
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
         });
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
