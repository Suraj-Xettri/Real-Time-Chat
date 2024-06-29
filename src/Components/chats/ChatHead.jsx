import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
const ChatHead = () => {
  return (
    <div className='flex p-3 justify-between items-center border-b'>
        <div className="flex items-center gap-3" >
            <CgProfile className='text-5xl cursor-pointer'/>
            <div>
                <span className='font-semibold'>Bipina Shrestha</span>
                <p className='text-gray-900'>She is beautifull Girl</p>
            </div>
        </div>

        <div className='flex items-center gap-4'>
            <IoCall className='cursor-pointer text-2xl'/>
            <FaVideo className='cursor-pointer text-2xl'/>
            <IoMdInformationCircle className='cursor-pointer text-2xl'/>

        </div>
    </div>
  )
}

export default ChatHead