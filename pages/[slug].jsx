import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
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
    <div className="mx-3">
      <Message {...routeData}></Message>
      <div className="my-4  ">
        <div className="flex">
          <input
            type="text"
            value={message}
            placeholder="Send a message 😀"
            onChange={(e) => setMessage(e.target.value)}
            className="bg-gray-800 w-full p-2 text-white text-sm"
          />
          <button className="bg-cyan-500 text-white py-2 px-4 text-sm" onClick={submitMessage}>
            Submit
          </button>
        </div>
        <div className="py-6 ">
          <h2 className="font-bold">Comments</h2>
          {allMessages?.map((message) => (
            <div className="bg-white p-4 my-4 border-2" key={message.time}>
              <div className="flex gap-4 items-center mb-4">
                <img src={message.avatar}  className="w-10 rounded-full"/>
                <h2 className="text-sm"> {message.username}</h2>
              </div>
              <h2>{message.message}</h2>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
