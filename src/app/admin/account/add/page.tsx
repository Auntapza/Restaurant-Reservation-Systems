'use client'

import { Arrow } from "@/app/app/table/page";
import Textbox from "@/component/Textbox";
import { useRouter } from "next/navigation";

export default function Main() {

    const router = useRouter();

    return (
        <>
            <button onClick={() => {router.back()}} className="flex gap-2 text-2xl items-center m-5">
                <Arrow className="size-14"/> Back
            </button>
            <div className="bg-white rounded-lg shadow p-5">
                <p className="text-3xl">Add new Worker Account</p>
                <form className="flex flex-col gap-5 mt-5">
                    <Textbox placeholder="Username"/>
                    <Textbox placeholder="Password" type="password"/>
                    <div className="grid grid-cols-2 gap-5">
                        <Textbox placeholder="Firstname"/>
                        <Textbox placeholder="Lastname"/>
                    </div>
                    <div>
                        <label>Role</label>
                        <select className="w-full border p-3 rounded border-black outline-none">
                            <option value="cashier">Cashier</option>
                            <option value="chef">Chef</option>
                            <option value="waiter">Waiter</option>
                            <option value="admin" className="text-red-500">Admin</option>
                        </select>
                    </div>
                    <button className="text-3xl text-white bg-orange-500 p-4 rounded">Add New Account</button>
                </form>
            </div>
        </>
    )
}