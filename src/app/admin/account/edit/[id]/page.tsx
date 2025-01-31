'use client'

import Arrow from "@/component/Arrow";
import Loading from "@/component/Load";
import Textbox from "@/component/Textbox";
import api from "@/function/api";
import useFetchData from "@/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

interface Account {
    acc_id: number;
    acc_fname: string;
    acc_lname: string;
    date_create: string; // ISO date string
    role: string;
    Username: {
        acc_id: number;
        username: string;
        password: string;
    }
}
  

export default function Main() {

    const router = useRouter();
    const { id } = useParams();

    const {data, loader} = useFetchData<Account>({
        url: "http://localhost:4000/admin/account/" + id
    })

    const editAccountData = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const form = e.target as HTMLFormElement;
    
        const fname = (form.elements.namedItem('fname') as HTMLInputElement).value;
        const lname = (form.elements.namedItem('lname') as HTMLInputElement).value;
        const role = (form.elements.namedItem('role') as HTMLSelectElement).value;

        const fetch = api.put("http://localhost:4000/admin/account/"+data?.acc_id, {
            fname,
            lname,
            role
        })

        await toast.promise(fetch, {
            loading: "Loadding....",
            success: (res) => res.msg,
            error: (err) => err.message
        })
    
    };
    
    
    return (
        <>
            <button onClick={() => {router.push('/admin/account')}} className="flex gap-2 text-2xl items-center m-5">
                <Arrow className="size-14"/> Back
            </button>
            <div className="bg-white rounded-lg shadow p-5">
                <p className="text-3xl">Edit Worker Data</p>
                <Loading fallback={<p className="text-center text-2xl">Loadding....</p>} loadding={loader}>
                    <form className="flex flex-col gap-5 mt-5" onSubmit={editAccountData}>
                        <Textbox type="text" placeholder="Username" disabled defaultValue={data?.Username.username}/>
                        <div className="grid grid-cols-2 gap-5">
                            <Textbox type="text" name="fname" placeholder="Firstname" defaultValue={data?.acc_fname}/>
                            <Textbox type="text" name="lname" placeholder="Lastname" defaultValue={data?.acc_lname}/>
                        </div>
                        <div>
                            <label>Role</label>
                            <select name="role" className="w-full border p-3 rounded border-black outline-none">
                                <option value="cashier" defaultChecked={data?.role == "cashier"}>Cashier</option>
                                <option value="chef" defaultChecked={data?.role == "chef"}>Chef</option>
                                <option value="waiter" defaultChecked={data?.role == "waiter"}>Waiter</option>
                                <option value="admin" defaultChecked={data?.role == "admin"} className="text-red-500">Admin</option>
                            </select>
                        </div>
                        <button className="text-3xl text-white bg-orange-500 p-4 rounded" type="submit">Edit Account data!</button>
                    </form>
                </Loading>
            </div>
        </>
    )
}