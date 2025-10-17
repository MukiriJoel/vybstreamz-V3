import axios from "axios";
import { store } from "@/store";
import { getDeviceInfo } from "../helpers/deviceInfo";

const authAxiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials:true,
    headers:{
        //  "Content-Type": "application/json",
        // "X-PLATFORM-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
        // "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
    }
});


// Request Interceptor (Attach token)
authAxiosInstance.interceptors.request.use(
    async (config: any) => {
        const state = store.getState();
        const token = state.auth.token; // Fetch token from Redux Persist
        const user = state.auth.user; // Fetch token from Redux Persist
        const deviceHeaders = await getDeviceInfo();
        // const profileId = state.auth?.activeProfile?.id;
        const profileId = state.auth?.userProfiles?.[0]?.id;
        const msisdn = state.auth?.HEData?.msisdn;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers["X-PROFILE-ID"] = profileId;
            config.headers["Accept"] = "application/json";
            // 🔹 Only set Accept FormData requests
            if (config.data instanceof FormData) {
                console.log("isformdata")
            //      delete config.headers["Content-Type"];
            // delete config.headers["content-type"];
            // delete config.headers.common["Content-Type"];
             }
        }

        if(profileId){
            config.headers["X-PROFILE-ID"] = profileId;
        }

        if (msisdn) {
            // token ? config.headers.Authorization = `Bearer ${token}` : "";
            config.headers["X-PROFILE-ID"] = profileId;
            config.headers["X-MSISDN"] = msisdn;
            config.headers["X-ENCRYPTION"] = "she"
        }

        if (!(config.data instanceof FormData)) {
            config.headers["Content-Type"] = "application/json";
        }


        config.headers = {
            ...config.headers,
            ...deviceHeaders
        }

       

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Global error handling)
authAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // if (error.response?.status === 401) {
        //     console.error("Unauthorized, redirecting...");
        //     window.location.href = "/login";
        // }
        return Promise.reject(error);
    }
);

export default authAxiosInstance;
