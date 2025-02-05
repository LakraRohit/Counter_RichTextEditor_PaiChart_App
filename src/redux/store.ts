
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chartReducer from './chartSlice';
import counterSlice from './counterSlice'; 
import userFormSlice from './userFormSlice'; 




const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter', 'userForm'], 
};

const persistedCounterReducer = persistReducer(persistConfig, counterSlice);
const persistedUserFormReducer = persistReducer(persistConfig, userFormSlice);

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    counter: persistedCounterReducer,
    userForm: persistedUserFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],  
      },
    }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
