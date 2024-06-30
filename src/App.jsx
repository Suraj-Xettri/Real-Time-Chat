import Chat from "./Components/chats/Chat"
import Detail from "./Components/detail/Detail"
import Friends from "./Components/friends/Friends"
import Login from "./Components/login/Login"
function App() {
  const user = false
  return (
    <div className="h-[90vh] w-[90vw] flex bg-blue-200/50 rounded-md backdrop-blur-sm backdrop-saturate-150">
      {user ? (
      <>
        <Friends/>
        <Chat/>
        <Detail/> 
      </> )
        : (
          <Login/>
        )
        }
    </div>
  )
}

export default App
