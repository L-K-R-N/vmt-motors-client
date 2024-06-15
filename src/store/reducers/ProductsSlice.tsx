import ProductService, {
   IPostProduct,
   TDriveUnit,
   TFuel,
   TGear,
   TProductType,
} from '@/api/services/ProductService';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBody, TBrand, TColor } from './FilterSlice';

export type TOwner = 'OWNER' | 'PRIVATE_OWNER' | 'COMPANY' | 'OTHER';

export interface IProduct {
   id: string;
   personId: string;
   moderated: boolean;
   type: TProductType;
   isNew: boolean;
   from: string;
   exchange: boolean;
   trade: boolean;
   owner: TOwner;
   name: string;
   desc: string;
   brand: TBrand;
   body: TBody;
   color: TColor;
   coloring: string;
   model: string;
   price: number;
   year: number;
   mileage: number;
   generation: string;
   gear: TGear;
   fuel: TFuel;
   driveUnit: TDriveUnit;
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
   myProducts: IProduct[];
   filtredProducts: IProduct[];
}
const initialState: IProductsState = {
   products: [],
   myProducts: [],

   filtredProducts: [],
};

export const postProduct = createAction<IPostProduct, 'product/post'>(
   'product/post',
);

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
         state.products = action.payload;
      },
   },
   extraReducers: (builder) => {
      // builder.addCase(
      //    postProduct,
      //    (state, action: PayloadAction<IPostProduct>) => {
      //       const payload = action.payload;
      //       try {
      //          (async () => {
      //             const response = await ProductService.postProduct({
      //                body: payload.body,
      //                brand: payload.brand,
      //                color: payload.color,
      //                coloring: payload.coloring,
      //                desc: payload.desc,
      //                driveUnit: payload.driveUnit,
      //                exchange: payload.exchange,
      //                from: payload.from,
      //                fuel: payload.fuel,
      //                gear: payload.gear,
      //                generation: payload.generation,
      //                isNew: true,
      //                mileage: payload.mileage,
      //                model: payload.model,
      //                name: payload.name,
      //                owner: payload.owner,
      //                photo: payload.photo,
      //                price: payload.price,
      //                trade: payload.trade,
      //                type: payload.type,
      //                year: payload.year,
      //             });
      //          })();
      //       } catch (e) {
      //          console.log(e);
      //       }
      //    },
      // );
   },
});

export default ProductsSlice.reducer;

export const { setProducts, setFiltredProducts, setMyProducts } =
   ProductsSlice.actions;
