'use client'

import Image from 'next/image'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

// import image
import logo from '../img/Logo.png' // logo image
import bell from '../img/navbar/Bell.svg' // notification icon
import { useRouter } from 'next/navigation'
import Menubar from './Menubar'

function Navbar() {

    const router = useRouter()

    const [lastScroll, setLastScroll] = useState(0);
    const [show, setShow] = useState(true);

    const [menu, setMenu] = useState(false);

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll < 150) {
            setShow(true)
        } else {
            if (currentScroll > lastScroll) {
            setShow(false);
            } else {
                setShow(true);
            }
        }
        
        setLastScroll(currentScroll);
        
    }

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
        
    }, [lastScroll])
        
    return (
        <>
            <Menubar state={menu} set={setMenu}/>

            <nav className={`flex justify-center border-b-orange-500 border-b-2 py-5 shadow-md sticky top-0 bg-white transition-all 
                duration-300 z-40
            ${show ? 'translate-y-0' : '-translate-y-96'}`}>
                <div className="container flex justify-between items-center">
                    {/* Logo */}
                    <Image alt='' onClick={() => {router.push("/app")}} src={logo} className='cursor-pointer w-auto h-[30px]'/>
                    <div className='flex gap-12 items-center'>
                        {/* Bell */}
                        <Image alt='' src={bell} className='cursor-pointer fill-black after:bg-red-600 after:content-["1"]
                        after:w-96 after:h-96 h-[30px]'/>
                        {/* hamberger menu */}
                        <div onClick={() => {setMenu(!menu)}} className='flex justify-between items-center gap-1 flex-col py-2 cursor-pointer h-full'>
                            <div className='bg-black w-[30px] h-1 rounded'></div>
                            <div className='bg-black w-[30px] h-1 rounded'></div>
                            <div className='bg-black w-[30px] h-1 rounded'></div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar