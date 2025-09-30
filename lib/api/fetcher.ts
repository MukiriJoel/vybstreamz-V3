import catalogAxiosInstance from "./catalogAxiosInstance";
import axios from "axios";
import authAxiosInstance from "./authAxiosInstance";


export const fetcher = async (url: string) => {
    const res = await axios.get(url);
    console.log(res)
    return res.data;
};

export const authFetcher = async (url: string) => {
    const response = await authAxiosInstance.get(url);
    return response.data;
};

export const catalogFetcher = async (url: string) => {
    const response = await catalogAxiosInstance.get(url);
    return response.data;
};

export const objectToQueryString = (obj: any) => {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
};
