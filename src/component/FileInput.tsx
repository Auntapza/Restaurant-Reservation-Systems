'use client'

import Image from "next/image";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { FileIcon, Trash, Upload as UploadIcon } from '@/img/svg/svg'

/// file Input component
const FileInput = ({image} : {
    image?: string
}) => {
    
    const [preview, setPreview] = useState<string>()
    const [fileName, setFileName] = useState<string>();
    const fileRef = useRef<HTMLInputElement>(null)
    
    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imgLink = URL.createObjectURL(e.target.files[0])
            setPreview(imgLink);
            setFileName(e.target.files[0].name);
            console.log('test');
            
        }
        
    }

    const removeImg = () => {
        if (fileRef.current) {
            fileRef.current.value = '';
        }
        setPreview('');
        setFileName('');
    }

    const DropFileHandler = (e:DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(e.dataTransfer.files[0]);
        if (fileRef.current) {
            fileRef.current.files = dataTransfer.files;
        }
        setPreview(URL.createObjectURL(e.dataTransfer.files[0]));
        setFileName(e.dataTransfer.files[0].name);
    }
    
    useEffect(() => {
        if (image) {
            setPreview(image);
        }
    })
    
    return (
        <div>
            <div className="rounded p-4 shadow-lg bg-orange-50 border-orange-500
            flex justify-center flex-col">
                <div className="flex flex-col items-center rounded overflow-hidden shadow-lg border-2 
                border-dashed border-orange-500 w-full" onDragOver={(e) => {e.preventDefault()}}
                onDrop={DropFileHandler}>
                    {preview ? (
                        <div className="relative w-full h-96">
                            <Image src={preview} alt="" fill className="size-full object-cover" />
                        </div>
                    ) : (
                        <div className="m-4 my-10 flex items-center flex-col">
                            <UploadIcon />
                            <span className="">Browse file to upload!</span>
                        </div>
                    )}
                </div>
                <label className="flex justify-between items-center mt-3 bg-orange-100 rounded-lg">
                <input type="file" name="" id="" hidden accept="image/*" onChange={handleFileChange} ref={fileRef}/>
                    <div className="flex gap-5 items-center">
                        <FileIcon />
                        <p>{fileName ? fileName : 'No File choosen'}</p>
                    </div>
                    <button onClick={removeImg} type="button">
                        <Trash />
                    </button>
                </label>
            </div>
        </div>
    )
}

export default FileInput