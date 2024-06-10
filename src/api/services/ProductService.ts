import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { IProduct } from '@/models/Product.types';

export type TProductType =
   | 'AUTOMOBILE'
   | 'DETAILS'
   | 'CONSUMABLES'
   | 'MOTORCYCLE'
   | 'SPECIAL_EQUIPMENTS';
export type TDriveUnit = 'FWD' | 'RWD' | 'ALL' | 'CONTROLLED_ALL' | 'OTHER';

export type TFuel =
   | 'GASOLINE'
   | 'DIESEL'
   | 'BIODIESEL'
   | 'PROPANE'
   | 'METHANE'
   | 'ELECTRIC'
   | 'OTHER';

export type TGear = 'MANUAL' | 'AUTOMATIC' | 'ROBOTIC' | 'CTV' | 'OTHER';

export default class ProductService {
   static async getProducts(): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>('api/product/commodity/my');
   }
   static async postProduct(
      type: TProductType,
      name: string,
      description: string,
      isNew: true,
      brand: string,
      body: string,
      color: string,
      model: string,
      price: number,
      year: number,
      generation: string,
      gear: TGear,
      fuel: TFuel,
      driveUnit: TDriveUnit,
   ): Promise<AxiosResponse> {
      return $api.post('api/product/commodity', {
         type,
         name,
         description,
         isNew,
         brand,
         body,
         color,
         model,
         price,
         year,
         generation,
         gear,
         fuel,
         driveUnit,
      });
   }
}
