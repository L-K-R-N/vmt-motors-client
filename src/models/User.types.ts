export interface IUser {
   id: string;
   username?: string;
   gender?: 'FEMALE' | 'MALE';
   phoneNumber: string;
   dateOfBirth: string;
   name?: string;
   email: string;
   desc?: string;
   contact?: string;
   status?: string;
   banned?: boolean;
   hasProfilePhoto?: boolean;
}
