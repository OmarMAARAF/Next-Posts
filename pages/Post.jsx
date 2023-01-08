import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./../utils/firebase";
import { useRouter } from "next/router";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify";
import Nav from "../components/Nav";

export default function Post() {
  //form State
  const [post, setPost] = useState({ description: "" });
  
  const Router = useRouter()
  const routeData =Router.query
  const [user, loading] = useAuthState(auth);
  console.log(user);
  const submitPost =async (e)=>{
    e.preventDefault();
    //run checks for description
    if(!post.description){
        toast.error("Description field empty",{
            position:'top-center',
            autoClose:1500
        })
        return
    }
    if(post.description >300){
        toast.error("Description too long",{
            position:'top-center',
            autoClose:1500
        })
        return
    }

    if(post?.hasOwnProperty("id")){
      const docRef = doc(db,"posts",post.id);
      const updatedPost ={...post,timestamp:serverTimestamp()}
      await updateDoc (docRef,updatedPost)
      /* toast.success("Post edited successfully") */
      return Router.push("/")
    }
    else{
      //make a new post
    const collectionRef =collection(db,'posts')
    await addDoc(collectionRef ,{
        ...post, timestamp :serverTimestamp(), user : user.uid, avatar:user.photoURL ,username :user.displayName, 
    })
    setPost({description:""})
    /* toast.success("New post has been made") */
    Router.push("/")
    }
  }
  //check our user
  const checkUser =async ()=>{
    if (routeData.id){
      setPost({description:routeData.description,id:routeData.id})
    }
  }
  useEffect(()=>{
    checkUser()
  },[user,loading])

  return (
    <div className=" h-screen bg-[#1e293b]">
      <Nav />
      <div className="my-20 p-12 shadow-lg rounded-lg mx-auto w-[500px] text-gray-700 bg-[#e2e8f0]">
      
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold ">{post.id ? "Edit your post":"Create a new post"}</h1>
        <div className="py-2 text-lg ">
          <h3 className="py-3">Description</h3>
          <textarea
            className="bg-[#e2e8f0]  border border-gray-700 w-full h-48 text-gray-800 rounded-lg p-2 text-sm"
            value={post.description}
            onChange={(e) => setPost({...post, description :e.target.value})}
          ></textarea>
          <p className={post.description.length > 300 ? "text-red-700" : ""}>
            {post.description.length}/300
          </p>
          <button className="w-full bg-[#1e293b] font-meduim p-4 text-[18px] my-2 rounded-lg text-white text-sm " type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
    
  );
}
