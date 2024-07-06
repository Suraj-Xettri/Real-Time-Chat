import React from 'react'
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { userChatStore } from '../../library/chatStore';
const ChatHead = () => {

  const {chatId, user, isCurrentUSerBloked, isReceiverBloked, changeBlock} =
  userChatStore()
  return (
    <div className='flex p-3 justify-between items-center border-b'>
        <div className="flex items-center gap-3" >
            <img src={isCurrentUSerBloked || isReceiverBloked? "/user.png":user?.avatar || "/user.png"} className='w-10 h-10 rounded-full cursor-pointer'/>
            <div>
                <span className='font-semibold'>{isCurrentUSerBloked || isReceiverBloked? "User" :user?.username}</span>
                <p className='text-gray-900'>{isCurrentUSerBloked || isReceiverBloked? "User is blocked" :"We are friends Now"}</p>
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