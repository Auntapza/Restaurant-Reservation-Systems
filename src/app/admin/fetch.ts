import { Dispatch, SetStateAction } from "react";

export default async function fetchData(api:string, state:Dispatch<SetStateAction<any>>) {
    const res = await fetch(api);
    const data = await res.json();
    state(data);
}