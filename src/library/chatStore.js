
import { create } from 'zustand'
import { db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';

export const userChatStore = create((set) => ({
  chatId: null,
  user:null,
  isCurrentUserBlocked:false,
  isReceiverBloked:false,
  isLoading: true,
  changeChat: (chatId,user) => {
    const currentUser = useUserStore.getState().currentUser

    //check if user is blocked

    if(user.blocked.includes(currentUser.id)){
        return set({
            chatId,
            user:null,
            isCurrentUserBlocked:true,
            isReceiverBloked:false
        })
    }

    if(currentUser.blocked.includes(user.id)){
        return set({
            chatId,
            user:user,
            isCurrentUserBlocked:false,
            isReceiverBloked:true
        })
    }

    changeBlock: ()=> {
        set(state=> ({...state, isReceiverBloked: !state.isReceiverBloked}))
    }
  }
}))

