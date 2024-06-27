import { AxiosResponse } from 'axios';
import $api from '../public.api';
import {
   IProduct,
   IPostProductRequest,
   ISearchProductsRequest,
} from '../models/Products';
import { IProductsState } from '@/store/reducers/ProductsSlice';

interface ISearchResponse {
   total: number;
   result: IProduct[];
}

interface IBasketResponse {
   commodity: IProduct;
   id: string;
   commodityId: string;
}

export default class ProductService {
   // GET
   static async getMyProducts(
      params: IParams,
   ): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>('product/commodity/my', {
         params,
      });
   }
   static async getProductsByPerson(data: {
      personId: string;
      params: {
         page: number;
         limit: number;
      };
   }): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>(`product/commodity/person`, {
         params: {
            personId: data.personId,
            page: data.params.page,
            limit: data.params.limit,
         },
      });
   }
   static async hasProductInBasket(
      productId: string,
   ): Promise<AxiosResponse<{ has: boolean }>> {
      return $api.get<{ has: boolean }>(`product/basket/has`, {
         params: {
            commodityId: productId,
         },
      });
   }

   static async getProduct(data: {
      productId: string;
   }): Promise<AxiosResponse<IProduct>> {
      return $api.get<IProduct>(`product/commodity/one`, {
         params: {
            commodityId: data.productId,
         },
      });
   }
   static async getAllProducts(
      params: IParams,
   ): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>(`product/commodity`, {
         params: params,
      });
   }
   static async getAllModeratedProducts(
      params: IParams,
   ): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>(`product/commodity/moderation/all`, {
         params: params,
      });
   }

   static async getProductPhotos(data: {
      productId: string;
   }): Promise<AxiosResponse<IProduct>> {
      return $api.get<IProduct>(`product/commodity/photo/`);
   }

   static async getFiltredProducts(
      data: ISearchProductsRequest,
   ): Promise<AxiosResponse<ISearchResponse>> {
      return $api.get<ISearchResponse>(`product/commodity/search`, {
         params: data,

         // () => {
         //    let newParams = new Map();

         //    Object.entries(data).map(([key, value]) => {
         //       if (value && key) {
         //          newParams.set(key, value);
         //       }
         //    });
         //    return newParams;
         // },
      });
   }
   static async getProductsInBasket(
      type: 'old' | 'new',
      data: {
         limit: number;
         offsetBasketId?: string;
      },
   ): Promise<AxiosResponse<IBasketResponse[]>> {
      return $api.get<IBasketResponse[]>(`product/basket/${type}`, {
         params: data,
      });
   }

   // POST
   static async postProduct(data: IPostProductRequest): Promise<AxiosResponse> {
      return $api.post('product/commodity', {
         type: data.type,
         name: data.name,
         description: data.description,
         isNew: data.isNew,
         brand: data.brand,
         body: data.body,
         from: data.from,
         exchange: data.exchange,
         trade: data.trade,
         millage: data.millage,
         owner: data.owner,
         color: data.color,
         coloring: data.coloring,
         model: data.model,
         price: data.price,
         year: data.year,
         generation: data.generation,
         gear: data.gear,
         fuel: data.fuel,
         driveUnit: data.driveUnit,
      });
   }

   static async addToBasket(productId: string): Promise<AxiosResponse> {
      return $api.post(`product/basket`, {
         commodityId: productId,
      });
   }
   static async rejectProduct(data: {
      productId: string;
   }): Promise<AxiosResponse> {
      return $api.post(`product/commodity/moderation/reject`, {
         commodityId: data.productId,
      });
   }
   static async acceptProduct(data: {
      productId: string;
   }): Promise<AxiosResponse> {
      return $api.post(`product/commodity/moderation/accept`, {
         commodityId: data.productId,
      });
   }

   // DELETE
   static async deleteProductPhoto(data: {
      photoId: string;
   }): Promise<AxiosResponse> {
      return $api.delete(`product/commodity/photo`, {
         data: {
            commodityPhotoId: data.photoId,
         },
      });
   }
   static async deleteProduct(data: {
      productId: string;
   }): Promise<AxiosResponse> {
      return $api.delete(`product/commodity`, {
         data: {
            commodityId: data.productId,
         },
      });
   }

   static async deleleFromBasket(productId: string): Promise<AxiosResponse> {
      return $api.delete(`product/basket`, {
         data: {
            commodityId: productId,
         },
      });
   }

   // PUT

   static async editProduct(
      product: IPostProductRequest,
   ): Promise<AxiosResponse> {
      return $api.put(`product/commodity`, {
         product,
      });
   }
}
