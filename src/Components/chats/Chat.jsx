import React, { useEffect, useRef, useState } from 'react'
import ChatHead from './ChatHead'
import ChatButton from './ChatButton'
import { arrayUnion, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../library/Firebase';
import { userChatStore } from '../../library/chatStore';
import { FaRegImage } from "react-icons/fa";
import { IoCameraSharp } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { userStore } from '../../library/userStore';
const Chat = () => {

  const [chat, setChat] = useState()
  const endRef = useRef(null)
  const [message, setMessage] = useState("")

  const {currentUser} = userStore()

  const {chatId} = userChatStore()

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  },[])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChat(res.data())
    })
    return () => {
      unSub()
    }
  },[chatId])



  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSend = async () => {
    if(message == "")return

    try {
      await updateDoc(doc(db,"chats", chatId),{
        messages:arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date()

        })
      })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='flex-[2] border-r flex flex-col'>
        <ChatHead/>

        <div className='chat flex-1 p-3 flex flex-col gap-5 overflow-scroll'>

          {chat?.messages?.map((messages)=>{
            <div className="message flex gap-2" key={messages?.createAt}>
              <img src="/user.png" alt="" className='w-7 h-7 rounded-full' />
              <p>{messages.text}</p>
            </div>
          })}
          

          <div className="message owner flex gap-2">
            <p>fine and you</p>
          </div>

          <div ref={endRef}></div>
        </div>
        
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
    </div>
  )
}

export default Chat