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
            <FaCircleUser/>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt a eligendi autem ipsum, obcaecati, aspernatur optio maiores molestias mollitia totam eum blanditiis asperiores expedita at facere, odit iure ipsa fugit.</p>
          </div>

          <div className="message flex gap-2">
            <FaCircleUser/>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt a eligendi autem ipsum, obcaecati, aspernatur optio maiores molestias mollitia totam eum blanditiis asperiores expedita at facere, odit iure ipsa fugit.</p>
          </div>

          <div className="message owner flex gap-2">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt a eligendi autem ipsum, obcaecati, aspernatur optio maiores molestias mollitia totam eum blanditiis asperiores expedita at facere, odit iure ipsa fugit.</p>
          </div>

          <div className="message flex gap-2 items-center">
            <FaCircleUser className='text-[100px]'/>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt a eligendi autem ipsum, obcaecati, aspernatur optio maiores molestias mollitia totam eum blanditiis asperiores expedita at facere, odit iure ipsa fugit.</p>
          </div>

          <div className="message owner flex gap-2">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt a eligendi autem ipsum, obcaecati, aspernatur optio maiores molestias mollitia totam eum blanditiis asperiores expedita at facere, odit iure ipsa fugit.</p>
          </div>

          <div className="message flex gap-2">
            <FaCircleUser/>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt a eligendi autem ipsum, obcaecati, aspernatur optio maiores molestias mollitia totam eum blanditiis asperiores expedita at facere, odit iure ipsa fugit.</p>
          </div>
        </div>
        <ChatButton/>
    </div>
  )
}

export default Chat