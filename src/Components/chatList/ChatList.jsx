import React, { useEffect, useState } from 'react';
import { IoPersonAddSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { HiUserCircle } from "react-icons/hi2";
import Adduser from '../addUser/Adduser';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { userChatStore } from '../../library/chatStore';
import { userStore } from '../../library/userStore'; // Ensure this is the correct import for your user store
import { db } from '../../library/Firebase';

export const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const [input, setInput] = useState("");

  const currentUser = userStore((state) => state.currentUser); // Use appropriate method to get currentUser

  const {changeChat, isCurrentUSerBloked, isReceiverBloked} = userChatStore()

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
    const userChats = chats.map((item) => {
      const {user, ...rest} = item
      return rest
    })

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId)
    
      userChats[chatIndex].isSeen = true

      const userChatRef = doc(db,"usersChats", currentUser.id)

      try {
        await updateDoc(userChatRef, {
          chats: userChats
        })
        changeChat(chat.chatId, chat.user)

      } catch (error) {
        console.log(error)
      }



  }

  const AddModeOn = (e) => {
    setAddMode((p) => !p)
  }
  const filteredChats = chats.filter((c) => 
    c.user.username.toLowerCase().includes(input.toLowerCase()))


  return (
    <div>
      <div className="flex gap-5 items-center p-5">
        <div className="flex-1 flex items-center bg-gray-700 rounded-md">
          <CiSearch className='text-2xl cursor-pointer font-bold text-white' />           
          <input type="text" placeholder='Search' className='p-2 rounded-md flex-1 border-none outline-none bg-transparent text-white' onChange={(e) => setInput(e.target.value)} />
        </div>
        <IoPersonAddSharp className='cursor-pointer border border-black text-3xl rounded-full p-1' onClick={AddModeOn} />
      </div>
      <div className="messages flex flex-col">
        {filteredChats.map((chat,i) => (
          <div onClick={() => handleSelect(chat)} className="flex p-5 gap-5 cursor-pointer items-center border-b" key={i} style={{backgroundColor: chat?.isSeen ? "transparent": "#5183fe"}}>
            <img src={isCurrentUSerBloked || isReceiverBloked? "/user.png":chat.user?.avatar || "/user.png"} className='w-10 h-10 rounded-full cursor-pointer'/>
            <div className="flex flex-col">
              <span className='font-semibold'>{isCurrentUSerBloked || isReceiverBloked? "User": chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      {addMode && <Adduser AddModeOn={AddModeOn} />}
    </div>
  );
}

export default ChatList;
