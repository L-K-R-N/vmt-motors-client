import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { IUser } from '@/models/User.types';
import { IStatusResponse } from '../models/PersoneResponse';

export default class PersonService {
   static async getMe(): Promise<AxiosResponse<IUser>> {
      return $api.get<IUser>('api/person/me');
   }
   static async getPerson(id: string): Promise<AxiosResponse<IUser>> {
      return $api.get<IUser>(`api/person/${id}`);
   }
   static async getPersonByUsername(
      username: string,
   ): Promise<AxiosResponse<IUser>> {
      return $api.get<IUser>(`api/person/by-username${username}`);
   }
   static async getAllPersons(): Promise<AxiosResponse<IUser[]>> {
      return $api.get<IUser[]>('api/person/all');
   }

   static async getStatus(id: string): Promise<AxiosResponse<IStatusResponse>> {
      return $api.get<IStatusResponse>(`api/person/status/${id}`);
   }
   static async getStatusCurrent(
      id: string,
   ): Promise<AxiosResponse<IStatusResponse>> {
      return $api.get<IStatusResponse>(`api/person/current/${id}`);
   }
   static async getPersonStatusSelected(
      id: string,
   ): Promise<AxiosResponse<IStatusResponse>> {
      return $api.get<IStatusResponse>(`api/person/status/selected/${id}`);
   }

   static async banPerson(id: string): Promise<AxiosResponse> {
      return $api.post<IUser>(`api/person/ban/ban/${id}`, {
         id,
      });
   }
   static async unbanPerson(id: string): Promise<AxiosResponse> {
      return $api.post<IUser>('api/person/ban/unban/`', {
         id,
      });
   }

   static async changePersonPhoto(
      id: string,
      photo: string,
   ): Promise<AxiosResponse> {
      return $api.post<string>(`api/person/profile-photo/`, {
         id,
         photo,
      });
   }
   static async deletePersonPhoto(id: string): Promise<AxiosResponse> {
      return $api.delete(`api/person/profile-photo/${id}`);
   }
   static async changePersonContact(
      id: string,
      contact: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`api/person/edit/contact/`, {
         id,
         contact,
      });
   }
   static async changePersonDateOfBirth(
      id: string,
      dateOfBirth: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`api/person/edit/date-of-birth/`, {
         id,
         dateOfBirth,
      });
   }
   static async changePersonDesc(
      id: string,
      desc: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`api/person/edit/description/`, {
         id,
         desc,
      });
   }
   static async changePersonGender(
      id: string,
      gender: 'FEMALE' | 'MALE',
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`api/person/edit/gender/`, {
         id,
         gender,
      });
   }
   static async changePersonName(
      id: string,
      name: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`api/person/edit/name/`, {
         id,
         name,
      });
   }
   static async changePersonPassword(
      id: string,
      password: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`api/person/edit/password/`, {
         id,
         password,
      });
   }
   static async changePersonUsername(
      id: string,
      username: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`api/person/edit/username/`, {
         id,
         username,
      });
   }

   static async addModeration(personId: string): Promise<AxiosResponse> {
      return $api.post('api/person/moderation/add/', { personId });
   }
   static async removeModeration(
      personId: string,
   ): Promise<AxiosResponse<IUser[]>> {
      return $api.post<IUser[]>(`api/person/moderation/remove`, {
         personId,
      });
   }
   static async getAllModerations(id: string): Promise<AxiosResponse<IUser[]>> {
      return $api.get<IUser[]>(`api/person/moderation/all/${id}`);
   }
}
