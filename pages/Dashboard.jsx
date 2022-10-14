import React, { useEffect, useState } from "react";
import { auth, db } from "./../utils/firebase";
import Message from "../components/Message";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {BsTrash2Fill} from "react-icons/bs";
import {AiFillEdit} from "react-icons/ai"
import Link from "next/link";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [user, loading] = useAuthState(auth);
  const getData = async () => {
    if(loading) return
      const collectionRef = collection(db, "posts");
      const q = query(collectionRef, where("user", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({...doc.data(),id: doc.id,}))
        );
      });
      console.log("posts", posts);
      return unsubscribe;
    
  };
  //Delete Post
  const deletePost =async (id)=>{
    const docRef = doc(db,'posts',id)
    await deleteDoc (docRef)
  }
  useEffect(() => {
    getData();
  }, [user,loading]);

  return (
    <div className="mx-3">
      Your posts
      <div>{posts.map((post) => {return( <Message {...post} key={post.id} >
        <div className="flex gap-4">
          <button className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm" onClick={()=>deletePost(post.id)}><BsTrash2Fill className="text-2xl"/> Delete</button>
          <Link href={{pathname:"Post",query:post}}><button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm"><AiFillEdit className="text-2xl"/>Edit</button></Link>
        </div>

      </Message>)})}</div>
      <button
        onClick={() => auth.signOut()}
        className="bg-red-500 text-white rounded-lg px-4 py-2"
      >
        Sign out
      </button>
    </div>
  );
}
