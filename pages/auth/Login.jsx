import React, { useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import {FcGoogle} from "react-icons/fc"
import { useRouter } from 'next/router'
export default function Login() {
    const googgleProvider = new GoogleAuthProvider();
    const [user, loading] = useAuthState(auth);
    const Router = useRouter()
    useEffect (()=>{
      if(user){
        Router.push("../Dashboard")
      }
    },[user])
    const GoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, googgleProvider);
          console.log(result.user);
          Router.push("../Dashboard");
        } catch (error) {
          console.log(error);
        }
    }
  return (
    <div className='shadow-xl mt-32 mx-3 p-10 flex flex-col gap-4 text-gray-700 items-center'>
      <h2 className='text-2xl font-meduim '>Join Today</h2>
      <div className='py-4 flex items-center flex-col'>
        <h3>
          Sign in with one of the provider
        </h3>
        <button className='text-xl bg-gray-700 text-white w-[400px]  p-3 rounded-md my-4 font-medium flex  justify-center'onClick={GoogleLogin}><FcGoogle size={30} className="mx-3"></FcGoogle> Sign in  With Google</button>
      </div>
        
    </div>
  )
}
