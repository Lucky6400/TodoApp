import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./taskSlice";
import { persistStore, persistReducer,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settingsReducer } from "./settingsSlice";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, taskReducer)
const persistedSettings = persistReducer(persistConfig, settingsReducer);

export const store = configureStore({
    reducer: {
        taskReducer: persistedReducer,
        settingsReducer: persistedSettings
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)