import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import themeReducer from '@/store/slices/themeSlice'
import authReducer from '@/store/slices/authSlice'
import configReducer from "@/store/slices/configSlice"

const themePersistConfig ={
    key:'theme',
    storage,
    whitelist:['theme']
}

const authPersistConfig ={
    key:'auth',
    storage,
    whitelist:['auth']
}

const configPersistConfig = {
    key: "configs",
    storage,
     whitelist:['configs'],
};

const persistedThemeReducer = persistReducer(themePersistConfig,themeReducer)
const persistedAuthReducer = persistReducer(authPersistConfig,authReducer)
const persistedConfigReducer = persistReducer(configPersistConfig, configReducer);

export const store = configureStore({
    reducer:{
        auth:persistedAuthReducer,
        theme:persistedThemeReducer,
        configs:persistedConfigReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:['persist/PERSIST','persist/REHYDRATE']
        }
    })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch