'use client'

import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

import { Layoutinterface } from "@/interface/interface"
export default function MainpageLayout({ children } : Layoutinterface ) {

    return (
        <>
            <Navbar/>
                {children}
            <Footer/>
        </>
    )
}