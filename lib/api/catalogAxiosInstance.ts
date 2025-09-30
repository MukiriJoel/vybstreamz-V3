import axios from "axios";
// import {store} from "@/store/store";
import { getDeviceID, getDeviceInfo } from "../helpers/deviceInfo";
import {store} from "@/store";
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

// Create Axios instance
const catalogAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CATALOG_API_BASE_URL,
    withCredentials: true,
    headers: {
        // "Content-Type": "application/json",
        // "X-PLATFORM-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
        // "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
        // "X-PLATFORM": process.env.NEXT_PUBLIC_X_PLATFORM,
    },
});

// Request Interceptor (Attach token)
catalogAxiosInstance.interceptors.request.use(
    async (config: any) => {
        const username = process.env.NEXT_PUBLIC_CATALOG_API_USERNAME;
        const password = process.env.NEXT_PUBLIC_CATALOG_API_PASSWORD;
        const state = store.getState();
        console.log(state)
        const token = state.auth.token;// Fetch token from Redux Persist
        // const profileId = state.auth?.activeProfile?.id;// Fetch token from Redux Persist
        const deviceHeaders = await getDeviceInfo();
        const profileId = state.auth?.userProfiles?.[0]?.id;
        const user = state.auth.user; 
        // const deviceHeaders = await getDeviceInfo();

         if (username && password) {
            const credentials = btoa(`${username}:${password}`);
            config.headers.Authorization = `Basic ${credentials}`;
            config.headers["X-Source-CountryCode"]='KE';
            config.headers["X-Source-Operator"]='mysafaricom';
            config.headers["X-Source-Division"]='DE';
            config.headers["X-Source-System"]='web-portal';
            config.headers["X-Source-Timestamp"]=uuidv1();
            config.headers["X-Correlation-ConversationID"]=uuidv4();
            config.headers["X-MessageID"]=uuidv4();
            config.headers["X-DeviceInfo"]=uuidv4();
            config.headers["X-DeviceToken"]='ks%rrR+SJ5&CXP3j';
            config.headers["X-DeviceToken"]=uuidv4();
            config.headers["x-identity"]='development'
            config.headers["X-App"]='web-portal';
            config.headers["x-api-key"]='OWqwCWWp1w9FlWBWUOnOv5F5hLmWDdQs7rvS9IsS';
            config.headers["X-Version"]='1'
            config.headers["X-MSISDN"]='254722002200'
            config.headers["X-DeviceId"]=getDeviceID();
            config.headers["Accept"]='*/*'
        }

        if (token) {
            // config.headers.Authorization = `Bearer ${token}`;
            // config.headers["X-PROFILE-ID"] = profileId;
        }
      

        config.headers = {
            ...config.headers,
            // ...deviceHeaders
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Global error handling)
catalogAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default catalogAxiosInstance;
