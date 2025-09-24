import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser,
    setRegistrationState,
    setUserProfiles,
    setActiveProfile,
    setLoading,
    logout,
    setToken,
    setHEData
} from "@/store/slices/authSlice"
import { ILogin,IRegister, IUpdatePhone } from "../types/auth";
import { formatApiError, formatApiErrorWithStatusCode } from "@/lib/helpers/formatApiError";
import authAxiosInstance from "@/lib/api/authAxiosInstance";
import axios,{AxiosError} from "axios";
import {v4 as uuidv4} from "uuid";
import {store} from "@/store"; 
import { getDeviceInfo } from "@/lib/helpers/deviceInfo";
import {signInWithPopup, signOut} from "firebase/auth"
import {appleProvider, auth, facebookProvider, googleProvider} from "@/lib/firebase";

interface IVerifyOTP {
    request_token: string,
    code: string
}

export interface IAccount {
    name: string,
    email?: string,
    phone?: string,
    phone_code?: string,
}


export const signupUser = createAsyncThunk(
    "auth/signup",
    async(payload:IRegister,{dispatch,rejectWithValue})=>{
        try{
            const res=await authAxiosInstance.post("/auth/register/", payload);
            dispatch(setRegistrationState(res?.data?.data))
            return res?.data;

        }catch(error:any){
              return rejectWithValue(formatApiError(error.response?.data) || "Signup failed");
        }
    }
)

// 🔹 VERIFY OTP
export const verifyOTP = createAsyncThunk<any, IVerifyOTP>(
    "auth/verifyOTP",
    async (payload: IVerifyOTP, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setToken(""));
            const res = await authAxiosInstance.post("/auth/verify-otp", payload);
            dispatch(setToken(res?.data?.data?.access_token));
            dispatch(setUser(res?.data?.data));
            dispatch(setUserProfiles(res?.data?.data?.profiles));
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "OTP request failed");
        }
    }
);

// 🔹 RESEND OTP
export const resendOTP = createAsyncThunk<any, any>(
    "auth/resendOTP",
    async (payload, {dispatch, rejectWithValue}) => {
        try {
            const res = await authAxiosInstance.post("/auth/resend-otp", {request_token: payload});
            dispatch(setRegistrationState(res?.data?.data))
            return res?.data;
        } catch (error: any) {
            // console.log(error)
            // console.log(mockRes?.data)
            // dispatch(setRegistrationState(mockRes?.data))
            return rejectWithValue(formatApiError(error.response?.data) || "OTP request failed");
        }
    }
);

// 🔹 LOGIN
export const loginUser = createAsyncThunk(
    "auth/login",
    async (payload: ILogin, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoading(true))
            const res = await authAxiosInstance.post("/auth/login", payload);
            const data = res?.data?.data;

            if (data?.code == 1000) {
                dispatch(setRegistrationState(res?.data?.data));
            } else {
                dispatch(setToken(data?.access_token));
                dispatch(setUser(data));
                dispatch(setUserProfiles(data?.profiles));
            }
            return res;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "Login failed");
        } finally {
            dispatch(setLoading(false))
        }
    }
);


// 🔹 LOGOUT
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (payload: { login_session_id: string }, {dispatch, rejectWithValue}) => {
        try {
           
            const res = await authAxiosInstance.post("/auth/logout", payload);
            // dispatch(setRegistrationState(res?.data?.data))
            // localStorage.removeItem("token"); // Remove token
            dispatch(logout());
            return res?.data;
        } catch (error: any) {
            dispatch(logout());
            // console.log(error)
            // console.log(mockRes?.data)
            // dispatch(setRegistrationState(mockRes?.data))
            return rejectWithValue(error.response?.data || "Could not log you out");
        }
    }
);

