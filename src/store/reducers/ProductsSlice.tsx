import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISortingOption } from '@/models/Filter.types';
import { IProduct } from '@/models/Product.types';
import img from './assets/img.jpg';

export interface IProductsState {
   products: IProduct[];
   productSearch: string;
   sortingBy: ISortingOption;
}

const initialState: IProductsState = {
   productSearch: '',
   sortingBy: {
      label: 'По названию',
      value: 'title',
   },
   products: [
      {
         id: 0,
         name: 'Бумага',
         desc: 'Это высококачественная бумага',
         img: img,
         rating: 4.1,
         price: 150,
         inCart: false,
         countInCart: 1,
      },
      {
         id: 1,
         name: 'Упаковочные материалы',
         desc: 'Очень хорошие упаковочные материалы',
         img: img,
         rating: 5,
         price: 150,
         inCart: false,
         countInCart: 1,
      },
      {
         id: 2,
         name: 'Дерево',
         desc: 'Лучшее, что можно найти',
         img: img,
         rating: 4.5,
         price: 150,
         inCart: false,
         countInCart: 1,
      },
      {
         id: 3,
         name: 'Бревна',
         desc: 'Описание этого товара',
         img: img,
         rating: 3,
         price: 150,
         inCart: false,
         countInCart: 1,
      },
      {
         id: 4,
         name: 'Деревянный дом',
         desc: 'Отличный дом, приятная атмосфера',
         img: img,
         rating: 4.5,
         price: 150,
         inCart: false,
         countInCart: 1,
      },
      {
         id: 5,
         name: 'Название 2',
         desc: 'Оисание 2',
         img: img,
         rating: 4.5,
         price: 150,
         inCart: false,
         countInCart: 1,
      },
      {
         id: 6,
         name: 'Деревянная дверь',
         desc: 'Дверь из дерева',
         img: img,
         rating: 4.5,
         price: 150,
         inCart: false,
         countInCart: 1,
      },
   ],
};

export const updateProduct = createAction<IProduct, 'products/updateProduct'>(
   'products/updateProduct',
);
export const updateProductCountInCart = createAction<
   Pick<IProduct, 'id' | 'countInCart'>,
   'products/updateProductCountInCart'
>('products/updateProductCountInCart');

export const ProductsSlice = createSlice({
   name: 'ProductsSlice',
   initialState,
   reducers: {
      setProductSearch: (state, action: PayloadAction<string>) => {
         state.productSearch = action.payload;
      },
      setSorting: (state, action: PayloadAction<ISortingOption>) => {
         state.sortingBy = action.payload;
      },

      setProducts: (state, action: PayloadAction<IProduct[]>) => {
         state.products = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(
         updateProduct,
         (state, action: PayloadAction<IProduct>) => {
            const newProduct = action.payload;

            let product = state.products.find((p) => p.id === newProduct.id);

            if (product) {
               product.id = newProduct.id;
               product.name = newProduct.name;
               product.desc = newProduct.desc;
               product.img = newProduct.img;
               product.inCart = newProduct.inCart;
               product.price = newProduct.price;
               product.rating = newProduct.rating;
               product.countInCart = newProduct.countInCart;
            }
         },
      );
      builder.addCase(
         updateProductCountInCart,
         (
            state,
            action: PayloadAction<Pick<IProduct, 'id' | 'countInCart'>>,
         ) => {
            const { id, countInCart } = action.payload;

            let product = state.products.find((p) => p.id === id);

            if (product) {
               product.countInCart = countInCart;
            }
         },
      );
   },
});

export default ProductsSlice.reducer;

export const { setProductSearch, setSorting, setProducts } =
   ProductsSlice.actions;
