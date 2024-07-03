import { useEffect } from "react";
import Chat from "./Components/chats/Chat";
import Detail from "./Components/detail/Detail";
import Friends from "./Components/friends/Friends";
import Login from "./Components/login/Login";
import Notification from "./Components/notification/Notification";
import { userStore } from "./library/userStore";
import { auth } from "./library/Firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = userStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid).catch((error) => {
          console.error("Failed to fetch user info:", error);
        });
      }
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return <div className="p-12 text-4xl rounded-xl bg-gray-600">Loading....</div>;
  return (
    <div className="h-[90vh] w-[90vw] flex bg-blue-200/50 rounded-md backdrop-blur-sm backdrop-saturate-150">
      {currentUser ? (
        <>
          <Friends />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
