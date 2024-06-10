import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

type TCar = 'a';
type TCarGear = 'a';
type TCarFuel = 'a';
type TDriveUnit = 'a';
type TBrand = 'BMW' | 'Audi';
type BMWModels = 'm4' | 'm5';

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
         driveUnit: 'a',
         fuel: 'a',
         gear: 'a',
         generation: 'a',
         isNew: true,
         model: {
            label: 'E120',
            value: 'E120',
         },
         moderated: false,
         personId: 1,
         price: 100,
         type: 'a',
         year: 1000,
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
         driveUnit: 'a',
         fuel: 'a',
         gear: 'a',
         generation: 'a',
         isNew: true,
         model: {
            label: 'Veiron',
            value: 'Veiron',
         },
         moderated: false,
         personId: 1,
         price: 100,
         type: 'a',
         year: 1000,
      },
   ],
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
