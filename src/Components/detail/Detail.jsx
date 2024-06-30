import React from 'react'
import { FaArrowCircleUp , FaArrowCircleDown } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
const Detail = () => {
  return (
    <div className='flex-1'>
      <div className="flex flex-col items-center gap-4 p-5 border-b">
        <img src="/user.png" alt="" className='w-28 h-28 rounded-full' />
        <h2 className='font-semibold text-2xl'>Bipina Shrestha</h2>
        <p>Hello my prince how is life going</p>
      </div>

      <div className="info flex justify-between p-3 items-center">
        <h3 className='font-semibold'>Chat Setting</h3>
        <FaArrowCircleUp className='text-xl font-medium text-gray-800 cursor-pointer' />
      </div>

      <div className="info flex justify-between p-3 items-center">
        <h3 className='font-semibold'>Privacy & help</h3>
        <FaArrowCircleUp className='text-xl font-medium text-gray-800 cursor-pointer' />
      </div>

      <div className="info flex justify-between p-3 items-center border-b">
        <h3 className='font-semibold'>Shared photos</h3>
        <FaArrowCircleDown className='text-xl font-medium text-gray-800 cursor-pointer' />
      </div>

      <div className="photoes flex justify-between p-3 items-center">
        <div className="image flex items-center gap-4">
          <img src="/zoro.jpg" alt="" className='w-8 h-8 rounded-full' />
          <span className='font-light text-[14px] text-gray-700'>00zoro.pgoto.0988</span>
        </div>

        <div className="">
          <MdDownload className='cursor-pointer text-xl' />
        </div>
      </div>

      
      <div className="info flex justify-between p-3 items-center">
        <h3 className='font-semibold'>Shared Files</h3>
        <FaArrowCircleUp className='text-xl font-medium text-gray-600 cursor-pointer' />
      </div>

      <div className="flex flex-col gap-3 p-5">
            <button className='bg-red-400 text-white font-semibold items-center p-3 rounded-xl'>Block User</button>
            <button className='bg-green-300  text-white font-semibold items-center p-3 rounded-xl'>Log out</button>
      </div>
      


    </div>
  )
}

export default Detail