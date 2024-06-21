import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/api/models/Products';

// interface IBrand {
//    id: number;
//    name: string;
// }

// interface IModel {
//    brandId: number;
//    name: string;
// }

//
export interface IOption {
   label: string;
   value: string;
}

export interface IProductsState {
   products: IProduct[];
   productsCount: number;
   myProducts: IProduct[];
   moderatedProducts: IProduct[];
   filtredProducts: IProduct[];
}
const initialState: IProductsState = {
   products: [],
   productsCount: 0,
   myProducts: [],
   moderatedProducts: [],
   filtredProducts: [],
};

export const ProductsSlice = createSlice({
   name: 'ProductsSlice',
   initialState,
   reducers: {
      setProducts: (state, action: PayloadAction<IProduct[]>) => {
         state.products = action.payload;
      },
      setFiltredProducts: (state, action: PayloadAction<IProduct[]>) => {
         state.filtredProducts = action.payload;
      },

      setMyProducts: (state, action: PayloadAction<IProduct[]>) => {
         state.myProducts = action.payload;
      },
      setModeratedProducts: (state, action: PayloadAction<IProduct[]>) => {
         state.moderatedProducts = action.payload;
      },
      setProductsCount: (state, action: PayloadAction<number>) => {
         state.productsCount = action.payload;
      },
   },
});

export default ProductsSlice.reducer;

export const {
   setProducts,
   setFiltredProducts,
   setMyProducts,
   setModeratedProducts,
   setProductsCount,
} = ProductsSlice.actions;
