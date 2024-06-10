import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/models/User.types';
import PersonService from '@/api/services/PersonService';

export interface IUserState {
   me: IUser | null;
}

const initialState: IUserState = {
   me: null,
};

interface IChangePhoto {
   type: 'delete' | 'post';
   id: string;
   photo?: string;
}
interface IChangeContact {
   id: string;
   contact: string;
}
interface IChangePhoto {
   id: string;
   photo?: string;
}
interface IChangePhoto {
   id: string;
   photo?: string;
}
interface IChangePhoto {
   id: string;
   photo?: string;
}
interface IChangePhoto {
   id: string;
   photo?: string;
}

type TGender = 'MALE' | 'FEMALE';
export const getMe = createAction<void, 'person/me'>('person/me');
export const getPerson = createAction<
   { id?: string; username?: string },
   'person/get'
>('person/get');
export const getAllPersons = createAction<'person/all'>('person/all');
export const changePersonPhoto = createAction<
   IChangePhoto,
   'person/changePhoto'
>('person/changePhoto');
export const changePersonContact = createAction<
   {
      contact: string;
      id: string;
   },
   'person/changeContact'
>('person/changeContact');
export const changePersonDateOfBirth = createAction<
   {
      dateOfBirth: string;
      id: string;
   },
   'person/changeDateOfBirth'
>('person/changeDateOfBirth');
export const changePersonDesc = createAction<
   {
      desc: string;
      id: string;
   },
   'person/changeDesc'
>('person/changeDesc');
export const changePersonGender = createAction<
   {
      gender: TGender;
      id: string;
   },
   'person/changeGender'
>('person/changeGender');
export const changePersonName = createAction<
   {
      name: string;
      id: string;
   },
   'person/changeName'
>('person/changeName');
export const changePersonPassword = createAction<
   {
      password: string;
      id: string;
   },
   'person/changePassword'
>('person/changePassword');
export const changePersonUsername = createAction<
   {
      username: string;
      id: string;
   },
   'person/changeUsername'
>('person/changeUsername');

export const UserSlice = createSlice({
   name: 'UserSlice',
   initialState,
   reducers: {
      setMe: (state, action: PayloadAction<IUser>) => {
         state.me = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getMe, () => {
         try {
            (async function () {
               const response = await PersonService.getMe();

               if (response.status !== 200) return;

               setMe(response.data);
            })();
         } catch (e) {
            console.log(e);
         }
      });

      builder.addCase(
         getPerson,
         (state, action: PayloadAction<{ id?: string; username?: string }>) => {
            try {
               (async function () {
                  const { id, username } = action.payload;

                  if (id) {
                     const response = await PersonService.getPerson(id);

                     if (response.status !== 200) return;

                     return response.data;
                  }
                  if (username) {
                     const response =
                        await PersonService.getPersonByUsername(username);

                     if (response.status !== 200) return;

                     return response.data;
                  }
               })();
            } catch (e) {
               console.log(e);
            }
         },
      );

      builder.addCase(getAllPersons, () => {
         try {
            (async function () {
               const response = await PersonService.getAllPersons();

               if (response.status !== 200) return;

               return response.data;
            })();
         } catch (e) {
            console.log(e);
         }
      });

      builder.addCase(
         changePersonPhoto,
         (state, action: PayloadAction<IChangePhoto>) => {
            try {
               (async function () {
                  const { type, photo, id } = action.payload;

                  switch (type) {
                     case 'post':
                        await PersonService.changePersonPhoto(id, photo || '');
                        break;
                     case 'delete':
                        await PersonService.deletePersonPhoto(id);
                        break;
                  }
               })();
            } catch (e) {
               console.log(e);
            }
         },
      );

      builder.addCase(
         changePersonContact,
         (state, action: PayloadAction<IChangeContact>) => {
            try {
               (async function () {
                  const { contact, id } = action.payload;

                  await PersonService.changePersonContact(id, contact);
               })();
            } catch (e) {
               console.log(e);
            }
         },
      );
   },
});

export default UserSlice.reducer;

export const { setMe } = UserSlice.actions;
