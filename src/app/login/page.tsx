'use client'

import Textbox from '@/component/Textbox';
import Image from 'next/image'
import React from 'react'

import logo from '@/img/Logo.png'
import Button from '@/component/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Login() {

  const router = useRouter()

  return (
    <div className='grid place-items-center bg-orange-500 h-[100vh]'>

      {/* login card */}
      <div className='rounded-lg bg-white shadow p-4 px-8 flex flex-col gap-5'>
        <Image alt='' src={logo} className='scale-75'/>
        <span className='text-4xl mb-5 relative w-fit'>Login
          <span className='bg-orange-500 absolute w-full h-1 -bottom-3 left-0'></span>
        </span>
        <Textbox placeholder={'Username'} type={'text'}/>
        <Textbox placeholder={'Password'} type={'password'}/>
        <Button onClick={() => {router.push('./admin')}}>Login</Button>

      </div>

    </div>
  )
}

export default Login;