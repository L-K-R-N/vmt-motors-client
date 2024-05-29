import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISortingOption } from '@/models/Filter.types';

export interface IRoute {
   id: number;
   title: string;
   price: number | null;
   start: string;
   end: string;
   type: 'extra' | 'standart';
}

export interface IStage {
   id: number;
   // value: string;

   // length: number;
   // time: number;
}
export interface IRoutesState {
   routes: IRoute[];

   sortingBy: ISortingOption;
}

const initialState: IRoutesState = {
   sortingBy: {
      label: 'По названию',
      value: 'title',
   },
   routes: [],
   // routes: [
   //    {
   //       title: 'aaaa',
   //       id: 1,
   //       price: 200,
   //       type: 'extra',
   //       stages: [
   //          {
   //             // start: 'Питер',

   //             id: 3,
   //             start: null,
   //             end: null,
   //          },
   //          {
   //             // start: 'Питер',

   //             id: 1,
   //             start: null,
   //             end: null,
   //          },
   //          {
   //             // start: 'Питер',

   //             id: 3,
   //             start: null,
   //             end: null,
   //          },
   //       ],
   //    },
   // ],
};

export const updateRoute = createAction<IRoute, 'routes/updateRoute'>(
   'routes/updateRoute',
);
// export const updateProductCountInCart = createAction<
//    Pick<IRoute, 'id' | 'countInCart'>,
//    'products/updateProductCountInCart'
// >('products/updateProductCountInCart');

export const ProductsSlice = createSlice({
   name: 'ProductsSlice',
   initialState,
   reducers: {
      setRoutes: (state, action: PayloadAction<IRoute[]>) => {
         state.routes = action.payload;
      },

      setSorting: (state, action: PayloadAction<ISortingOption>) => {
         state.sortingBy = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(updateRoute, (state, action: PayloadAction<IRoute>) => {
         const newRoute = action.payload;

         let route = state.routes.find((r) => r.id === newRoute.id);

         if (route) {
            route.id = newRoute.id;
            route.title = newRoute.title;
            route.type = newRoute.type;
            route.price = newRoute.price;
         }
      });
   },
   //    builder.addCase(
   //       updateProductCountInCart,
   //       (
   //          state,
   //          action: PayloadAction<Pick<IRoute, 'id' | 'countInCart'>>,
   //       ) => {
   //          const { id, countInCart } = action.payload;

   //          let product = state.products.find((p) => p.id === id);

   //          if (product) {
   //             product.countInCart = countInCart;
   //          }
   //       },
   //    );
   // },
});

export default ProductsSlice.reducer;

export const { setRoutes, setSorting } = ProductsSlice.actions;
