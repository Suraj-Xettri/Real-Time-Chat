import React from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

export const ChatList = () => {
  return (
    <div>
        <div className="flex justify-between items-center p-3">
            <div className="relative">
                <CiSearch className='absolute text-2xl cursor-pointer bottom-2 font-bold left-0'/>           
                 <input type="text" placeholder='Search' className='pl-6 p-2 rounded-md' />
            </div>
            <IoPersonAddSharp className='cursor-pointer'/>
        </div>
    </div>
  )
}
