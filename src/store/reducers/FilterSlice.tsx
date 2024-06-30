import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
   TBrand,
   TColor,
   TBody,
   TDriveUnit,
   TFuel,
   TGear,
   TOwner,
   TProductType,
   ISelectItem,
   TSorting,
   TColoring,
} from '@/api/models/Products';

export interface IFilterState {
   brands: ISelectItem<string>[];
   models: ISelectItem<string>[];
   generations: ISelectItem<string>[];
   driveUnits: ISelectItem<TDriveUnit>[];
   fuels: ISelectItem<TFuel>[];
   gears: ISelectItem<TGear>[];
   colors: ISelectItem<TColor>[];
   types: ISelectItem<string>[];
   owners: ISelectItem<TOwner>[];
   bodies: ISelectItem<TBody>[];
   activeType: ISelectItem<string>;
   sortByOptions: ISelectItem<TSorting>[];
   colorings: ISelectItem<TColoring>[];
   activeVariant: string;
   selectedBrand: ISelectItem<string> | null;
   selectedModel: ISelectItem<string> | null;
}

const initialState: IFilterState = {
   brands: [],
   models: [],
   selectedModel: null,
   generations: [],
   driveUnits: [
      {
         value: 'ALL',
         label: 'driveUnits_all',
      },
      {
         value: 'FWD',
         label: 'driveUnits_fwd',
      },
      {
         value: 'RWD',
         label: 'driveUnits_rwd',
      },
      {
         value: 'OTHER',
         label: 'other',
      },
      {
         value: 'CONTROLLED_ALL',
         label: 'driveUnits_controlled_all',
      },
   ],
   selectedBrand: null,
   activeVariant: 'all',
   activeType: {
      value: 'AUTOMOBILE',
      label: 'automobile',
   },
   fuels: [
      // {
      //    value: 'BIODIESEL',
      //    label: 'biodiesel',
      // },
      {
         value: 'DIESEL',
         label: 'diesel',
      },
      {
         value: 'ELECTRIC',
         label: 'electric',
      },
      {
         value: 'GASOLINE',
         label: 'gasoline',
      },
      // {
      //    value: 'METHANE',
      //    label: 'methane',
      // },
      {
         value: 'OTHER',
         label: 'other',
      },
      // {
      //    value: 'PROPANE',
      //    label: 'propane',
      // },
   ],
   gears: [
      {
         value: 'AUTOMATIC',
         label: 'automatic',
      },
      // {
      //    value: 'CTV',
      //    label: 'ctv',
      // },
      {
         value: 'MANUAL',
         label: 'manual',
      },
      {
         value: 'OTHER',
         label: 'other',
      },
      {
         value: 'ROBOTIC',
         label: 'robotic',
      },
   ],
   owners: [
      {
         value: 'COMPANY',
         label: 'company',
      },
      {
         value: 'OWNER',
         label: 'owner',
      },
      // {
      //    value: 'PRIVATE_OWNER',
      //    label: 'private_owner',
      // },
      {
         value: 'OTHER',
         label: 'other',
      },
   ],
   colors: [
      {
         value: 'BLACK',
         label: 'black',
      },
      {
         value: 'BLUE',
         label: 'blue',
      },
      {
         value: 'BROWN',
         label: 'brown',
      },
      {
         value: 'GRAY',
         label: 'gray',
      },
      {
         value: 'CYAN',
         label: 'cyan',
      },
      {
         value: 'GREEN',
         label: 'green',
      },
      {
         value: 'ORANGE',
         label: 'orange',
      },
      {
         value: 'PINK',
         label: 'pink',
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
         label: 'gradient',
      },
      {
         value: 'OTHER',
         label: 'other',
      },
   ],
   types: [
      {
         value: 'AUTOMOBILE',
         label: 'automobile',
      },
      {
         value: 'CONSUMABLES',
         label: 'consumables',
      },
      {
         value: 'DETAILS',
         label: 'details',
      },
      {
         value: 'MOTORCYCLE',
         label: 'motorcycle',
      },
      {
         value: 'SPECIAL_EQUIPMENTS',
         label: 'special_equipments',
      },
   ],
   bodies: [
      {
         value: 'cabriolet',
         label: 'cabriolet',
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
         label: 'createdAt',
      },
   ],
   colorings: [
      {
         value: 'MATTE',
         label: 'matte',
      },
      {
         value: 'GLOSSY',
         label: 'glossy',
      },
      {
         value: 'METALLIC',
         label: 'metallic',
      },
      {
         value: 'NACRE',
         label: 'nacre',
      },
   ],
};

export const FilterSlice = createSlice({
   name: 'FilterSlice',
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
      setActiveVariant: (state, action: PayloadAction<string>) => {
         state.activeVariant = action.payload;
      },
      setActiveType: (state, action: PayloadAction<ISelectItem<string>>) => {
         state.activeType = action.payload;
      },
      setSelectedBrand: (
         state,
         action: PayloadAction<ISelectItem<string> | null>,
      ) => {
         state.selectedBrand = action.payload;
      },
      setSelectedModel: (
         state,
         action: PayloadAction<ISelectItem<string> | null>,
      ) => {
         state.selectedModel = action.payload;
      },
   },
});

export default FilterSlice.reducer;

export const {
   setBrands,
   setGenerations,
   setModels,
   setActiveVariant,
   setActiveType,
   setSelectedBrand,
   setSelectedModel,
} = FilterSlice.actions;
