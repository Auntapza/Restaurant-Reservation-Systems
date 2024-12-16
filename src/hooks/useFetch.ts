import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function useFetch<T, >(api: string): [T | any, boolean, () => Promise<void>, number] {

    const [data, setData] = useState<T | object[]>([]);
    const [loader, setLoader] = useState<boolean>(true);
    const [status, setStatus] = useState<number>(0)
  
    const fetchData = async() => {
        setLoader(true);
        const res = await fetch(api)
        const data = await res.json()
        setData(data);
        setLoader(false);
        setStatus(res.status);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return [data, loader, fetchData, status];
        
}