// 🔹 FORGOT PASSWORD
export const requestPasswordResetToken = createAsyncThunk(
    "auth/forgot-password",
    async (payload: { username: string }, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoading(true))
            const res = await authAxiosInstance.post("/auth/forgot-password", payload);
            const data = res?.data?.data;
            dispatch(setUser(data));
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "Password reset failed");
        } finally {
            dispatch(setLoading(false))
        }
    }
);

// 🔹 resetPassword OTP
export const resetPassword = createAsyncThunk(
    "auth/reset-password",
    async (payload: {
        "newPassword": "string",
        "confirmPassword": "string",
        "login_session_id": "string"
    }, {dispatch, rejectWithValue}) => {
        try {
            const res = await authAxiosInstance.post("/user/reset-password", payload);
            // dispatch(setRegistrationState(res?.data?.data))
            const data = res?.data?.data;
            dispatch(setToken(data?.access_token));
            dispatch(setUser(data));
            dispatch(setUserProfiles(data?.profiles));
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "OTP request failed");
        }
    }
);

// 🔹 SET PHONE
export const updatePhoneFirebase = createAsyncThunk(
    "user/updatePhoneFirebase",
    async (payload: IUpdatePhone, {dispatch, rejectWithValue}) => {

        try {
            const res = await authAxiosInstance.post("/auth/firebase/update-phone", payload);
            // dispatch(setRegistrationState(res?.data?.data))
            // console.log(res?.data)
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(error || "Signup failed");
        }
    }
);

// 🔹 GET ENCRYPTED MSISDN
export const getEncryptedMSISDN = createAsyncThunk(
    "auth/getEncryptedMSISDN",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const state = store.getState();
            const token = state.auth?.HEData?.access_token;
            const HEData = state.auth?.HEData;
            const identityPath = process.env.NEXT_PUBLIC_IDENTITY_SAF as string || "https://identity.safaricom.com/partner/api/v3/fetchMaskedMsisdn";
            
            if (!token) return rejectWithValue("Token not found");
            const res = await axios.get(
                identityPath,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "X-Source-System": "he-partner",
                        "x-messageid": "cms-" + uuidv4(),
                        "X-App": "he-partner"
                    },
                }
            );
            const data = res?.data?.ServiceResponse?.ResponseBody?.Response?.Msisdn;
            dispatch(setHEData({...HEData, msisdn: data}));
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiErrorWithStatusCode(error?.response) || "HE Failed");
        } finally {
            dispatch(setLoading(false))
        }
    }
);

// 🔹 GET HEADER ENRICHMENT TOKEN
export const getHEToken = createAsyncThunk(
    "auth/HeaderEnrichment",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoading(true))
            const res = await authAxiosInstance.post("/he/token");
            const data = res?.data?.data;
            dispatch(setHEData(data));
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "HE Failed");
        } finally {
            dispatch(setLoading(false))
        }
    }
);

// 🔹 GET HE CUSTOMER DETAILS
export const getHECustomerDetails = createAsyncThunk(
    "auth/HeaderEnrichment",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoading(true))
            const res = await authAxiosInstance.post("/he/customer-details", {request_id: uuidv4()});
            const userData = res.data?.data;
            // dispatch(setToken(data?.access_token));
            // dispatch(setUser(data));
            dispatch(setUserProfiles(userData?.profiles));
            dispatch(setUser(userData));
            dispatch(setToken(userData.access_token));
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "HE Failed");
        } finally {
            dispatch(setLoading(false))
        }
    }
);


