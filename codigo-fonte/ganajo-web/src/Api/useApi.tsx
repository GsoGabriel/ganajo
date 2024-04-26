import { useState, useEffect } from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import { toast } from "react-toastify";

export function useApi<T>(options?: AxiosRequestConfig){
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        
        try {
            const response: AxiosResponse<T> = await axios(options?.url ?? '', options);
            setData(response.data);
        } catch(error){
            console.log(error)
            if (axios.isAxiosError(error)) {
                toast.error(error.message, {
                  toastId: 'useProductsId',
                  position: 'top-right',
                  autoClose: false,
                });
            }
            setError(error);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return {data, isLoading, error}
};
