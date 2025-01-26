'use client'

import Button from "@/component/Button";
import FileInput from "@/component/FileInput";
import Textbox from "@/component/Textbox";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Test() {

    const [preview, setPreview] = useState<string>();

    async function getbase64(img:Blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(img);
        });
      }

    const formSubmit = async (e:FormEvent<HTMLFormElement> | any) => {

        e.preventDefault();

        const file:File = e.target.file.files[0]
        const img = new Blob([file], {type : file.type})
        
        const payload = {
            img : img ? await getbase64(img) : null
        };

        const res = await fetch('http://localhost:4000/socket/testFile', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await res.json()

        setPreview(data.img);

    }

    const textSubmit = (e:FormEvent<HTMLFormElement> | any) => {
        e.preventDefault();
        socket.emit('table update', `A${e.target.text.value}`, 'ordered');
    }

    useEffect(() => {
        socket.on('table update', (res) => {
            console.log(res);
        })
    }, [])

    return (
        <>
            <form onSubmit={formSubmit}>
                <FileInput image={preview ? preview : undefined}/>
                <Button type="submit" className="mt-5 w-full rounded-sm">Submit</Button>
            </form>

            <form onSubmit={textSubmit}>
                <Textbox name="text" type="number" placeholder=""/>
                <Button type="submit" className="mt-5 w-full rounded-sm">Submit</Button>
            </form>
        </>
    )
}