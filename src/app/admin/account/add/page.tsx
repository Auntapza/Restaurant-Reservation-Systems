'use client'

import Arrow from "@/component/Arrow";
import Textbox from "@/component/Textbox";
import api from "@/function/api";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function Main() {

    const router = useRouter();

    async function createWorkerData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        const form = e.target as HTMLFormElement;
    
        let username = (form.elements.namedItem('username') as HTMLInputElement).value;
        let password = (form.elements.namedItem('password') as HTMLInputElement).value;
        let fname = (form.elements.namedItem('fname') as HTMLInputElement).value;
        let lname = (form.elements.namedItem('lname') as HTMLInputElement).value;
        let role = (form.elements.namedItem('role') as HTMLSelectElement).value;

        const fetch = api.post("http://localhost:4000/admin/account", {
            username,
            password,
            fname,
            lname,
            role
        })

        await toast.promise(fetch, {
            loading: "Loadding....",
            success: (res) => {
                router.push('/admin/account')
                return res.msg
            },
            error: (err) => err.message
        })
    
    }
    

    return (
        <>
            <button onClick={() => {router.push("/admin/account")}} className="flex gap-2 text-2xl items-center m-5">
                <Arrow className="size-14"/> Back
            </button>
            <div className="bg-white rounded-lg shadow p-5">
                <p className="text-3xl">Add new Worker Account</p>
                <form className="flex flex-col gap-5 mt-5" onSubmit={createWorkerData}>
                    <Textbox type="text" placeholder="Username" name="username"/>
                    <Textbox placeholder="Password" type="password" name="password"/>
                    <div className="grid grid-cols-2 gap-5">
                        <Textbox name="fname" type="text" placeholder="Firstname"/>
                        <Textbox name="lname" type="text" placeholder="Lastname"/>
                    </div>
                    <div>
                        <label>Role</label>
                        <select className="w-full border p-3 rounded border-black outline-none" name="role">
                            <option value="cashier">Cashier</option>
                            <option value="chef">Chef</option>
                            <option value="waiter">Waiter</option>
                            <option value="admin" className="text-red-500">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="text-3xl text-white bg-orange-500 p-4 rounded">Add New Account</button>
                </form>
            </div>
        </>
    )
}