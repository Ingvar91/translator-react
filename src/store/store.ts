import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TranslateAPI } from '../services/TranslateService';

const rootReducer = combineReducers({
  [TranslateAPI.reducerPath]: TranslateAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(TranslateAPI.middleware),
  });
};
