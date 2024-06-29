import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoIosMore } from "react-icons/io";
import { FaVideo , FaEdit  } from "react-icons/fa";
const MainUser = () => {
  return (
    <>
        <div className="flex p-3 items-center justify-between">
            <div className="flex items-center gap-2 text-xl">
                <CgProfile className='text-3xl cursor-pointer'/>
                <h1>Suraj Thapa</h1>
            </div>

            <div className="flex items-center gap-3 text-xl ">
                <IoIosMore className='cursor-pointer'/>
                <FaVideo className='cursor-pointer'/>
                <FaEdit className='cursor-pointer'/>
            </div>
        </div>
    </>
  )
}

export default MainUser