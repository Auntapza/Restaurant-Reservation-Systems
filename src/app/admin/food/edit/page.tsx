'use client'
import FileInput from "@/component/FileInput";
import Textbox from "@/component/Textbox";
import { ChangeEvent, FormEvent, SetStateAction, useEffect, useState } from "react";
import fetchData from "../../fetch";
import base64encode from "@/function/base64encode";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

interface foodData {
    foodId: number,
    foodName: string,
    foodPrice: number,
    catId: string,
    foodImg: string
}

export default function AddFoodData() {

    const param = useSearchParams();
    const router = useRouter();

    const [old, setOld] = useState<foodData>()
    const [file, setFile] = useState<File | null>(null);


    useEffect(() => {
        if (!param.get('id')) {
            router.push('/admin/food');
        } else {
            
            fetchData('http://localhost:4000/admin/food/'+param.get('id'), setOld).then(() => {
                setOld((prv:any) => ({
                    ...prv,
                    foodImg: null
                }))
            })
        }
    }, [])

    async function handleFormSubmit(e:FormEvent<HTMLFormElement>) {

        e.preventDefault();

        const payload = {
            ...old,
            foodImg: file ? await base64encode(file) : null
        }

        const res = await fetch('http://localhost:4000/admin/food/'+old?.foodId, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                'content-type': "application/json"
            },
        })

        if (res.status == 201) {
            toast.success('Success fully food update');
            router.push('/admin/food');
        }
        
    }
    
    return (
        <>
            <div className="mt-5 bg-white p-5 rounded-lg shadow">
                <p className="text-3xl font-bold">Edit Food info</p>
                <span className="text-slate-400 text-xl">Edit menu in your Restaurant</span>

                <form className="grid grid-rows-auto gap-5 mt-10" onSubmit={handleFormSubmit}>
                    <Textbox type="text" placeholder="Food name" onChange={(e:ChangeEvent<HTMLInputElement>) => {
                        setOld((prev:any) => {
                            return {
                                ...prev,
                                foodName: e.target.value
                            }
                        })
                    }} defaultValue={old?.foodName}/>
                    <Textbox type="number" placeholder="Food Price" onChange={(e:ChangeEvent<HTMLInputElement>) => {
                        setOld((prev:any) => {
                            return {
                                ...prev,
                                foodPrice: e.target.value
                            }
                        })
                    }} defaultValue={old?.foodPrice}/>
                    <div>
                        <p className="text-xl">Food Category</p>
                        <select className="w-full border rounded mt-2 border-black p-2 text-xl" onChange={(e:ChangeEvent<HTMLSelectElement>) => {
                            setOld((prev:any) => {
                                return {
                                    ...prev,
                                    catId: e.target.value
                                }
                            })
                        }} value={old?.catId}>
                            <option value="3">Main Course</option>
                            <option value="1">Drink</option>
                            <option value="2">Snack</option>
                        </select>
                    </div>
                    <FileInput value={setFile} image={old?.foodImg}/>

                    <button type="submit" className="w-full p-3 text-3xl text-white bg-orange-500
                    rounded-lg">Edit Food Detail!</button>
                </form>
            </div>
        </>
    )
}