import React from 'react'
import { FaArrowCircleUp , FaArrowCircleDown } from "react-icons/fa";
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

      <div className="info flex justify-between p-3 items-center">
        <h3 className='font-semibold'>Shared photos</h3>
        <FaArrowCircleDown className='text-xl font-medium text-gray-800 cursor-pointer' />
      </div>

    </div>
  )
}

export default Detail