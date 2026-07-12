'use client'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'


function Aside() {
    const loaction=usePathname()
 

   if (loaction==="/login" && !getCookie("user")) return
  return (
    <div style={{position:"fixed",width:"300px",height:'100%',background:"red",left:0}}>
     <Link href={"/"}>   <p>home</p></Link>
      <Link href={"/orders"}>  <p>orders   </p></Link>
        <Link href={"/addproduct"}><p>add product</p></Link>
        <p>users</p>
    </div>
  )
}

export default Aside