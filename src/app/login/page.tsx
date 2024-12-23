'use client'

import Textbox from '@/component/Textbox';
import Image from 'next/image'
import React, { FormEvent, useState } from 'react'

import logo from '@/img/Logo.png'
import Button from '@/component/Button';
import { useRouter } from 'next/navigation';
import Api from '@/function/api';
import toast from 'react-hot-toast';

function Login() {

  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const loginRequest = async(e:FormEvent<HTMLFormElement>) => {

    e.preventDefault();

      try {
        const request = Api.post('http://localhost:4000/login', {
          username,password
        })
  
        await toast.promise(request, {
          success: "Login Successfuly",
          error: (err) => {
            return err.message
          },
          loading: "Logging in"
        })

        router.push('/app');
        
      } catch(err) {
        
      }

  }

  return (
    <div className='grid place-items-center bg-orange-500 h-[100vh]'>

      {/* login card */}
      <div className='rounded-lg bg-white shadow p-4 px-8 flex flex-col gap-5'>
        <Image alt='' src={logo} className='scale-75'/>
        <span className='text-4xl mb-5 relative w-fit'>Login
          <span className='bg-orange-500 absolute w-full h-1 -bottom-3 left-0'></span>
        </span>
        <form onSubmit={loginRequest} className='grid gap-5'>
          <Textbox placeholder={'Username'} onChange={(e) => {
            setUsername(e.currentTarget.value);
          }} type={'text'}/>
          <Textbox placeholder={'Password'} onChange={(e) => {
            setPassword(e.currentTarget.value);
          }} type={'password'}/>
          <Button type='submit'>Login</Button>
        </form>

      </div>

    </div>
  )
}

export default Login;