import User from "@/img/user";
import DataBlock from "../datablock";
import Link from "next/link";

export default function AccountManagement() {

    const blockData = [
        {
            title: "Total customer",
            image: <User/>,
            value: 3
        },
        {
            title: "Total Worker",
            image: <User/>,
            value: 12
        },
    ]

    return (
        <>
            <div className="">
                <div className="grid grid-cols-2 gap-6">
                    {blockData.map((e, index) => (<DataBlock data={e} key={index}/>))}
                </div>

                <Link href={'./account/add'} className="bg-orange-500 text-white inline-block text-2xl mt-5 rounded p-3">Add new Worker</Link>

                <div className="grid bg-white shadow p-5 rounded-lg mt-5">
                    <p className="text-3xl mb-5">Worker List</p>
                    <table className="text-3xl">
                        <thead className="text-slate-500 border-b border-black">
                            <tr>
                                <td className="font-bold p-3">Name</td>
                                <td className="font-bold p-3">Role</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3">SomChai Maipong</td>
                                <td className="p-3">Cashier</td>
                                <td className="p-3">
                                    <button className="bg-orange-200 font-bold p-3 rounded cursor-pointer text-orange-500">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}