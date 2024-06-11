import { TDriveUnit, TFuel, TGear } from '@/api/services/ProductService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilterState {
   brands: ISelectItem<TBrand>[];
   models: string[];
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

// export interface IModel {
//    name: string;
//    img: string;
//    id: number;
//    brandId: number;
// }

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

export type TBrand =
   | 'Acura'
   | 'AITO'
   | 'Alfa Romeo'
   | 'Alga'
   | 'Alpina'
   | 'Arcfox'
   | 'Aro'
   | 'Aston Martin'
   | 'Audi'
   | 'Aurus'
   | 'BAIC'
   | 'Bajaj'
   | 'BAW'
   | 'Bentley'
   | 'Blaval'
   | 'BMW'
   | 'Borgward'
   | 'Brilliance'
   | 'Bugatti'
   | 'Buick'
   | 'BYD'
   | 'Cadillac'
   | 'Changan'
   | 'ChangFeng'
   | 'Changhe'
   | 'Chery'
   | 'Chevrolet'
   | 'Chrysler'
   | 'Citroen'
   | 'Core Power'
   | 'Dacia'
   | 'Daewoo';
const initialState: IFilterState = {
   brands: [
      {
         value: 'AITO',
         label: 'AITO',
      },
      {
         value: 'Acura',
         label: 'Acura',
      },
      {
         value: 'Alfa Romeo',
         label: 'Alfa Romeo',
      },
      {
         value: 'Alga',
         label: 'Alga',
      },
      {
         value: 'Alpina',
         label: 'Alpina',
      },
      {
         value: 'Arcfox',
         label: 'Arcfox',
      },
      {
         value: 'Aro',
         label: 'Aro',
      },
      {
         value: 'Aston Martin',
         label: 'Aston Martin',
      },
      {
         value: 'Audi',
         label: 'Audi',
      },
      {
         value: 'Aurus',
         label: 'Aurus',
      },
      {
         value: 'BAIC',
         label: 'BAIC',
      },
      {
         value: 'BAW',
         label: 'BAW',
      },
      {
         value: 'BMW',
         label: 'BMW',
      },
      {
         value: 'BYD',
         label: 'BYD',
      },
      {
         value: 'Bajaj',
         label: 'Bajaj',
      },
      {
         value: 'Bentley',
         label: 'Bentley',
      },
      {
         value: 'Blaval',
         label: 'Blaval',
      },
      {
         value: 'Borgward',
         label: 'Borgward',
      },
      {
         value: 'Brilliance',
         label: 'Brilliance',
      },
      {
         value: 'Bugatti',
         label: 'Bugatti',
      },
      {
         value: 'Buick',
         label: 'Buick',
      },
      {
         value: 'Cadillac',
         label: 'Cadillac',
      },
      {
         value: 'ChangFeng',
         label: 'ChangFeng',
      },
      {
         value: 'Changan',
         label: 'Changan',
      },
      {
         value: 'Changhe',
         label: 'Changhe',
      },
      {
         value: 'Chery',
         label: 'Chery',
      },
      {
         value: 'Chevrolet',
         label: 'Chevrolet',
      },
      {
         value: 'Chrysler',
         label: 'Chrysler',
      },
      {
         value: 'Citroen',
         label: 'Citroen',
      },
      {
         value: 'Core Power',
         label: 'Core Power',
      },
      {
         value: 'Dacia',
         label: 'Dacia',
      },
      {
         value: 'Daewoo',
         label: 'Daewoo',
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
      setBrands: (state, action: PayloadAction<ISelectItem<TBrand>[]>) => {
         state.brands = action.payload;
      },
      setModels: (state, action: PayloadAction<string[]>) => {
         state.models = action.payload;
      },
   },
});

export default ProductsSlice.reducer;

export const { setBrands, setModels } = ProductsSlice.actions;