// 🔹 AUTHENTICATE WITH GOOGLE
export const signInWithGoogle = createAsyncThunk(
    "auth/signInWithGoogle",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();
            const deviceInfo = await getDeviceInfo();

            const response = await axios.post(
                process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/firebase/authenticate" as string,
                {
                    platform: process.env.NEXT_PUBLIC_X_PLATFORM,

                },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        // "Content-Type": "application/json",
                        // "X-PLATFORM-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
                        // "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
                        // "X-PLATFORM": process.env.NEXT_PUBLIC_X_PLATFORM,
                        "X-AUTH-PROVIDER": "firebase",
                        ...deviceInfo
                    },
                }
            );

            if (response.status === 200) {
                const userData = response.data?.data;
                // dispatch(setToken(data?.access_token));
                // dispatch(setUser(data));
                dispatch(setUserProfiles(userData?.profiles));
                dispatch(setUser(userData));
                dispatch(setToken(userData.access_token));
            } else {
                throw new Error(response.data.message || "Login failed");
            }

            return response?.data;
        } catch (error: AxiosError | any) {
            console.log(error)
            return rejectWithValue(formatApiError(error.response?.data) || "Error with google login");
        }
    }
);


// 🔹 AUTHENTICATE WITH FACEBOOK
export const authenticateWithFacebook = createAsyncThunk(
    "auth/authenticateWithFacebook",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const idToken = await result.user.getIdToken();
            const deviceInfo = await getDeviceInfo();
            const response = await axios.post(
                process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/firebase/authenticate" as string,
                {
                    platform: process.env.NEXT_PUBLIC_X_PLATFORM,
                    ...deviceInfo
                },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        "Content-Type": "application/json",
                        // "X-PLATFORM-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
                        "X-PLATFORM": process.env.NEXT_PUBLIC_X_PLATFORM,
                        "X-AUTH-PROVIDER": "firebase",
                        ...deviceInfo
                    },
                }
            );

            console.log(response)

            if (response.status === 200) {
                const userData = response.data;
            } else {
                throw new Error(response.data.message || "Login failed");
            }

            return response?.data;
        } catch (error: AxiosError | any) {
            console.log(error)
            return rejectWithValue(formatApiError(error.response?.data) || "Error with google login");
        }
    }
);

// 🔹 AUTHENTICATE WITH APPLE
export const authenticateWithApple = createAsyncThunk(
    "auth/authenticateWithApple",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const result = await signInWithPopup(auth, appleProvider);
            const idToken = await result.user.getIdToken();
            const deviceInfo = await getDeviceInfo();
            const response = await axios.post(
                process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/firebase/authenticate" as string,
                {
                    platform: process.env.NEXT_PUBLIC_X_PLATFORM,
                    ...deviceInfo
                },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        // "Content-Type": "application/json",
                        // "X-PLATFORM-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
                        // "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
                        // "X-PLATFORM": process.env.NEXT_PUBLIC_X_PLATFORM,
                        "X-AUTH-PROVIDER": "firebase",
                        ...deviceInfo
                    },
                }
            );

            console.log(response)

            if (response.status === 200) {
                const userData = response.data;
            } else {
                throw new Error(response.data.message || "Login failed");
            }

            return response?.data;
        } catch (error: AxiosError | any) {
            console.log(error)
            return rejectWithValue(formatApiError(error.response?.data) || "Error with google login");
        }
    }
);

// 🔹 LOGOUT GOOGLE
export const logoutSocial = createAsyncThunk(
    "auth/logout",
    async (_, {dispatch}) => {
        await signOut(auth);
        dispatch(logout());
        return null;
    }
);


// 🔹 REQUEST OTP
export const requestOTP = createAsyncThunk(
    "auth/requestOTP",
    async (payload: { purpose?: any }, {dispatch, rejectWithValue}) => {
        try {
            const res = await authAxiosInstance.post("/user/request-otp", payload);
            // dispatch(setRegistrationState(res?.data?.data))
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "OTP request failed");
        }
    }
);

// 🔹 UPDATE ACCOUNT
export const updateAccount = createAsyncThunk(
    "auth/updateAccount",
    async (payload: any, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoading(true))
            const res = await authAxiosInstance.post("/user/update-account", payload);
            const data = res?.data?.data;
            dispatch(setUser(data));
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "Login failed");
        } finally {
            dispatch(setLoading(false))
        }
    }
);


