import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISortingOption } from '@/models/Filter.types';

export interface IProductsState {
   products: IProduct[];
}
export interface IProduct {
   id: string;
   personId: number;
   moderated: boolean;
   type: TCar;
   isNew: boolean;
   name: string;
   desc: string;
   brand: IOption;
   body: string;
   color: string;
   model: IOption;
   price: number;
   year: number;
   generation: string;
   gear: TCarGear;
   fuel: TCarFuel;
   driveUnit: TDriveUnit;
   createdAt: Date;
}

export interface IOption {
   label: string;
   value: string;
}

type TCar = 'a';
type TCarGear = 'a';
type TCarFuel = 'a';
type TDriveUnit = 'a';
type TBrand = 'BMW' | 'Audi';
type BMWModels = 'm4' | 'm5';

const initialState: IProductsState = {
   products: [
      {
         id: '0',
         name: 'Бумага',
         desc: 'Это высококачественная бумага',
         body: 'adfas',
         brand: {
            label: 'adf',
            value: 'asdasdf',
         },
         color: 'red',
         createdAt: new Date(),
         driveUnit: 'a',
         fuel: 'a',
         gear: 'a',
         generation: 'a',
         isNew: true,
         model: {
            label: 'adf',
            value: 'asdasdf',
         },
         moderated: false,
         personId: 1,
         price: 100,
         type: 'a',
         year: 1000,
      },
      {
         id: '1',
         name: 'Упаковочные материалы',
         desc: 'Очень хорошие упаковочные материалы',
         body: 'adfas',
         brand: {
            label: 'adf',
            value: 'asdasdf',
         },
         color: 'red',
         createdAt: new Date(),
         driveUnit: 'a',
         fuel: 'a',
         gear: 'a',
         generation: 'a',
         isNew: true,
         model: {
            label: 'adf',
            value: 'asdasdf',
         },
         moderated: false,
         personId: 1,
         price: 100,
         type: 'a',
         year: 1000,
      },
   ],
};

export const ProductsSlice = createSlice({
   name: 'ProductsSlice',
   initialState,
   reducers: {
      setProducts: (state, action: PayloadAction<IProduct[]>) => {
         state.products = action.payload;
      },
   },
   // extraReducers: (builder) => {
   //    builder.addCase(
   //       updateProduct,
   //       (state, action: PayloadAction<IProduct>) => {
   //          const newProduct = action.payload;
   //       },
   //    );
   //    builder.addCase(
   //       updateProductCountInCart,
   //       (
   //          state,
   //          action: PayloadAction<Pick<IProduct, 'id' | 'countInCart'>>,
   //       ) => {},
   //    );
   // },
});

export default ProductsSlice.reducer;

export const { setProducts } = ProductsSlice.actions;
