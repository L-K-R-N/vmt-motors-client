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
import { IGeneration, IModel } from '@/pages/other/AddAdvertPage/AddAdvertPage';

export interface IFilterState {
   brands: ISelectItem<string>[];
   models: IModel[];
   generations: IGeneration[];
   driveUnits: ISelectItem<TDriveUnit>[];
   fuels: ISelectItem<TFuel>[];
   gears: ISelectItem<TGear>[];
   colors: ISelectItem<TColor>[];
   types: ISelectItem<string>[];
   owners: ISelectItem<string>[];
   bodies: ISelectItem<TBody>[];
   activeType: ISelectItem<string>;
   sortByOptions: ISelectItem<TSorting>[];
   colorings: ISelectItem<TColoring>[];
   activeVariant: string;

   selectedBrand: ISelectItem<string> | null;
   selectedModel: IModel | null;
   selectedGeneration: IGeneration | null;
   selectedFuelValue: string | null;
   selectedBodyValue: string | null;
   selectedGearValue: string | null;
   selectedDriveUnitValue: string | null;
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
   selectedGeneration: null,
   selectedFuelValue: null,
   selectedBodyValue: null,
   selectedGearValue: null,
   selectedDriveUnitValue: null,
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
         value: 'company',
         label: 'company',
      },
      {
         value: 'private_person',
         label: 'private_person',
      },
      // {
      //    value: 'PRIVATE_OWNER',
      //    label: 'private_owner',
      // },
      {
         value: 'other',
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
      // {
      //    value: 'GRADIENT',
      //    label: 'gradient',
      // },
      // {
      //    value: 'OTHER',
      //    label: 'other',
      // },
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
      setModels: (state, action: PayloadAction<IModel[]>) => {
         state.models = action.payload;
      },
      setGenerations: (state, action: PayloadAction<IGeneration[]>) => {
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
      setSelectedModel: (state, action: PayloadAction<IModel | null>) => {
         state.selectedModel = action.payload;
      },
      setSelectedGeneration: (
         state,
         action: PayloadAction<IGeneration | null>,
      ) => {
         state.selectedGeneration = action.payload;
      },
      setSelectedBodyValue: (state, action: PayloadAction<string | null>) => {
         state.selectedBodyValue = action.payload;
      },
      setSelectedFuelValue: (state, action: PayloadAction<string | null>) => {
         state.selectedFuelValue = action.payload;
      },
      setSelectedGearValue: (state, action: PayloadAction<string | null>) => {
         state.selectedGearValue = action.payload;
      },
      setSelectedDriveUnitValue: (
         state,
         action: PayloadAction<string | null>,
      ) => {
         state.selectedDriveUnitValue = action.payload;
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
   setSelectedBodyValue,
   setSelectedFuelValue,
   setSelectedGearValue,
   setSelectedDriveUnitValue,
   setSelectedGeneration,
} = FilterSlice.actions;
