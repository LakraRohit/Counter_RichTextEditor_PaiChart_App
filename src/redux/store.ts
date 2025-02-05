// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chartReducer from './chartSlice';
import counterSlice from './counterSlice'; // Adjusted to default export
import userFormSlice from './userFormSlice'; // Adjusted to default export




const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter', 'userForm'],  // Persist counter and user form states
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
        ignoredActions: ['persist/PERSIST'],  // Add any other non-serializable actions
      },
    }),
});

export const persistor = persistStore(store);

// Export RootState type for use in selectors
export type RootState = ReturnType<typeof store.getState>;