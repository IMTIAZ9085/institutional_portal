import  { useRef, useState } from "react";
import "./chat.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatBox from "../component/ChatBox.jsx";
import Conversation from "../component/Conversation.jsx";
import { io } from "socket.io-client";
import axios  from "axios";


const Chat = ()=>{

  const user = useSelector((state) => state.user.currentUser);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const getChats = async()=>{
      try{
        const res = await axios.get(`/api/chat/${user._id}`);
        setChats(res.data);
        console.log(res);
       
       
      }catch(e){
        console.log(e);
      }
    }

    getChats();
    
  }, [])
  
  
  
  return (
    <div className="Chat">
    <div className="Left-side-chat">
    <div className="Chat-container">
      <h2>Chats</h2>
      <div className="Chat-list">
        {
          chats.map((chat)=>(
           <div onClick={()=> setCurrentChat(chat)}>
            <Conversation data={chat} currentUser={user._id} online={true}/>
           </div>
          ))
        } 
         </div>
       </div>
    </div>

    <div className="Right-side-chat">
      <ChatBox chat={currentChat} currentUser={user._id}/>
    </div>
    </div>
  )

}
// const Chat= () => {

//       const dispatch = useDispatch();
//       // const { user } = useSelector((state) => state.authReducer.authData);
//       const user = useSelector((state) => state.user.currentUser);

    
//       const [chats, setChats] = useState([]);
//       const [onlineUsers, setOnlineUsers] = useState([]);
//       const [currentChat, setCurrentChat] = useState(null);
//       const [sendMessage, setSendMessage] = useState(null);
//       const [receivedMessage, setReceivedMessage] = useState(null);




//   return (
//     <>
//       <div className="Chat">
//       {/* Left Side */}
//       <div className="Left-side-chat">
      
//         <div className="Chat-container">
//           <h2>Chats</h2>
//           <div className="Chat-list">
//             {chats.map((chat) => (
//               <div
//                 onClick={() => {
//                   setCurrentChat(chat);
//                 }}
//               >
//                 <Conversation
//                   data={chat}
//                   currentUser={user._id}
//                   // online={checkOnlineStatus(chat)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}

//       <div className="Right-side-chat">
//         <div style={{ width: "20rem", alignSelf: "flex-end" }}>
//           {/* <NavIcons /> */}
//         </div>
//         <ChatBox
//           chat={currentChat}
//           currentUser={user._id}
//           setSendMessage={setSendMessage}
//           receivedMessage={receivedMessage}
//         />
//       </div>
//     </div>
//     </>
//   )
// }

export default Chat;