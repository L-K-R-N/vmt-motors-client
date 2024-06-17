import PersonService from '../services/PersonService';
import { setMe } from '@/store/reducers/UserSlice';
import { AppDispatch } from '@/store';

export const handleGetMe = async (dispatch: AppDispatch) => {
   try {
      const response = await PersonService.getMe();

      console.log(response);
      dispatch(setMe(response.data));
   } catch (e) {
      console.log(e);
   }
};
