import { createAsyncThunk } from "@reduxjs/toolkit";
import axios,{AxiosError} from "axios";
import {v4 as uuidv4} from "uuid";
import catalogAxiosInstance from "@/lib/api/catalogAxiosInstance";
import {store} from "@/store"; 
import { getDeviceInfo } from "@/lib/helpers/deviceInfo";
import { formatApiError, formatApiErrorWithStatusCode } from "@/lib/helpers/formatApiError";
import { setTopBarContent, setUserInterests } from "../slices/catalogSlice";
import { objectToQueryString } from "@/lib/api/fetcher";
import { useCatalogData } from "@/lib/hooks/useCatalogData";

interface DefaultCatalogParams{
    genre_id?:string
}

// GET GENRES
export const  getListInterests = createAsyncThunk(
    "catalog/getListInterests",
    async(_,{dispatch,rejectWithValue})=>{
        try{
            const res=await catalogAxiosInstance.get("/genres");
            console.log("resdata",res)
            return res?.data;
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
            dispatch(setUserInterests(res?.data?.data))
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
            dispatch(setUserInterests(res?.data?.data))
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
            const res= await catalogAxiosInstance.get(`/catalog/top-bar?maxLimit=10&content-type=`);
            dispatch(setTopBarContent(res?.data))
            return res?.data
        }catch(error:any){
            return rejectWithValue(formatApiError(error.response?.data || "Fetching failed"))
        }
    }
)

// GET CATALOG CONTENT
export const getCatalog=createAsyncThunk(
    "catalog/getCatalog",
    async(_,{dispatch,rejectWithValue})=>{
        try{
            const res= await catalogAxiosInstance.get(`/catalog`);
            return res?.data
        }catch(error:any){
            return rejectWithValue(formatApiError(error.response?.data || "Fetching failed"))
        }
    }
)