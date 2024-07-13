import { useEffect } from "react";
import Chat from "./Components/chats/Chat";
import Detail from "./Components/detail/Detail";
import Friends from "./Components/friends/Friends";
import Login from "./Components/login/Login";
import Notification from "./Components/notification/Notification";
import { userStore } from "./library/userStore";
import { auth } from "./library/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userChatStore } from "./library/chatStore";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = userStore();
  const {chatId} = userChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return <div className="p-12 text-4xl rounded-xl bg-gray-600">Loading....</div>;

  return (
    <>
    <div className="h-[90vh] w-[90vw] flex justify-center bg-blue-400/50 rounded-md backdrop-blur-sm backdrop-saturate-150">
      {currentUser ? (
        <>
          <Friends />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      
    </div>

    <Notification />
    </>
    
  );
}

export default App;
