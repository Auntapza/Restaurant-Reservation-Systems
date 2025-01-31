'use client'
import FileInput from "@/component/FileInput";
import Textbox from "@/component/Textbox";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import fetchData from "../../fetch";
import base64encode from "@/function/base64encode";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface cat {
    catId: number,
    catName: string
}

export default function AddFoodData() {

    const [cat, setCat] = useState<cat[]>([]);
    const [foodName, setFoodName] = useState<string>('');
    const [foodPrice, setFoodPrice] = useState<number>(0);
    const [catId, setCatId] = useState<number>(3);
    const [file, setFile] = useState<File>();

    const router = useRouter();

    useEffect(() => {
        fetchData('http://localhost:4000/admin/category', setCat);
    }, [])

    async function handleFormSubmit(e:FormEvent<HTMLFormElement>) {

        e.preventDefault();

        const payload = {
            foodName,
            foodPrice,
            catId,
            foodImg: file ? await base64encode(file) : null
        }

        const res = await fetch('http://localhost:4000/admin/food', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'content-type': "application/json"
            },
        })

        if (res.status == 201) {
            toast.success('Success fully food crate');
            router.push('/admin/food');
        }
        
    }
    
    return (
        <>
            <div className="mt-5 bg-white p-5 rounded-lg shadow">
                <p className="text-3xl font-bold">Add Food</p>
                <span className="text-slate-400 text-xl">Add new menu for your Restaurant</span>

                <form className="grid grid-rows-auto gap-5 mt-10" onSubmit={handleFormSubmit}>
                    <Textbox type="text" placeholder="Food name" onChange={(e:ChangeEvent<HTMLInputElement>) => {
                        setFoodName(e.target.value)
                    }}/>
                    <Textbox type="number" placeholder="Food Price" onChange={(e:ChangeEvent<HTMLInputElement>) => {
                        setFoodPrice(Number(e.target.value))
                    }}/>
                    <div>
                        <p className="text-xl">Food Category</p>
                        <select className="w-full border rounded mt-2 border-black p-2 text-xl" onChange={(e:ChangeEvent<HTMLSelectElement>) => {
                            setCatId(Number(e.target.value))
                        }} defaultValue="3">
                            {cat.map((e, index) => <option value={e.catId} key={index}>{e.catName}</option>)}
                        </select>
                    </div>
                    <FileInput value={setFile}/>

                    <button type="submit" className="w-full p-3 text-3xl text-white bg-orange-500
                    rounded-lg">Add Food!</button>
                </form>
            </div>
        </>
    )
}