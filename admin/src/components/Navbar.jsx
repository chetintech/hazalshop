import React from 'react'
import { assets } from '../assets/assets'
import { Button } from "@/components/ui/button"

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img src={assets.logo} alt="" />
       <Button onClick={() => setToken('')} >Çıkış yap</Button>
    </div>
  )
}

export default Navbar
