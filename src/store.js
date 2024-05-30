import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { storage } from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit/dist";

import { todoReducer } from "./features/Todos/todo-slice";
import { filterReducer } from "./features/Filters/filter-slice";

const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
