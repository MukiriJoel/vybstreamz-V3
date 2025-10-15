import { createAsyncThunk } from "@reduxjs/toolkit";
import axios,{AxiosError} from "axios";
import {v4 as uuidv4} from "uuid";
import catalogAxiosInstance from "@/lib/api/catalogAxiosInstance";
import {store} from "@/store"; 
import { getDeviceInfo } from "@/lib/helpers/deviceInfo";
import { formatApiError, formatApiErrorWithStatusCode } from "@/lib/helpers/formatApiError";
import { setCatalog, setMusicHome, setPartners, setTopBarContent, setUserInterests, setVideoHome } from "../slices/catalogSlice";
import { objectToQueryString } from "@/lib/api/fetcher";
import { useCatalogData } from "@/lib/hooks/useCatalogData";

interface DefaultCatalogParams{
    genre_id?:string
}

interface OptionalParams {
    id?: any;
    // sort?: string;
    // search?: string;
    // category?: string;
    // language?: string;
    // items_limit?: any;
    // add other optional params as needed
}

// GET GENRES
export const  getListInterests = createAsyncThunk(
    "catalog/getListInterests",
    async(_,{dispatch,rejectWithValue})=>{
        try{
            const res=await catalogAxiosInstance.get("/genres");
           
            return res?.data?.body;
        }catch(error:any){
            return rejectWithValue(formatApiError(error.response?.data || "Fetching failed"))
        }
    }
)

// export const getListInterests=(payload?:any)=>{
//      const url = payload ? `/genres?${objectToQueryString(payload)}` : `/genres`;
//     const {data, isLoading, isError, error} = useCatalogData<any>(url);
//      return {data: data?.data || [], isLoading, isError, error};
// }

// ADD USER INTEREST
export const addUserInterests=createAsyncThunk(
    "catalog/addUserInterests",
    async (payload:{userId:any,genres:any},{dispatch,rejectWithValue})=>{
        console.log("payload",payload)
        try{
            const res = await catalogAxiosInstance.post(`/genres/user-interests`,{
                "userId":payload?.userId,
                "genres":payload?.genres
            });
            console.log("resData",res)
            dispatch(setUserInterests(res?.data?.body))
            return res?.data;
        }catch(error:any){
            console.log(error);
            return rejectWithValue(formatApiError(error.response?.data) || "Add to library failed");
        }
    }
);

// UPDATE USER INTEREST
export const updateUserInterests=createAsyncThunk(
    "catalog/addUserInterests",
    async (payload:{userId:any,genres:any},{dispatch,rejectWithValue})=>{
        console.log("payload",payload)
        try{
            const res = await catalogAxiosInstance.put(`/genres/user-interests`,{
                "userId":payload?.userId,
                "genres":payload?.genres
            });
            dispatch(setUserInterests(res?.data?.body))
            return res?.data;
        }catch(error:any){
            console.log(error);
            return rejectWithValue(formatApiError(error.response?.data) || "Add to library failed");
        }
    }
);

// GET TOP BAR CONTENT
export const getTopBarContent=createAsyncThunk(
    "catalog/getTopBarContent",
    async(_,{dispatch,rejectWithValue})=>{
        try{
            const res= await catalogAxiosInstance.get(`/catalog/top-bar?maxLimit=3&content-type=Video`);
            dispatch(setTopBarContent(res?.data?.body))
            console.log("res",res)
            return res?.data
        }catch(error:any){
            return rejectWithValue(formatApiError(error.response?.data || "Fetching failed"))
        }
    }
)

// GET CATALOG CONTENT
export const getHomePage=createAsyncThunk(
    "catalog/getHomePage",
    async(_,{dispatch,rejectWithValue})=>{
        try{
            const res= await catalogAxiosInstance.get(`/home-page`);
            console.log("resHome",res)
            dispatch(setCatalog(res?.data?.body))
            return res?.data
        }catch(error:any){
            return rejectWithValue(formatApiError(error.response?.data || "Fetching failed"))
        }
    }
)

// 🔹 GET  HOME
// export const useDataGetHome = (payload?: any) => {
//     const url = `/home-page`;
//     const {data, isLoading, isError, error} = useCatalogData<any>(url);
//     // const res = await catalogAxiosInstance.get(`/music/home`, {params: payload});
//     return {data: data?.body || [], isLoading, isError, error};
// }



// GET VIDEO HOME
export const getVideoHome=createAsyncThunk(
    "catalog/getVideoHome",
    async(_,{dispatch,rejectWithValue})=>{
        try{
            const res= await catalogAxiosInstance.get(`/content-page?category=Video`);
            dispatch(setVideoHome(res?.data?.body))
            return res?.data
        }catch(error:any){
            return rejectWithValue(formatApiError(error.response?.data || "Fetching failed"))
        }
    }
)


// GET MUSIC HOME
export const getMusicHome=createAsyncThunk(
    "catalog/getMusicHome",
    async(_,{dispatch,rejectWithValue})=>{
        try{
            const res= await catalogAxiosInstance.get(`/catalog?content_type=Music`);
            dispatch(setMusicHome(res?.data?.body))
            return res?.data
        }catch(error:any){
            return rejectWithValue(formatApiError(error.response?.data || "Fetching failed"))
        }
    }
)

// GET PARTNERS
export const getPartners=createAsyncThunk(
    "catalog/getPartners",
    async(_,{dispatch,rejectWithValue})=>{
        try{
            const res= await catalogAxiosInstance.get(`/partners`);
            
            dispatch(setPartners(res?.data?.body))
            return res?.data
        }catch(error:any){
            return rejectWithValue(formatApiError(error.response?.data || "Fetching failed"))
        }
    }
)

// 🔹 GET PARTNER BY ID
export const getPartnerById = createAsyncThunk(
    "catalog/getPartnerById",
    async (id: OptionalParams, {dispatch, rejectWithValue}) => {

        try {
            const res = await catalogAxiosInstance.get(`/partner-details?cspid=${id}`);
            // dispatch(setTVChannels(res?.data?.data))
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(formatApiError(error.response?.data) || "Fetching failed");
        }
    }
);
