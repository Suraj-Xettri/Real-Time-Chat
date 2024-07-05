import React, { useEffect, useState } from 'react';
import { IoPersonAddSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { HiUserCircle } from "react-icons/hi2";
import Adduser from '../addUser/Adduser';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { userChatStore } from '../../library/chatStore';
import { userStore } from '../../library/userStore'; // Ensure this is the correct import for your user store
import { db } from '../../library/Firebase';

export const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const currentUser = userStore((state) => state.currentUser); // Use appropriate method to get currentUser

  const {changeChat} = userChatStore()
  useEffect(() => {
    if (!currentUser) return;
  
    const unsub = onSnapshot(doc(db, "usersChats", currentUser.id), async (res) => {
      const items = res.data()?.chats || []; // Ensure items is not undefined
  
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "Users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();

        return { ...item, user };
      });
  
      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });
  
    return () => {
      unsub();
    };
  }, [currentUser]);
  
  const handleSelect = async (chat) =>{
    changeChat(chat.chatId, chat.user)
  }


  return (
    <div>
      <div className="flex gap-5 items-center p-5">
        <div className="flex-1 flex items-center bg-gray-700 rounded-md">
          <CiSearch className='text-2xl cursor-pointer font-bold text-white' />           
          <input type="text" placeholder='Search' className='p-2 rounded-md flex-1 border-none outline-none bg-transparent text-white' />
        </div>
        <IoPersonAddSharp className='cursor-pointer border border-black text-3xl rounded-full p-1' onClick={() => setAddMode((p) => !p)} />
      </div>
      <div className="messages flex flex-col">
        {chats.map((chat,i) => (
          <div onClick={() => handleSelect(chat)} className="flex p-5 gap-5 cursor-pointer items-center border-b" key={i}>
            <HiUserCircle className='text-5xl' />
            <div className="flex flex-col">
              <span className='font-semibold'>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      {addMode && <Adduser />}
    </div>
  );
}

export default ChatList;
