import React, { useState } from 'react'
import { FaRegImage } from "react-icons/fa";
import { IoCameraSharp } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
const ChatButton = () => {
  const [message, setMessage] = useState("")

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }
  return (
    <div className='flex border-t justify-between p-3 items-center gap-3'>
        <div className='flex gap-3 text-2xl'>
            <FaRegImage className='cursor-pointer'/>
            <IoCameraSharp className='cursor-pointer'/>
            <MdKeyboardVoice className='cursor-pointer'/>
        </div>
        <input type="text" onChange={handleMessage} placeholder='Type a amessage ' className='p-2 flex-1 border-none rounded-xl bg-gray-700 outline-none text-white'/>

        <div>
            <FaRegFaceSmile className='text-2xl cursor-pointer'/>
        </div>

        <button>Send</button>
    </div>
  )
}

export default ChatButton