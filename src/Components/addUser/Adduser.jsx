import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../library/Firebase';
import { userStore } from '../../library/userStore';
import { toast } from 'react-toastify';
import { IoCloseCircle } from "react-icons/io5";

const Adduser = ({ AddModeOn }) => {
  const [user, setUser] = useState(null);

  const {currentUser} = userStore()

  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "Users");

      // Creating query
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        setUser(null); // Clear user state if no user is found
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const usersChatRef = collection(db, "usersChats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });


      await updateDoc(doc(usersChatRef, user.id),{
        chats:arrayUnion({
          chatId: newChatRef.id,
          lastMessage:"",
          receiverId: currentUser.id,
          updatedAt: Date.now()

        })
        
      })

      await updateDoc(doc(usersChatRef, currentUser.id),{
        chats:arrayUnion({
          chatId: newChatRef.id,
          lastMessage:"",
          receiverId: user.id,
          updatedAt: Date.now()

        })
        
      })

      toast.success("Added Successfully")
      AddModeOn(); 
      
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-7 bg-gray-800 absolute rounded-xl top-0 bottom-0 left-0 right-0 m-auto h-max w-max '>
      <div className='relative h-3 w-full'>
        <IoCloseCircle onClick={AddModeOn} className='absolute -right-6 bottom-1 cursor-pointer  text-white text-3xl'/>
      </div>
     
      <form onSubmit={handleSearch} className='flex gap-5'>
        <input
          className='p-3 rounded-lg border-none outline-none'
          type="text"
          placeholder='UserName'
          name="username"
        />
        <button
          className='p-3 rounded-xl bg-blue-700 text-white border-none cursor-pointer'
          type='submit'
        >
          Search
        </button>
      </form>

      {user && (
        <div className="mt-[50px] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              className='h-[50px] w-[50px] rounded-full object-cover'
              src={user.avatar || "/user.png"}
              alt=""
            />
            <span className='text-white'>{user.username}</span>
          </div>
          <button onClick={handleAdd} className='p-3 bg-blue-700 rounded-xl text-white border-none cursor-pointer'>
            Add User
          </button>
        </div>
      )}
    </div>
  );
};

export default Adduser;
