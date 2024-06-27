import React from 'react'
import { ChatList } from '../chatList/ChatList'
import MainUser from '../Mainuser/MainUser';
const Friends = () => {
  return (
    <div className='flex-1 border-r border-blue-400'>
        <MainUser/>
        <ChatList/>
    </div>
  )
}

export default Friends