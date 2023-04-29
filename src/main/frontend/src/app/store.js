import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "../features/api/api";
import characterReducer, {
  updateField,
  updatePreference,
} from "../features/character/character";
import rulesReducer, {
  selectSourceCategories,
  selectSources,
} from "features/rules/rules";
import { combineReducers } from "redux";
import auth from "../features/auth/auth";

const rootReducer = combineReducers({
  auth,
  [apiSlice.reducerPath]: apiSlice.reducer,
  character: characterReducer,
  rules: rulesReducer,
});

// modify the 'storage' key to use a different storage engine
// add whitelist or blacklist keys to persist only a subset of the state
const persistConfig = {
  key: "root",
  storage,
};

// this is a persisted version of the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
console.log("Current environment:", process.env.NODE_ENV);
// this includes thunk middleware by default.
export const store = configureStore({
  // use turnary to only persist the store if we are in production
  reducer:
    process.env.NODE_ENV === "development" ? rootReducer : persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
// we must ignore the persist/PERSIST action in the serializableCheck because redux persist is trying to serialize a function for some reason and it makes an error any time it runs.

// this is a persisted version of the store that rehydrates the state on app start
// our store is saved in local storage and will remain after browser refresh
// we only use the persistor in production. In development persisting causes problems with hot reloading.
export const persistor =
  process.env.NODE_ENV === "production" ? persistStore(store) : null;
