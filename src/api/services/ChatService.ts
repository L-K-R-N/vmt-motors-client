import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { IProduct } from '@/models/Product.types';

export default class ChatService {
   static async getProducts(): Promise<AxiosResponse<IProduct[]>> {
      return $api.get<IProduct[]>('api/product/commodity/my');
   }
}
