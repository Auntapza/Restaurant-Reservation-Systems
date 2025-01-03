'use client'

import Button from '@/component/Button';
import Textbox from '@/component/Textbox';
import Image from 'next/image';
import React, { FormEvent } from 'react';

import logo from '@/img/Logo.png'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {

  const router = useRouter();

  async function handleFormSubmit(e:any) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;

    if (password === confirm_password) {
      try {
        const fetchRes = fetch('http://localhost:4000/register', {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
            fname,
            lname
          }),
          headers: {
            'content-type': 'application/json'
          }
        }).then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Registration failed');
          }
          return response.json();
        });

        const res = await toast.promise(fetchRes, {
          loading: "Registering",
          success: "Register successfull",
          error: (err) => {
            return err.message
          }
        })

        if (res.status == 200) {
          router.push('/login')
        } else {
          console.log(res);
          
        }

      } catch {
        
      }
      
    } else {
      toast.error("Password does'n match");
    }
    
  }

  return (
    <div className="flex justify-center items-center h-screen bg-orange-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[30rem]">
        <Image src={logo} alt='' className='w-60 mx-auto' />
        <h2 className="text-xl font-semibold my-4 relative w-fit">Signup
          <span className='w-full bg-orange-500 h-1 absolute left-0 -bottom-2'></span>
        </h2>
        <form onSubmit={handleFormSubmit} method="POST" className='grid gap-4'>
          <Textbox
            type="text"
            name="fname"
            placeholder="First Name"
          />
          <Textbox
            type="text"
            name="lname"
            placeholder="Last Name"
          />
          <Textbox
            type="text"
            name="username"
            placeholder="Username"
          />
          <Textbox
            type="password"
            name="password"
            placeholder="Password"
          />
          <Textbox
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
          />
          <Button type="submit" className="mt-4">
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
