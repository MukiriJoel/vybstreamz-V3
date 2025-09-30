import useSWR from "swr";
import { catalogFetcher } from "../api/fetcher";

export function useCatalogData<T>(url: string | null) {
    const {data, error, isLoading, mutate} = useSWR<T>(url, catalogFetcher);

    return {
        data,
        isLoading,
        isError: !!error,
        error,
        mutate,
    };
}
