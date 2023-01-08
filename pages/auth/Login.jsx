import React, { useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup,FacebookAuthProvider,updateProfile} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import {BsFacebook,BsGoogle} from"react-icons/bs"
import { useRouter } from 'next/router'
export default function Login() {
    const googgleProvider = new GoogleAuthProvider();
    const [user, loading] = useAuthState(auth);
    const Router = useRouter()
    //sign in with facebook
  const fbProvider =new FacebookAuthProvider();
  const FacebookLogin = async () => {
    try {
      const result =await signInWithPopup(auth, fbProvider)
      const credantial = await FacebookAuthProvider.credentialFromResult(result)
      const token =credantial.accessToken;
      let photoUrl =result.user.photoURL + "?height=500&access_token="+token
      await updateProfile (auth.currentUser,{photoURL:photoUrl})
      console.log(result)
      Router.push("../Dashboard");
    } catch (error) {
      console.log(error);
    }
  }
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
    <div className='login shadow-xl flex flex-col gap-4 text-gray-700 items-center justify-center h-screen bg-[#1e293b] '>
      <div className='flex flex-col gap-4 items-center bg-[#e2e8f0] p-5 rounded-lg'>
        <h2 className='text-2xl font-meduim '>Join Today</h2>
      <div className='py-4 flex items-center flex-col w-[400px]' >
        <h3>
          Sign in with one of the provider
        </h3>
        <button className=' bg-[#f26052] text-white w-[350px]  p-2 rounded-md my-4 font-medium flex  justify-center cursor-pointer'onClick={GoogleLogin}><BsGoogle size={25} className="mx-3"></BsGoogle> <p>Sign in  With Google</p> </button>
        <button className=' bg-[#527bcc] text-white w-[350px]  p-2 rounded-md my-2 font-medium flex  justify-center cursor-pointer'onClick={FacebookLogin}><BsFacebook size={25} className="mx-3"></BsFacebook> <p>Sign in  With Facebook</p> </button>
      </div>
        
      </div>
      
    </div>
  )
}
