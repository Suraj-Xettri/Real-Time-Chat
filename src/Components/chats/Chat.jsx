import React from 'react'
import ChatHead from './ChatHead'
import ChatButton from './ChatButton'
import { FaCircleUser } from "react-icons/fa6";
const Chat = () => {
  return (
    <div className='flex-[2] border-r flex flex-col'>
        <ChatHead/>

        <div className='chat flex-1 p-3 flex flex-col gap-5 overflow-scroll'>
          <div className="message flex gap-2">
          <img src="/user.png" alt="" className='w-7 h-7 rounded-full' />
            <p>Hi</p>
            </div>

          <div className="message owner flex gap-2">
            <p>hello</p>
          </div>

          <div className="message flex gap-2 items-center">
            <img src="/user.png" alt="" className='w-7 h-7 rounded-full' />
            <p>What are you doing</p>      
    </div>

          <div className="message owner flex gap-2">
            <p>fine and you</p>
          </div>

          <div className="message flex gap-2">
            <img src="/user.png" alt="" className='w-7 h-7 rounded-full' />
            <p>Same here dude</p>            
          </div>
        </div>
        <ChatButton/>
    </div>
  )
}

export default Chat