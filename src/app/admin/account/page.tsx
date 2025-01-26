'use client'

import User from "@/img/user";
import DataBlock from "../datablock";
import Link from "next/link";
import useFetchData from "@/hooks/useFetch";
import Loading from "@/component/Load";
import { useRouter } from "next/navigation";

export default function AccountManagement() {

    const {data, loader} = useFetchData<any[]>({
        url: "http://localhost:4000/admin/account"
    })

    const router = useRouter();

    const getCustomer = () => {
        let fillter = data?.filter((e) => e.role == "customer");
        return fillter?.length;
    }

    const getWorker = () => {
        let fillter = data?.filter((e) => e.role != "customer" && e.role != "admin");
        return fillter?.length;
    }

    const blockData = [
        {
            title: "Total customer",
            image: <User/>,
            value: getCustomer()
        },
        {
            title: "Total Worker",
            image: <User/>,
            value: getWorker()
        },
    ]

    const Row = ({data}: {data: any}) => {
        return (
            <tr className="border-b">
                <td className="p-3">{`${data.acc_fname}  ${data.acc_lname}`}</td>
                <td className="p-3 capitalize">{data.role}</td>
                <td className="p-3">
                    <button className="bg-orange-200 font-bold p-3 rounded cursor-pointer text-orange-500"
                    onClick={() => {
                        router.push(`account/edit/${data.acc_id}`)
                    }}>Edit</button>
                </td>
            </tr>
        )
    }

    return (
        <>
            <div className="">
                <div className="grid grid-cols-2 gap-6">
                    {blockData.map((e, index) => (<DataBlock data={e} key={index}/>))}
                </div>

                <Link href={'./account/add'} className="bg-orange-500 text-white inline-block text-2xl mt-5 rounded p-3">Add new Worker</Link>

                <div className="grid bg-white shadow p-5 rounded-lg mt-5">
                    <p className="text-3xl mb-5">Worker List</p>
                    <Loading fallback={<p className="text-center text-2xl">Lodding...</p>} loadding={loader}>
                        <table className="text-3xl">
                            <thead className="text-slate-500 border-b border-black">
                                <tr>
                                    <td className="font-bold p-3">Name</td>
                                    <td className="font-bold p-3">Role</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.filter(e => e.role != "customer").map((e, index) => (
                                    <Row data={e} key={index}/>
                                ))}
                            </tbody>
                        </table>
                    </Loading>
                </div>
            </div>
        </>
    )
}