import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '../../library/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../library/upload';

const Login = () => {
  const [avtar, setAvtar] = useState({
    file: null,
    url: ''
  });

 

  const handleAvtar = (e) => {
    if (e.target.files[0]) {
      setAvtar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const {username, email, password} = Object.fromEntries(formData)
    try {

      const imgurl = await upload(avtar.file)

      const res = await createUserWithEmailAndPassword(auth, email, password)
      
      await setDoc(doc(db, "Users", res.user.uid),{
        username,
        email,
        avtar: imgurl,
        id: res.user.uid,
        blocked: []
      })

      await setDoc(doc(db, "usersChats", res.user.uid),{
        chats:[]
      })

      toast.success("Account Created!")
    } catch (er) {
      toast.error(er.message)
      
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
  }
  return (
    <div className='flex w-full h-full gap-24 justify-between items-center p-5'>
      <div className='flex-1 flex flex-col gap-5 items-center'>
        <h2 className='text-2xl font-bold'>Welcome To React Chat</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              name='email'
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              name='password'
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>

      <div className="seperate h-[80%] w-0.5 bg-gray-300"></div>

      <div className='flex-1 flex flex-col gap-5 items-center'>
        <h2 className='text-2xl font-bold'>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              name='username'
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              name='email'
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              name='password'
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Upload Image
            </label>
            <img src={avtar.url || "/zoro.jpg"} alt="Url Avtar" className='w-10 h-10 rounded-full' />
            <input
              id="image"
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleAvtar}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
