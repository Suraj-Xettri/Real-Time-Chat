import React from 'react'

const Adduser = () => {
  return (
    <div className='p-7 bg-gray-800 absolute rounded-xl top-0 bottom-0 left-0 right-0 m-auto h-max w-max '>
        <form action="" className='flex gap-5'>
            <input className='p-3 rounded-lg border-none outline-none' type="text" placeholder='UserName' name = "username" />
            <button className='p-3 rounded-xl bg-blue-700 text-white border-none cursor-pointer'>Search</button>
        </form>

        <div className="mt-[50px] flex items-center justify-between">
            <div className="flex items-center gap-5">
                <img className='h-[50px] w-[50px] rounded-full object-cover' src="/user.png" alt="" />
                <span>John cina</span>
            </div>

            <button className='p-3 bg-blue-700 rounded-xl text-white border-none cursor-pointer'>Add User</button>

        </div>
    </div>
  )
}

export default Adduser