import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { auth, db } from "./../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

export default function Home() {
  //create  a state with all post
  const [allPosts, setAllPosts] = useState([]);
  const gatPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    //if a post update we can see it without reloading the page
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(),id:doc.id })));
    });
    return unsubscribe;
  };
  useEffect(()=>{
    gatPosts()
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title> App </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-12 text-lg font-meduim mx-3">
        <h2>Other people posts</h2>
        {allPosts.map((post) => (
        <Message {...post} key={post.id}>
          <Link href={{pathname:`/${post.id}`,query:{...post}}}>
            <button>{post.comments?.length> 0 ?post.comments?.length:"0"} Comments</button>
          </Link>
        </Message>))}
      </div>
    </div>
  );
}