import React from 'react'
import { IoIosMore } from "react-icons/io";
import { userStore } from '../../library/userStore';

import { FaVideo , FaEdit  } from "react-icons/fa";
const MainUser = () => {
  const { currentUser} = userStore();

  return (
    <>
        <div className="flex p-3 items-center justify-between">
            <div className="flex items-center gap-2 text-xl">
                <img src={currentUser.avatar || "/user.png"} alt="Profile" className='w-12 h-12 rounded-full'/>
                <h1>{currentUser.username}</h1>
            </div>

            <div className="flex items-center justify-end gap-3 text-xl ">
                <IoIosMore className='cursor-pointer'/>
                <FaVideo className='cursor-pointer'/>
                <FaEdit className='cursor-pointer'/>
            </div>
        </div>
    </>
  )
}

export default MainUser