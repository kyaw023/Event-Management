import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ApiService } from "./services/ApiService";
import authSlice from "./slice/auth/auth.slice";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  [ApiService.reducerPath]: ApiService.reducer,
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage: storage as any,
  version: 1,
  whitelist: ["auth"],
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ApiService.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
