import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISortingOption } from '@/models/Filter.types';
import { IProduct } from '@/models/Product.types';

export interface ICartState {
   cartProducts: IProduct[];
   productSearch: string;
   sortingBy: ISortingOption;
}

const initialState: ICartState = {
   productSearch: '',
   sortingBy: {
      label: 'По названию',
      value: 'title',
   },
   cartProducts: [],
};

export const CartSlice = createSlice({
   name: 'CartSlice',
   initialState,
   reducers: {
      setProductSearch: (state, action: PayloadAction<string>) => {
         state.productSearch = action.payload;
      },
      setSorting: (state, action: PayloadAction<ISortingOption>) => {
         state.sortingBy = action.payload;
      },
      setCartProducts: (state, action: PayloadAction<IProduct[]>) => {
         state.cartProducts = action.payload;
      },
   },
});

export default CartSlice.reducer;

export const { setProductSearch, setSorting, setCartProducts } =
   CartSlice.actions;
