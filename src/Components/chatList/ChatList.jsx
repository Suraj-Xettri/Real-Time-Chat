import React, { useEffect, useState } from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { HiUserCircle } from "react-icons/hi2";
import Adduser from '../addUser/Adduser'
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { userStore } from '../../library/userStore';
import { db } from '../../library/Firebase';

export const ChatList = () => {
  const [addMOde, setAddMode] = useState(false);

  const [chats, setChats] = useState([]);


  const {currentUser} = userStore()

  useEffect(() => {
    
  const unsub = onSnapshot(doc(db, "usersChats", currentUser.id), async (res) => {
    const items = res.data().chats
    
    const promises = items.map(async (items) =>{
      const userDocRef = doc(db, "users", items.receiverId)
      const userDocSnap = await getDoc(userDocRef)

      const user = userDocSnap.data()

      return {...items, user}
    } )

    const chatData = await promises

  return () => {
    unsub()
  }
  },[currentUser.id]);

  return (
    <div>
        <div className="flex gap-5 items-center p-5">
            <div className="flex-1 flex items-center bg-gray-700 rounded-md">
                <CiSearch className='text-2xl cursor-pointer font-bold text-white'/>           
                 <input type="text" placeholder='Search' className='p-2 rounded-md flex-1 border-none outline-none bg-transparent text-white' />
            </div>
            <IoPersonAddSharp className='cursor-pointer border border-black text-3xl rounded-full p-1' onClick={() => setAddMode((p) => !p)}/>
        </div>
      <div className="messages flex flex-col">
        {chats.map((chat) => {
            <div className="flex p-5 gap-5 cursor-pointer items-center border-b" key={chat.chatId}>
              <HiUserCircle className='text-5xl'/>
              <div className="flex flex-col">
                <span className='font-semibold'>Suraj xettri</span>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
        })}
          
      </div>
        {addMOde && <Adduser/>}
    </div>
  )
}
