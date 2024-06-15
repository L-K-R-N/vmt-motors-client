import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { TBody, TBrand, TColor } from '@/store/reducers/FilterSlice';
import { IProduct, TOwner } from '@/store/reducers/ProductsSlice';

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

export interface IPostProduct {
   name: string;
   brand: TBrand;
   model: string;
   year: number;
   type: TProductType;
   millage: number;
   from: string;
   isNew: boolean;
   exchange: boolean;
   trade: boolean;
   owner: TOwner;
   body: TBody;
   generation: string;
   fuel: TFuel;
   gear: TGear;
   driveUnit: TDriveUnit;
   color: TColor;
   coloring: string;
   desc: string;
   price: number;
}

export default class ProductService {
   static async getMyProducts(): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>('product/commodity/my');
   }
   static async postProduct(data: IPostProduct): Promise<AxiosResponse> {
      return $api.post('product/commodity', {
         type: data.type,
         name: data.name,
         description: data.desc,
         isNew: data.isNew,
         brand: data.brand,
         body: data.body,
         from: data.from,
         exchange: data.exchange,
         trade: data.trade,
         millage: data.millage,
         owner: data.owner,
         color: data.color,
         coloring: data.coloring,
         model: data.model,
         price: data.price,
         year: data.year,
         generation: data.generation,
         gear: data.gear,
         fuel: data.fuel,
         driveUnit: data.driveUnit,
      });
   }
}
