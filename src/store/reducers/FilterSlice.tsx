
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TBrand, TColor, TBody, TDriveUnit, TFuel, TGear, TOwner, TProductType, ISelectItem, TSorting, TColoring } from '@/api/models/Products';

export interface IFilterState {
   brands: ISelectItem<string>[];
   models: ISelectItem<string>[];
   generations: ISelectItem<string>[];
   driveUnits: ISelectItem<TDriveUnit>[];
   fuels: ISelectItem<TFuel>[];
   gears: ISelectItem<TGear>[];
   colors: ISelectItem<TColor>[];
   types: ISelectItem<TProductType>[];
   owners: ISelectItem<TOwner>[];
   bodies: ISelectItem<TBody>[];
   sortByOptions: ISelectItem<TSorting>[];
   colorings: ISelectItem<TColoring>[];
}

const initialState: IFilterState = {
   brands: [],
   models: [],
   generations: [],
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
   owners: [
      {
         value: 'COMPANY',
         label: 'COMPANY'
      },
      {
         value: 'OWNER',
         label: 'OWNER'
      },
      {
         value: 'PRIVATE_OWNER',
         label: 'PRIVATE_OWNER'
      },
      {
         value: 'OTHER',
         label: 'OTHER'
      }
     
   ],
   colors: [
      {
         value: 'BLACK',
         label: 'Black',
      },
      {
         value: 'BLUE',
         label: 'Blue',
      },
      {
         value: 'BROWN',
         label: 'Brown',
      },
      {
         value: 'GRAY',
         label: 'Gray',
      },
      {
         value: 'CYAN',
         label: 'Cyan',
      },
      {
         value: 'GREEN',
         label: 'Green',
      },
      {
         value: 'ORANGE',
         label: 'Orange',
      },
      {
         value: 'PINK',
         label: 'Pink',
      },
      {
         value: 'PURPLE',
         label: 'purple',
      },
      {
         value: 'RED',
         label: 'red',
      },
      {
         value: 'WHITE',
         label: 'white',
      },
      {
         value: 'YELLOW',
         label: 'yellow',
      },
      {
         value: 'GRADIENT',
         label: 'Gradient',
      },
      {
         value: 'OTHER',
         label: 'Other',
      },
   ],
   types: [
      {
         value: 'AUTOMOBILE',
         label: 'AUTOMOBILE',
      },
      {
         value: 'CONSUMABLES',
         label: 'CONSUMABLES',
      },
      {
         value: 'DETAILS',
         label: 'DETAILS',
      },
      {
         value: 'MOTORCYCLE',
         label: 'MOTORCYCLE',
      },
      {
         value: 'SPECIAL_EQUIPMENTS',
         label: 'SPECIAL_EQUIPMENTS',
      },
   ],
   bodies: [
      {
         value: 'cabriolet',
         label: 'Cabriolet',
      },
      {
         value: 'compact',
         label: 'compact',
      },
      {
         value: 'coupe',
         label: 'coupe',
      },
      {
         value: 'crossover',
         label: 'crossover',
      },
      {
         value: 'hatchback',
         label: 'hatchback',
      },
      {
         value: 'liftback',
         label: 'liftback',
      },
      {
         value: 'offroad',
         label: 'offroad',
      },
      {
         value: 'roadster',
         label: 'roadster',
      },
      {
         value: 'sedan',
         label: 'sedan',
      },
      {
         value: 'universal',
         label: 'universal',
      },
   ],
   
   sortByOptions: [
      {
         value: 'createdAt',
         label: 'createdAt'
      }
   ],
   colorings: [
      {
         value: 'MATTE',
         label: 'Matte'
      },
      {
         value: 'GLOSSY',
         label: 'Glossy'
      },
      {
         value: 'METALLIC',
         label: 'Metallic'
      },
      {
         value: 'NACRE',
         label: 'Nacre'
      },
   ],
};

export const ProductsSlice = createSlice({
   name: 'ProductsSlice',
   initialState,
   reducers: {
      setBrands: (state, action: PayloadAction<ISelectItem<string>[]>) => {
         state.brands = action.payload;
      },
      setModels: (state, action: PayloadAction<ISelectItem<string>[]>) => {
         state.models = action.payload;
      },
      setGenerations: (state, action: PayloadAction<ISelectItem<string>[]>) => {
         state.generations = action.payload;
      },
      
   },
});

export default ProductsSlice.reducer;

export const { setBrands, setGenerations, setModels } = ProductsSlice.actions;
