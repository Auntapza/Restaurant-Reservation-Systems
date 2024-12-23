import { useEffect, useState } from "react";

interface useFetchDataInterface {
    url: string,
    params?: Record<string, string | number>,
    dependencies?: any[];
}

export default function useFetchData<T>({url, params, dependencies = []}:useFetchDataInterface){

    const [data, setData] = useState<T>();
    const [loader, setLoader] = useState<boolean>(true);

    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>)}`
    : "";

    const apiEndPoint = url + queryString;

    async function fetchData() {
        setLoader(true);
        const res = await fetch(apiEndPoint);
        const data = await res.json();
        setData(data);
        setLoader(false);
    }

    useEffect(() => {
        fetchData();
    }, [url, ...dependencies])

    return { data, loader, fetchData };

}