import React from 'react'
import Image from 'next/image'

// import image
import logo from "../img/Logo2.png"

function Footer() {
  return (
    <div className='bg-orange-500 h-[40vh] w-full flex justify-center pt-12 mt-12'>
        <div className="container">
            <Image alt='' src={logo}/>
        </div>
    </div>
  )
}

export default Footer 