import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import Nav from "../components/Nav";
export default function Details() {
  const Router = useRouter();
  const routeData = Router.query;
  console.log(routeData)
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  //submit message
  const  submitMessage =async()=>{
    if(!message){
      toast.error("Empty message")
      return
    }
    const docRef =doc(db,"posts" ,routeData.id);
    await updateDoc(docRef,{comments:arrayUnion({
      message: message,
      avatar : auth.currentUser.photoURL,
      username:auth.currentUser.displayName,//we can use routeData
      time:Timestamp.now()
    })})
    setMessage('')
  }
  
  //get comments
  const getComment =async ()=>{
    const docRef =doc(db,"posts",routeData.id)
    const docSnap =await getDoc(docRef)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments)
    });
    return unsubscribe
  }
  useEffect(()=>{
    if(!Router.isReady) return
    getComment()
  },[Router.isReady])
  return (
    <div className="bg-[#1e293b] min-h-[100vh] ">
    <Nav />
    <div >
    <div className=" flex flex-col gap-3 items-center ">
      <Message {...routeData} ></Message>
      </div>
      <div className="my-4  ">
        
        <div className="py-6  ">
          <h2 className="font-bold text-white mx-3">Comments</h2>
          <div className="flex items-center flex-col gap-4 w-[100%]">
          {allMessages?.map((message) => (
            
            <div className="bg-[#e2e8f0] p-4  border-2   rounded-md  w-[80%]" key={message.time}>
              <div className="flex gap-4 items-center mb-4">
                <img src={message.avatar}  className="w-10 rounded-full" referrerPolicy='no-referrer'/>
                <h2 className="text-sm"> {message.username}</h2>
              </div>
              <h2 className="break-all">{message.message}</h2>
            </div>
          ))}
          <div className="flex  items-center w-[80%]">
          <input
            type="text"
            value={message}
            placeholder="Write a new comment 😀"
            onChange={(e) => setMessage(e.target.value)}
            className="bg-[#e2e8f0] w-full  center  text-sm p-2 "
          />
          <button className="bg-[#6B728E] text-white py-2 px-4 text-sm p-3" onClick={submitMessage}>
            Send
          </button>
        </div>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  );
}
