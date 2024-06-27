import PersonService from '../services/PersonService';
import { setMe } from '@/store/reducers/UserSlice';
import { AppDispatch, store } from '@/store';

export const handleGetMe = async () => {
   try {
      const response = await PersonService.getMe();

      console.log(response);
      store.dispatch(setMe(response.data));
   } catch (e) {
      console.log(e);
   }
};
