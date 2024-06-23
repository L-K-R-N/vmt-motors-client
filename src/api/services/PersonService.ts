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
      return $api.get<IUser>(`person/by-username${username}`);
   }
   static async getAllPersons(
      personIds: string[],
   ): Promise<AxiosResponse<IUser[]>> {
      return $api.get<IUser[]>('person/all', {
         params: {
            personIds,
         },
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

   static async banPerson(id: string): Promise<AxiosResponse<IUser>> {
      return $api.post<IUser>(`person/ban/ban/${id}`, {
         id,
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
      id: string,
      contact: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/contact/`, {
         id,
         contact,
      });
   }
   static async changePersonDateOfBirth(
      id: string,
      dateOfBirth: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/date-of-birth/`, {
         id,
         dateOfBirth,
      });
   }
   static async changePersonDesc(
      id: string,
      desc: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/description/`, {
         id,
         desc,
      });
   }
   static async changePersonGender(
      id: string,
      gender: 'FEMALE' | 'MALE',
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/gender/`, {
         id,
         gender,
      });
   }
   static async changePersonName(
      id: string,
      name: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/name/`, {
         id,
         name,
      });
   }
   static async changePersonPassword(
      id: string,
      password: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/password/`, {
         id,
         password,
      });
   }
   static async changePersonUsername(
      id: string,
      username: string,
   ): Promise<AxiosResponse<string>> {
      return $api.post<string>(`person/edit/username/`, {
         id,
         username,
      });
   }

   static async addModeration(personId: string): Promise<AxiosResponse> {
      return $api.post('person/moderation/add/', { personId });
   }
   static async removeModeration(
      personId: string,
   ): Promise<AxiosResponse<IUser[]>> {
      return $api.post<IUser[]>(`person/moderation/remove`, {
         personId,
      });
   }
   static async getAllModerations(id: string): Promise<AxiosResponse<IUser[]>> {
      return $api.get<IUser[]>(`person/moderation/all/${id}`);
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
