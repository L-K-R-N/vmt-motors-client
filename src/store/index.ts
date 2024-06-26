import { combineReducers } from 'redux';
// import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './reducers/ProductsSlice';
import UserReducer from './reducers/UserSlice';
import AuthReducer from './reducers/AuthSlice';
import CartReducer from './reducers/CartSlice';
import LayoutReducer from './reducers/LayoutSlice';
import FilterReducer from './reducers/FilterSlice';
import SettingsReducer from './reducers/SettingsSlice';
import ChatReducer from './reducers/ChatSlice';
import storage from 'redux-persist/lib/storage';

// export const store = createStore(rootReducer)
import { persistStore, persistReducer } from 'redux-persist';
import { personApi } from '@/api/services/PersonService';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
   ProductsReducer,
   UserReducer,
   AuthReducer,
   LayoutReducer,
   CartReducer,
   FilterReducer,
   SettingsReducer,
   ChatReducer,
});

const persistConfig = {
   key: 'root',
   storage,
   whitelist: [
      // 'CartReducer',
      // 'UserReducer',
      // 'ProductsReducer',
      // 'RoutesReducer',
   ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
