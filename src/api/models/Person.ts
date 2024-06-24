export interface IStatusResponse {
   personId: string;
   status: string;
}

export interface IUser {
   id: string;
   username: string;
   gender?: 'FEMALE' | 'MALE';
   phoneNumber?: string;
   banned?: boolean;
   description?: string;
   email: string;
   contact?: string;
   dateOfBirth: string;
   roles: string[];
   name?: string;
   status?: string;
   hasProfilePhoto?: boolean;
}
