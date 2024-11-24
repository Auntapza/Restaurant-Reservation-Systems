import FileInput from "@/component/FileInput";
import Textbox from "@/component/Textbox";

interface foodData {
    foodId: number,
    foodName: string,
    foodPrice: number,
    foodCategory: string,
    foodImageUrl: string
}

export default function AddFoodData() {
    
    return (
        <>
            <div className="mt-5 bg-white p-5 rounded-lg shadow">
                <p className="text-3xl font-bold">Edit Food info</p>
                <span className="text-slate-400 text-xl">Edit menu in your Restaurant</span>

                <form action="" className="grid grid-rows-auto gap-5 mt-10">
                    <Textbox placeholder="Food name"/>
                    <Textbox placeholder="Food Price"/>
                    <div>
                        <p className="text-xl">Food Category</p>
                        <select className="w-full border rounded mt-2 border-black p-2 text-xl">
                            <option value="">Test</option>
                            <option value="">Test</option>
                            <option value="">Test </option>
                        </select>
                    </div>
                    <FileInput image="http://localhost/PHP/1/profileImg/download.jpg"/>

                    <button type="submit" className="w-full p-3 text-3xl text-white bg-orange-500
                    rounded-lg">Edit Food!</button>
                </form>
            </div>
        </>
    )
}