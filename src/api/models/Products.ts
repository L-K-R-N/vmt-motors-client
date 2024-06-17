import { TBrand, TBody, TColor } from '@/store/reducers/FilterSlice';
import { TOwner } from '@/store/reducers/ProductsSlice';

export interface IProduct {
   id: string;
   personId: string;
   moderated: boolean;
   type: TProductType;
   isNew: boolean;
   from: string;
   exchange: boolean;
   trade: boolean;
   owner: TOwner;
   name: string;
   desc: string;
   brand: TBrand;
   body: TBody;
   color: TColor;
   coloring: string;
   model: string;
   price: number;
   year: number;
   millage: number;
   generation: string;
   gear: TGear;
   fuel: TFuel;
   driveUnit: TDriveUnit;
   createdAt: Date;
   photoId: number | null;
}

export type IPostProductRequest = Omit<
   IProduct,
   'id' | 'personId' | 'photoId' | 'createAt' | 'id' | 'moderated'
>;

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
