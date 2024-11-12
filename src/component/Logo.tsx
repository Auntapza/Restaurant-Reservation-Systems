import React from 'react'
import Image from 'next/image'

import logouri from "../img/Logo.png"

function Logo({ className } : {
  className: string
}) {
  return (
    <>
        <Image alt='' src={logouri} className={className}/>
    </>
  )
}

export default Logo