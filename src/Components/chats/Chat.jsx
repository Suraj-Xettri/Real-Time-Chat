import React, { useEffect, useRef, useState } from 'react';
import ChatHead from './ChatHead';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../library/Firebase';
import { userChatStore } from '../../library/chatStore';
import { FaRegImage } from "react-icons/fa";
import { IoCameraSharp } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { userStore } from '../../library/userStore';

const Chat = () => {
  const [chat, setChat] = useState();
  const endRef = useRef(null);
  const [message, setMessage] = useState("");

  const { currentUser } = userStore();
  const { chatId, user, isCurrentUSerBloked, isReceiverBloked } = userChatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message === "") return;
  
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          message,
          createdAt: new Date()
        })
      });
  
      const userIds = [currentUser.id, user.id];
  
      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "usersChats", id);
        const userChatSnapshot = await getDoc(userChatRef);
  
        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
  
          userChatsData.chats[chatIndex].lastMessage = message;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
  
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
  
      setMessage(''); // Clear the input field after sending the message
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex-[2] border-r flex flex-col'>
      <ChatHead />

      <div className='chat flex-1 p-3 flex flex-col gap-5 overflow-scroll'>
        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser.id ?"message owner flex gap-2": "message flex gap-2"} key={message.createdAt}>
            {message.senderId === currentUser.id ? "" :
            <img src="/user.png" alt="" className='w-7 h-7 rounded-full' /> }
            <p>{message.message}</p>
          </div>
        ))}

        <div ref={endRef}></div>
      </div>


      {isCurrentUSerBloked || isReceiverBloked ? 

        <div className="flex border-t justify-center items-center gap-3 p-2 text-xl">
        <p>The person is not available</p> 
        </div>:
        <div className='flex border-t justify-between p-3 items-center gap-3'>
          <div className='flex gap-3 text-2xl'>
            <FaRegImage className='cursor-pointer' />
            <IoCameraSharp className='cursor-pointer' />
            <MdKeyboardVoice className='cursor-pointer' />
          </div>
          <input type="text" onChange={handleMessage} 
          placeholder={isCurrentUSerBloked || isReceiverBloked ? 'You Cannot message this person' : 'Type a message' } 
          className='p-2 flex-1 border-none rounded-xl bg-gray-700 outline-none text-white' 
          value={message}
          />

          <div>
            <FaRegFaceSmile className='text-2xl cursor-pointer' />
          </div>

          <button onClick={handleSend} className='border p-2 rounded-xl'>Send</button>
        </div>
       }   
    </div>
  );
};

export default Chat;
