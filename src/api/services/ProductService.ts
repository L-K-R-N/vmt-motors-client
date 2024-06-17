import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { IProduct, IPostProductRequest } from '../models/Products';

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
   }): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>(`product/commodity/person/${data.personId}`);
   }
   static async getProduct(data: {
      productId: string;
   }): Promise<AxiosResponse<IProduct>> {
      return $api.get<IProduct>(`product/commodity/one/${data.productId}`);
   }
   static async getAllProducts(
      params: IParams,
   ): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>(`product/commodity`, {
         params: params,
      });
   }
   static async getAllModerationProducts(
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
      data: IPostProductRequest,
   ): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>(`product/commodity/search/`, {
         params: {
            type: data.type,
            name: data.name,
            description: data.desc,
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
         },
      });
   }

   // POST
   static async postProduct(data: IPostProductRequest): Promise<AxiosResponse> {
      return $api.post('product/commodity', {
         type: data.type,
         name: data.name,
         description: data.desc,
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
      return $api.delete(`product/commodity/`, {
         data: {
            commodityId: data.productId,
         },
      });
   }

   // PUT

   static async editProduct(data: {
      productId: string;
   }): Promise<AxiosResponse> {
      return $api.delete(`product/commodity/`, {
         data: {
            commodityId: data.productId,
         },
      });
   }
}
