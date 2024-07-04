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
import { useAppSelector } from '@/hooks/useAppSelector';
import { Data } from '@dnd-kit/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

// export interface IPostProductInputs {
//    name: string;
//    brand: ISelectItem<TBrand>;
//    model: string;
//    year: number;
//    type: ISelectItem<TProductType>;
//    millage: number;
//    from: string;
//    exchange: boolean;
//    trade: boolean;
//    owner: ISelectItem<TOwner>;
//    body: TBody;
//    photo: string;
//    generation: string;
//    fuel: ISelectItem<TFuel>;
//    gear: ISelectItem<TGear>;
//    driveUnit: ISelectItem<TDriveUnit>;
//    color: ISelectItem<TColor>;
//    coloring: ISelectItem<TColoring>;
//    desc: string;
//    price: number;
// }

export const addProductFormShema = z.object({
   type: z.object({
      value: z.union([
         z.literal('AUTOMOBILE'),
         z.literal('DETAILS'),
         z.literal('CONSUMABLES'),
         z.literal('MOTORCYCLE'),
         z.literal('SPECIAL_EQUIPMENTS'),
      ]),
      label: z.string(),
   }),
   from: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(2, 'Слишком мало символов')
      .max(40, 'Слишком много символов'),
   exchange: z.boolean(),
   trade: z.boolean(),
   owner: z.object({
      value: z.union([
         z.literal('OWNER'),
         z.literal('PRIVATE_OWNER'),
         z.literal('COMPANY'),
         z.literal('OTHER'),
      ]),
      label: z.string(),
   }),
   description: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(4, 'Слишком мало символов')
      .max(400, 'Слишком много символов'),
   brand: z
      .object({
         value: z.string(),
         label: z.string(),
      })
      .optional(),
   body: z.object({
      value: z.union([
         z.literal('coupe'),
         z.literal('universal'),
         z.literal('hatchback'),
         z.literal('roadster'),
         z.literal('liftback'),
         z.literal('crossover'),
         z.literal('sedan'),
         z.literal('offroad'),
         z.literal('compact'),
         z.literal('cabriolet'),
      ]),
      label: z.string(),
   }),
   color: z.object({
      value: z.string(),
      label: z.string(),
   }),
   coloring: z.object({
      value: z.string(),
      label: z.string(),
   }),
   model: z.object({
      value: z.string(),
      label: z.string(),
   }),
   price: z.string().min(1, 'Минимум 1').max(8, 'Максимум 99999999'),
   year: z.string().min(4, 'Минимум 1990').max(4, 'Максимум 2024'),
   millage: z.string().max(7, 'Максимум 9999999'),
   generation: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(2, 'Слишком мало символов')
      .max(40, 'Слишком много символов'),
   gear: z.object({
      value: z.union([
         z.literal('MANUAL'),
         z.literal('AUTOMATIC'),
         z.literal('ROBOTIC'),
         z.literal('CTV'),
         z.literal('OTHER'),
      ]),
      label: z.string(),
   }),
   fuel: z.object({
      value: z.union([
         z.literal('GASOLINE'),
         z.literal('DIESEL'),
         z.literal('BIODIESEL'),
         z.literal('PROPANE'),
         z.literal('METHANE'),
         z.literal('ELECTRIC'),
         z.literal('OTHER'),
      ]),
      label: z.string(),
   }),
   driveUnit: z.object({
      value: z.union([
         z.literal('FWD'),
         z.literal('RWD'),
         z.literal('ALL'),
         z.literal('CONTROLLED_ALL'),
         z.literal('OTHER'),
      ]),
      label: z.string(),
   }),
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
   const { selectedBrand } = useAppSelector((state) => state.FilterReducer);
   const navigate = useNavigate();
   const [images, setImages] = useState<File[]>([]);
   const handleImageUpload = (newImages: File[]) => {
      setImages([...images, ...newImages]);
      console.log(images);
   };
   const onSubmit = () => {
      try {
         // console.log(data);
         // if (selectedBrand) {
         //    const productPostRes = ProductService.postProduct({
         //       body: data?.body?.value,
         //       brand: selectedBrand.value,
         //       color: data?.color?.value,
         //       coloring: data?.coloring?.value,
         //       description: data?.description,
         //       driveUnit: data?.driveUnit?.value,
         //       exchange: data?.exchange,
         //       from: data?.from,
         //       fuel: data?.fuel?.value,
         //       gear: data?.gear?.value,
         //       generation: data?.generation,
         //       isNew: false,
         //       millage: Number(data?.millage),
         //       model: data?.model.value,
         //       // name: data?.name,
         //       owner: data?.owner?.value,
         //       price: Number(data?.price),
         //       trade: data?.trade,
         //       type: data?.type?.value,
         //       year: Number(data?.year),
         //       createdAt: new Date(),
         //    }).then((res) => {
         //       const formData = new FormData();
         //       images.map((image) => {
         //          formData.append('images', image);
         //       });
         //       ProductService.uploadPhotos(formData, res.data.id);
         //       setImages([]);
         //       // reset();
         //    });
         // toast
         //    .promise(productPostRes, {
         //       pending: 'Проверяем корректность данных...',
         //       success: 'Объявление отправлено на проверку!',
         //       error: 'Произошла непредвиденная ошибка',
         //    })
         // }
      } catch (e) {}
   };

   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,
         handleImageUpload,
      }),
      [errors],
   );
};
