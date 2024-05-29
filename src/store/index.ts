import { combineReducers } from 'redux';
// import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './reducers/ProductsSlice';
import UserReducer from './reducers/UserSlice';
import AuthReducer from './reducers/AuthSlice';
import CartReducer from './reducers/CartSlice';
import LayoutReducer from './reducers/LayoutSlice';
import RoutesReducer from './reducers/RoutesSlice';
import storage from 'redux-persist/lib/storage';

// export const store = createStore(rootReducer)
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
   ProductsReducer,
   UserReducer,
   AuthReducer,
   LayoutReducer,
   RoutesReducer,
   CartReducer,
});

const persistConfig = {
   key: 'root',
   storage,
   whitelist: [
      'CartReducer',
      'UserReducer',
      'ProductsReducer',
      // 'RoutesReducer',
   ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
