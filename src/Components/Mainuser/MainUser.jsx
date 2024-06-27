import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoIosMore } from "react-icons/io";
import { FaVideo , FaEdit  } from "react-icons/fa";
const MainUser = () => {
  return (
    <>
        <div className="flex p-3 items-center justify-between">
            <div className="flex items-center gap-2">
                <CgProfile/>
                <h1>Suraj Thapa</h1>
            </div>

            <div className="flex items-center gap-3 ">
                <IoIosMore className='cursor-pointer'/>
                <FaVideo className='cursor-pointer'/>
                <FaEdit className='cursor-pointer'/>
            </div>
        </div>
    </>
  )
}

export default MainUser