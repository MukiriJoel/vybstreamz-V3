import {createAsyncThunk} from "@reduxjs/toolkit";
import {formatApiError} from "@/lib/helpers/formatApiError";
import { setDeviceInfo } from "../slices/configSlice";
import axios from "axios";
import {store} from "@/store"

export const fetchIPData = createAsyncThunk(
    "config/fetchIPData",
    async (_, {dispatch, rejectWithValue}) => {
        const state = store.getState();
        // const lastUpdated = state.configs.lastUpdated;
        const shouldFetch = true; // 1
        // const shouldFetch = !lastUpdated || (Date.now() - lastUpdated) > parseInt(process.env.NEXT_PUBLIC_CACHE_REVALIDATE_AFTER as string) || (24 * 60 * 60); // 1
        // dispatch(setDeviceInfo(location));

        try {
            if (!shouldFetch) return;
            const res = await axios.get("/api/location");
            dispatch(setDeviceInfo(res?.data));
            return;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "Fetching Configs failed");
        }
    }
);