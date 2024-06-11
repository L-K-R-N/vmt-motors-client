import {
   TDriveUnit,
   TFuel,
   TGear,
   TProductType,
} from '@/api/services/ProductService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISelectItem, TColor } from './FilterSlice';

export interface IProduct {
   id: string;
   personId: number;
   moderated: boolean;
   type: TProductType;
   isNew: boolean;
   name: string;
   desc: string;
   brand: IOption;
   body: string;
   color: TColor;
   coloring: string;
   model: IOption;
   price: number;
   year: number;
   mileage: number;
   generation: string;
   gear: ISelectItem<TGear>;
   fuel: ISelectItem<TFuel>;
   driveUnit: ISelectItem<TDriveUnit>;
   createdAt: Date;
   photoId: number | null;
}
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
   filtredProducts: IProduct[];
}
const initialState: IProductsState = {
   products: [
      {
         id: '0',
         name: 'VAZ',
         desc: 'Это высококачественная машина',
         body: 'adfas',
         brand: {
            label: 'BELAZ',
            value: 'BELAZ',
         },
         color: 'red',
         createdAt: new Date(),
         mileage: 1000,
         driveUnit: {
            label: 'ALL',
            value: 'ALL',
         },
         fuel: {
            label: 'BIODIESEL',
            value: 'BIODIESEL',
         },
         gear: {
            value: 'CTV',
            label: 'CTV',
         },
         generation: 'a',
         isNew: true,
         model: {
            label: 'E120',
            value: 'E120',
         },
         moderated: true,
         personId: 1,
         price: 100,
         type: 'AUTOMOBILE',
         year: 1000,
         photoId: null,
         coloring: 'aaa',
      },
      {
         id: '1',
         name: 'BMW',
         desc: 'Очень хорошие BMW',
         body: 'adfas',
         brand: {
            label: 'BMW',
            value: 'BMW',
         },
         color: 'red',
         createdAt: new Date(),
         driveUnit: {
            value: 'FWD',
            label: 'FWD',
         },
         mileage: 1000,
         fuel: {
            value: 'METHANE',
            label: 'METHANE',
         },
         gear: {
            value: 'ROBOTIC',
            label: 'ROBOTIC',
         },
         generation: 'a',
         isNew: false,
         model: {
            label: 'Veiron',
            value: 'Veiron',
         },
         moderated: false,
         personId: 1,
         price: 100,
         type: 'MOTORCYCLE',
         year: 1000,
         photoId: null,
         coloring: 'aaa',
      },
   ],

   filtredProducts: [
      {
         id: '0',
         name: 'VAZ',
         desc: 'Это высококачественная машина',
         body: 'adfas',
         brand: {
            label: 'BELAZ',
            value: 'BELAZ',
         },
         color: 'red',
         createdAt: new Date(),
         mileage: 1000,
         driveUnit: {
            value: 'ALL',
            label: 'ALL',
         },
         fuel: {
            value: 'BIODIESEL',
            label: 'BIODIESEL',
         },
         gear: {
            value: 'CTV',
            label: 'CTV',
         },
         generation: 'a',
         isNew: true,
         model: {
            label: 'E120',
            value: 'E120',
         },
         moderated: true,
         personId: 1,
         price: 100,
         type: 'AUTOMOBILE',
         year: 1000,
         photoId: null,
         coloring: 'aaa',
      },
      {
         id: '1',
         name: 'BMW',
         desc: 'Очень хорошие BMW',
         body: 'adfas',
         brand: {
            label: 'BMW',
            value: 'BMW',
         },
         color: 'red',
         createdAt: new Date(),
         mileage: 1000,
         driveUnit: {
            label: 'FWD',
            value: 'FWD',
         },
         fuel: {
            value: 'METHANE',
            label: 'METHANE',
         },
         gear: {
            value: 'ROBOTIC',
            label: 'ROBOTIC',
         },
         generation: 'a',
         isNew: false,
         model: {
            label: 'Veiron',
            value: 'Veiron',
         },
         moderated: false,
         personId: 1,
         price: 100,
         type: 'MOTORCYCLE',
         year: 1000,
         photoId: null,
         coloring: 'aaa',
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

      setFiltredProducts: (state, action: PayloadAction<IProduct[]>) => {
         state.filtredProducts = action.payload;
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

export const { setProducts, setFiltredProducts } = ProductsSlice.actions;
