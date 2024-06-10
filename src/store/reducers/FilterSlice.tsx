import { TDriveUnit, TFuel, TGear } from '@/api/services/ProductService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOption } from './ProductsSlice';

export interface IFilterState {
   brands: IBrand[];
   models: IModel[];
   driveUnits: ISelectItem<TDriveUnit>[];
   fuels: ISelectItem<TFuel>[];
   gears: ISelectItem<TGear>[];
   colors: ISelectItem<TColor>[];
}

export interface ISelectItem<T> {
   value: T;
   label: string;
}

export interface IBrand {
   name: string;
   img: string;
   id: number;
}

export interface IModel {
   name: string;
   img: string;
   id: number;
   brandId: number;
}

export type TColor =
   | 'black'
   | 'white'
   | 'red'
   | 'green'
   | 'blue'
   | 'brown'
   | 'purple'
   | 'pink'
   | 'yellow'
   | 'orange'
   | 'gray';

const initialState: IFilterState = {
   brands: [
      {
         name: 'Acura',
         img: '',
         id: 1,
      },
      {
         name: 'AITO',
         img: '',
         id: 2,
      },
      {
         name: 'Alfa Romeo',
         img: '',
         id: 3,
      },
      {
         name: 'Alga',
         img: '',
         id: 4,
      },
      {
         name: 'Alpina',
         img: '',
         id: 5,
      },
      {
         name: 'Arcfox',
         img: '',
         id: 6,
      },
      {
         name: 'Aston Martin',
         img: '',
         id: 7,
      },
      {
         name: 'Audi',
         img: '',
         id: 8,
      },
      {
         name: 'Aurus',
         img: '',
         id: 9,
      },
      {
         name: 'Avatr',
         img: '',
         id: 10,
      },
      {
         name: 'BAIC',
         img: '',
         id: 11,
      },
      {
         name: 'Bajaj',
         img: '',
         id: 12,
      },
      {
         name: 'Baojun',
         img: '',
         id: 13,
      },
      {
         name: 'BAW',
         img: '',
         id: 14,
      },
      {
         name: 'BMW',
         img: '',
         id: 15,
      },
      {
         name: 'Bentley',
         img: '',
         id: 16,
      },
      {
         name: 'Blaval',
         img: '',
         id: 17,
      },
      {
         name: 'BMW',
         img: '',
         id: 18,
      },
      {
         name: 'Borgward',
         img: '',
         id: 19,
      },
      {
         name: 'Brilliance',
         img: '',
         id: 21,
      },
      {
         name: 'Bugatti',
         img: '',
         id: 22,
      },
      {
         name: 'Buick',
         img: '',
         id: 23,
      },
      {
         name: 'BYD',
         img: '',
         id: 24,
      },
      {
         name: 'Cadillac',
         img: '',
         id: 25,
      },
      {
         name: 'Changan',
         img: '',
         id: 26,
      },
      {
         name: 'ChangFeng',
         img: '',
         id: 27,
      },
      {
         name: 'Changhe',
         img: '',
         id: 28,
      },
      {
         name: 'Chery',
         img: '',
         id: 29,
      },
      {
         name: 'Chevrolet',
         img: '',
         id: 30,
      },
      {
         name: 'Chrysler',
         img: '',
         id: 31,
      },
      {
         name: 'Citroen',
         img: '',
         id: 32,
      },
      {
         name: 'Core Power',
         img: '',
         id: 33,
      },
      {
         name: 'Dacia',
         img: '',
         id: 34,
      },
      {
         name: 'Daewoo',
         img: '',
         id: 35,
      },
      {
         name: 'Daihatsu',
         img: '',
         id: 36,
      },
      {
         name: 'Datsun',
         img: '',
         id: 37,
      },
      {
         name: 'Dayun',
         img: '',
         id: 38,
      },
      {
         name: 'Denza',
         img: '',
         id: 39,
      },
      {
         name: 'Derways',
         img: '',
         id: 40,
      },
      {
         name: 'DFSK',
         img: '',
         id: 41,
      },
      {
         name: 'Dodge',
         img: '',
         id: 42,
      },
      {
         name: 'DongFeng',
         img: '',
         id: 43,
      },
      {
         name: 'DS',
         img: '',
         id: 44,
      },
      {
         name: 'Eagle',
         img: '',
         id: 45,
      },
      {
         name: 'Enovate',
         img: '',
         id: 46,
      },
      {
         name: 'Evergrande',
         img: '',
         id: 47,
      },
      {
         name: 'EXEED',
         img: '',
         id: 48,
      },
      {
         name: 'Fang Cheng Bao',
         img: '',
         id: 49,
      },
      {
         name: 'Farizon',
         img: '',
         id: 50,
      },
      {
         name: 'FAW',
         img: '',
         id: 51,
      },
      {
         name: 'Ferrari',
         img: '',
         id: 52,
      },
      {
         name: 'Fiat',
         img: '',
         id: 53,
      },
      {
         name: 'Fisker',
         img: '',
         id: 54,
      },
      {
         name: 'Ford',
         img: '',
         id: 55,
      },
      {
         name: 'Forthing',
         img: '',
         id: 56,
      },
      {
         name: 'Foton',
         img: '',
         id: 57,
      },
      {
         name: 'GAC',
         img: '',
         id: 58,
      },
      {
         name: 'Geely',
         img: '',
         id: 59,
      },
   ],
   models: [],
   driveUnits: [
      {
         value: 'ALL',
         label: 'Полный привод',
      },
      {
         value: 'FWD',
         label: 'Передний привод',
      },
      {
         value: 'RWD',
         label: 'Задний привод',
      },
      {
         value: 'OTHER',
         label: 'Другое',
      },
      {
         value: 'CONTROLLED_ALL',
         label: 'ХЗ ВООБЩЕ ЧТО ЭТО',
      },
   ],
   fuels: [
      {
         value: 'BIODIESEL',
         label: 'BIODIESEL',
      },
      {
         value: 'DIESEL',
         label: 'DIESEL',
      },
      {
         value: 'ELECTRIC',
         label: 'ELECTRIC',
      },
      {
         value: 'GASOLINE',
         label: 'GASOLINE',
      },
      {
         value: 'METHANE',
         label: 'METHANE',
      },
      {
         value: 'OTHER',
         label: 'OTHER',
      },
      {
         value: 'PROPANE',
         label: 'PROPANE',
      },
   ],
   gears: [
      {
         value: 'AUTOMATIC',
         label: 'AUTOMATIC',
      },
      {
         value: 'CTV',
         label: 'CTV',
      },
      {
         value: 'MANUAL',
         label: 'MANUAL',
      },
      {
         value: 'OTHER',
         label: 'OTHER',
      },
      {
         value: 'ROBOTIC',
         label: 'ROBOTIC',
      },
   ],
   colors: [
      {
         value: 'black',
         label: 'Black',
      },
      {
         value: 'blue',
         label: 'Blue',
      },
      {
         value: 'brown',
         label: 'Brown',
      },
      {
         value: 'gray',
         label: 'Gray',
      },
      {
         value: 'green',
         label: 'Green',
      },
      {
         value: 'orange',
         label: 'Orange',
      },
      {
         value: 'pink',
         label: 'Pink',
      },
      {
         value: 'purple',
         label: 'purple',
      },
      {
         value: 'red',
         label: 'red',
      },
      {
         value: 'white',
         label: 'white',
      },
      {
         value: 'yellow',
         label: 'yellow',
      },
   ],
};

export const ProductsSlice = createSlice({
   name: 'ProductsSlice',
   initialState,
   reducers: {
      setBrands: (state, action: PayloadAction<IBrand[]>) => {
         state.brands = action.payload;
      },
      setModels: (state, action: PayloadAction<IModel[]>) => {
         state.models = action.payload;
      },
   },
});

export default ProductsSlice.reducer;

export const { setBrands, setModels } = ProductsSlice.actions;
