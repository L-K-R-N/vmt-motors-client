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
   dateOfBirth: Date;
   roles: string[];
   name?: string;
   status?: 'ONLINE' |'NOT_DISTURB' |'NOT_ACTIVE' |'INVISIBLE',
   hasProfilePhoto?: boolean;
}
