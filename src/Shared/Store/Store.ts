import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import systemReducer from '../System/State/SystemReducers';
import { persistConfig } from './StoreConfig';

const systemReducers = combineReducers({
  System: systemReducer,
});

const persistedReducer = persistReducer(persistConfig, systemReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
