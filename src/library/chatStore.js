
import { create } from 'zustand'
import { db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { userStore } from './userStore';

export const userChatStore = create((set) => ({
  chatId: null,
  user:null,
  isCurrentUserBlocked:false,
  isReceiverBloked:false,
  isLoading: true,
  changeChat: (chatId,user) => {
   const currentUser = userStore.getState().currentUser

    //check if user is blocked

    if(user.blocked.includes(currentUser.id)){
        return set({
            chatId,
            user:null,
            isCurrentUserBlocked:true,
            isReceiverBloked:false
        })
    }

    else if(currentUser.blocked.includes(user.id)){
        return set({
            chatId,
            user:user,
            isCurrentUserBlocked:false,
            isReceiverBloked:true
        })
    }else{
        return set({
            chatId,
            user,
            isCurrentUserBlocked:false,
            isReceiverBloked:false
        })
    }

    changeBlock: ()=> {
        set(state=> ({...state, isReceiverBloked: !state.isReceiverBloked}))
    }
  }
}))

