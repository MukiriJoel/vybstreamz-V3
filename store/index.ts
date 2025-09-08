import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import themeReducer from '@/store/slices/themeSlice'

const themePersistConfig ={
    key:'theme',
    storage,
    whitelist:['theme']
}

const persistedThemeReducer = persistReducer(themePersistConfig,themeReducer)

export const store = configureStore({
    reducer:{
        theme:persistedThemeReducer
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