import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOption } from './ProductsSlice';

export interface IFilterState {
   brands: IOption[];
   selectedBrand: string | null;
   models: IOption[];
   selectedModel: string | null;
}

const initialState: IFilterState = {
   brands: [],
   selectedBrand: null,
   models: [],
   selectedModel: null,
};

export const ProductsSlice = createSlice({
   name: 'ProductsSlice',
   initialState,
   reducers: {
      setBrands: (state, action: PayloadAction<IOption[]>) => {
         state.brands = action.payload;
      },
      setModels: (state, action: PayloadAction<IOption[]>) => {
         state.models = action.payload;
      },
      setSelectedBrand: (state, action: PayloadAction<string>) => {
         state.selectedBrand = action.payload;
      },
      setSelectedModel: (state, action: PayloadAction<string>) => {
         state.selectedModel = action.payload;
      },
   },
});

export default ProductsSlice.reducer;

export const { setBrands, setModels, setSelectedBrand, setSelectedModel } =
   ProductsSlice.actions;
