'use client'

import Image from 'next/image'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

// import image
import logo from '../img/Logo.png' // logo image
import bell from '../img/navbar/Bell.svg' // notification icon
import Link from 'next/link'

function Navbar() {

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
                    <Image alt='' src={logo} className='w-auto h-[30px]'/>
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

function Menubar({state, set} : {
    state : boolean,
    set: Dispatch<SetStateAction<boolean>>
}) {

    const MenuLink = ({ children, href, text } : {
        children : ReactNode,
        href: string,
        text: string
    }) => {
        return (
            <Link href={href} className="flex items-center cursor-pointer transition group gap-4 hover:-translate-x-1 hover:scale-105">
                {children}
                <span className="capitalize font-bold group-hover:text-orange-500 text-2xl transition duration-200">{text}</span>
            </Link>
        )
    }

    return (
        <>
            <div className={(state ? 'flex' : 'hidden') + " z-[99] fixed w-full h-full" }>
                <div className="bg-black opacity-20 w-full h-full"></div>
                <div className="bg-white w-1/3 flex flex-col justify-between">
                    <div>
                        {/* first section */}
                        <div className="border-b border-black flex items-center justify-between p-8">
                            {/* Close button */}
                            <svg onClick={() => {set(false)}} className="cursor-pointer h-8 w-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18" stroke="#33363F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 6L18 18" stroke="#33363F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {/*  */}
                            <Image alt="" src={logo} className="h-10 w-auto"/>
                        </div>

                        {/* second section */}
                        <div className="grid px-6 py-8 gap-5">
                            {/* home button */}
                            <MenuLink href="" text="Home">
                                <svg className=" h-14 w-auto" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="group-hover:stroke-orange-500 transition duration-200" d="M8.125 20.7344C8.125 18.528 8.125 17.4249 8.571 16.4552C9.017 15.4855 9.85459 14.7675 11.5298 13.3316L13.1548 11.9388C16.1827 9.34344 17.6966 8.04578 19.5 8.04578C21.3034 8.04578 22.8173 9.34344 25.8452 11.9388L27.4702 13.3316C29.1454 14.7675 29.983 15.4855 30.429 16.4552C30.875 17.4249 30.875 18.528 30.875 20.7344V27.625C30.875 30.6892 30.875 32.2212 29.9231 33.1731C28.9712 34.125 27.4391 34.125 24.375 34.125H14.625C11.5609 34.125 10.0288 34.125 9.0769 33.1731C8.125 32.2212 8.125 30.6892 8.125 27.625V20.7344Z" stroke="#000" strokeWidth="2"/>
                                    <path className="group-hover:stroke-orange-500 transition duration-200" d="M23.5625 34.125V25.375C23.5625 24.8227 23.1148 24.375 22.5625 24.375H16.4375C15.8852 24.375 15.4375 24.8227 15.4375 25.375V34.125" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </MenuLink>
                            {/* Profile */}
                            <MenuLink href="" text="Profile">
                                <svg className=" h-14 w-auto" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="group-hover:stroke-orange-500 transition duration-200" d="M8.125 20.7344C8.125 18.528 8.125 17.4249 8.571 16.4552C9.017 15.4855 9.85459 14.7675 11.5298 13.3316L13.1548 11.9388C16.1827 9.34344 17.6966 8.04578 19.5 8.04578C21.3034 8.04578 22.8173 9.34344 25.8452 11.9388L27.4702 13.3316C29.1454 14.7675 29.983 15.4855 30.429 16.4552C30.875 17.4249 30.875 18.528 30.875 20.7344V27.625C30.875 30.6892 30.875 32.2212 29.9231 33.1731C28.9712 34.125 27.4391 34.125 24.375 34.125H14.625C11.5609 34.125 10.0288 34.125 9.0769 33.1731C8.125 32.2212 8.125 30.6892 8.125 27.625V20.7344Z" stroke="#000" strokeWidth="2"/>
                                    <path className="group-hover:stroke-orange-500 transition duration-200" d="M23.5625 34.125V25.375C23.5625 24.8227 23.1148 24.375 22.5625 24.375H16.4375C15.8852 24.375 15.4375 24.8227 15.4375 25.375V34.125" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </MenuLink>
                            {/* Notifiction */}
                            <MenuLink href="" text="Notification">
                                <svg className=" h-14 w-auto" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="group-hover:stroke-orange-500 transition duration-200" d="M8.125 20.7344C8.125 18.528 8.125 17.4249 8.571 16.4552C9.017 15.4855 9.85459 14.7675 11.5298 13.3316L13.1548 11.9388C16.1827 9.34344 17.6966 8.04578 19.5 8.04578C21.3034 8.04578 22.8173 9.34344 25.8452 11.9388L27.4702 13.3316C29.1454 14.7675 29.983 15.4855 30.429 16.4552C30.875 17.4249 30.875 18.528 30.875 20.7344V27.625C30.875 30.6892 30.875 32.2212 29.9231 33.1731C28.9712 34.125 27.4391 34.125 24.375 34.125H14.625C11.5609 34.125 10.0288 34.125 9.0769 33.1731C8.125 32.2212 8.125 30.6892 8.125 27.625V20.7344Z" stroke="#000" strokeWidth="2"/>
                                    <path className="group-hover:stroke-orange-500 transition duration-200" d="M23.5625 34.125V25.375C23.5625 24.8227 23.1148 24.375 22.5625 24.375H16.4375C15.8852 24.375 15.4375 24.8227 15.4375 25.375V34.125" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </MenuLink>
                            {/* cart */}
                            <MenuLink href="" text="cart">
                            <svg width="55" height="55" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="group-hover:stroke-orange-500 transition duration-200" d="M29.1665 5.83325H26.3531C25.6031 5.83325 25.2281 5.83325 24.9569 6.04505C24.6856 6.25684 24.5947 6.62062 24.4128 7.34818L24.0406 8.837C23.7258 10.0961 23.5684 10.7257 23.1357 11.1292C23.0502 11.209 22.9578 11.2811 22.8597 11.3447C22.3633 11.6666 21.7144 11.6666 20.4165 11.6666V11.6666" stroke="#222222" strokeWidth="2" strokeLinecap="round"/>
                                <path className="group-hover:stroke-orange-500 transition duration-200" d="M8.75 24.7916H23.9883C24.776 24.7916 25.1699 24.7916 25.4242 24.619C25.6192 24.4867 25.7612 24.2896 25.8251 24.0628C25.9084 23.7669 25.7839 23.3933 25.5348 22.646V22.646C25.2592 21.8193 25.1214 21.4059 24.8599 21.1049C24.6571 20.8714 24.4028 20.6881 24.1171 20.5695C23.7489 20.4166 23.3132 20.4166 22.4417 20.4166H14.5833" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="group-hover:stroke-orange-500 transition duration-200" d="M11.4442 20.4167H21.6389C22.6166 20.4167 23.451 19.7099 23.6117 18.7455L24.5004 13.4133C24.6528 12.499 23.9477 11.6667 23.0208 11.6667H7.45121C6.70782 11.6667 6.22433 12.4491 6.55678 13.114L9.65538 19.3112C9.99417 19.9887 10.6867 20.4167 11.4442 20.4167Z" stroke="#222222" strokeWidth="2" strokeLinecap="round"/>
                                <circle className="group-hover:stroke-orange-500 transition duration-200" cx="1.45833" cy="1.45833" r="1.45833" transform="matrix(-1 0 0 1 11.6665 27.7084)" fill="#222222"/>
                                <circle className="group-hover:stroke-orange-500 transition duration-200" cx="1.45833" cy="1.45833" r="1.45833" transform="matrix(-1 0 0 1 23.3335 27.7084)" fill="#222222"/>
                            </svg>

                            </MenuLink>
                            {/* Tracking order */}
                            <MenuLink href="" text="Tracking order">
                                <svg className=" h-14 w-auto" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="group-hover:stroke-orange-500 transition duration-200" d="M8.125 20.7344C8.125 18.528 8.125 17.4249 8.571 16.4552C9.017 15.4855 9.85459 14.7675 11.5298 13.3316L13.1548 11.9388C16.1827 9.34344 17.6966 8.04578 19.5 8.04578C21.3034 8.04578 22.8173 9.34344 25.8452 11.9388L27.4702 13.3316C29.1454 14.7675 29.983 15.4855 30.429 16.4552C30.875 17.4249 30.875 18.528 30.875 20.7344V27.625C30.875 30.6892 30.875 32.2212 29.9231 33.1731C28.9712 34.125 27.4391 34.125 24.375 34.125H14.625C11.5609 34.125 10.0288 34.125 9.0769 33.1731C8.125 32.2212 8.125 30.6892 8.125 27.625V20.7344Z" stroke="#000" strokeWidth="2"/>
                                    <path className="group-hover:stroke-orange-500 transition duration-200" d="M23.5625 34.125V25.375C23.5625 24.8227 23.1148 24.375 22.5625 24.375H16.4375C15.8852 24.375 15.4375 24.8227 15.4375 25.375V34.125" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </MenuLink>
                        </div>
                    </div>

                    {/* Logout Section */}
                    <Link href={'./'} className="border-t border-black p-8">
                        <div className="flex items-center cursor-pointer transition group gap-4 hover:-translate-x-1 hover:scale-105 hover:shadow">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.8335 17L2.44306 16.6876L2.19318 17L2.44306 17.3123L2.8335 17ZM15.5835 17.5C15.8596 17.5 16.0835 17.2761 16.0835 17C16.0835 16.7238 15.8596 16.5 15.5835 16.5V17.5ZM8.10973 9.60428L2.44306 16.6876L3.22393 17.3123L8.8906 10.229L8.10973 9.60428ZM2.44306 17.3123L8.10973 24.3956L8.8906 23.7709L3.22393 16.6876L2.44306 17.3123ZM2.8335 17.5H15.5835V16.5H2.8335V17.5Z" fill="#FF0A0A"/>
                                <path d="M14.1665 11.5203V9.05522C14.1665 7.43687 14.1665 6.6277 14.6405 6.06821C15.1144 5.50872 15.9126 5.37569 17.5089 5.10964L24.1801 3.99777C27.4232 3.45726 29.0448 3.187 30.1056 4.0857C31.1665 4.98439 31.1665 6.62831 31.1665 9.91614V24.0839C31.1665 27.3718 31.1665 29.0157 30.1056 29.9144C29.0448 30.8131 27.4232 30.5428 24.1801 30.0023L17.5089 28.8904C15.9126 28.6244 15.1144 28.4914 14.6405 27.9319C14.1665 27.3724 14.1665 26.5632 14.1665 24.9449V22.7602" stroke="#FF0A0A"/>
                            </svg>
                            <span className="font-bold text-[#f00] text-2xl transition duration-200">Logout</span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar