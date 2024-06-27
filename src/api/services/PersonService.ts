import { AxiosResponse } from 'axios';
import $api from '../public.api';
import { IStatusResponse, IUser } from '../models/Person';

export default class PersonService {
   static async getMe(): Promise<AxiosResponse<IUser>> {
      return $api.get<IUser>('person/me');
   }
   static async getPerson(id: string): Promise<AxiosResponse<IUser>> {
      return $api.get<IUser>(`person`, {
         params: {
            personId: id,
         },
      });
   }
   static async getPersonByUsername(
      username: string,
   ): Promise<AxiosResponse<IUser>> {
      return $api.get<IUser>(`person/by-username`, {
         params: {
            username,
         },
      });
   }
   static async getAllPersons(
      personIds: string[],
   ): Promise<AxiosResponse<IUser[]>> {
      return $api.get<IUser[]>(`person/all?personIds=${personIds}`, {
         // params: {
         //    personIds: personIds,
         // },
      });
   }

   static async getStatus(id: string): Promise<AxiosResponse<IStatusResponse>> {
      return $api.get<IStatusResponse>(`person/status/${id}`);
   }
   static async getStatusCurrent(
      id: string,
   ): Promise<AxiosResponse<IStatusResponse>> {
      return $api.get<IStatusResponse>(`person/current/${id}`);
   }
   static async getPersonStatusSelected(
      id: string,
   ): Promise<AxiosResponse<IStatusResponse>> {
      return $api.get<IStatusResponse>(`person/status/selected/${id}`);
   }

   static async managePerson(
      type: 'ban' | 'unban',
      personId: string,
   ): Promise<AxiosResponse<IUser>> {
      return $api.post<IUser>(`person/ban/${type}`, {
         personId,
      });
   }
   static async unbanPerson(id: string): Promise<AxiosResponse> {
      return $api.post<IUser>('person/ban/unban/`', {
         id,
      });
   }

   static async changePersonPhoto(photo: FormData): Promise<AxiosResponse> {
      return $api.post(
         `person/profile_photo`,
         {
            file: photo,
         },
         {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         },
      );
   }
   static async getPersonPhoto(data: {
      id: string;
   }): Promise<AxiosResponse<string>> {
      return $api.get<string>(`person/profile_photo`, {
         params: {
            personId: data.id,
         },
      });
   }
   static async deletePersonPhoto(): Promise<AxiosResponse> {
      return $api.delete(`person/profile_photo`);
   }
   static async changePersonContact(
      contact: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/contact`, {
         contact,
      });
   }
   static async changePersonDateOfBirth(
      dateOfBirth: Date,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/date-of-birth/`, {
         dateOfBirth,
      });
   }
   static async changePersonDesc(
      description: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/description`, {
         description,
      });
   }
   static async changePersonGender(
      gender: 'FEMALE' | 'MALE',
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/gender`, {
         gender,
      });
   }
   static async changePersonStatus(
      gender: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/status/`, {
         gender,
      });
   }
   static async changePersonName(name: string): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/name`, {
         name,
      });
   }
   static async changePersonPassword(
      password: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/password/`, {
         password,
      });
   }
   static async changePersonUsername(
      username: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/username/`, {
         username,
      });
   }

   static async toggleRole(
      type: 'add' | 'remove',
      personId: string,
   ): Promise<AxiosResponse> {
      return $api.post(`person/moderation/${type}`, { personId });
   }
   static async removeModeration(
      personId: string,
   ): Promise<AxiosResponse<IUser[]>> {
      return $api.post<IUser[]>(`person/moderation/remove`, {
         personId,
      });
   }
   static async getAllModerators(): Promise<AxiosResponse<IUser[]>> {
      return $api.get<IUser[]>(`person/moderation/all`);
   }
   static async searchUsersByUsername(
      username: string,
   ): Promise<AxiosResponse<IUser[]>> {
      return $api.get<IUser[]>(`person/all`, {
         params: {
            username,
         },
      });
   }
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.vars';

// Define a service using a base URL and expected endpoints
export const personApi = createApi({
   reducerPath: 'personApi',
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers, { getState }) => {
         headers.set('Access-Control-Allow-Origin', '*');
         headers.set(
            'Authorization',
            `Bearer ${localStorage.getItem('token')}`,
         );
         return headers;
      },
   }),
   endpoints: (builder) => ({
      getMe: builder.query<IUser, void>({
         query: () => `person/me`,
      }),
   }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMeQuery } = personApi;
