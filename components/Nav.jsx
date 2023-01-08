import React, { useEffect } from 'react'
import Link from 'next/link'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from 'next/router'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


export default function Nav() {
  const [user, loading] = useAuthState(auth);
  console.log(user)
  const Router = useRouter()

  const checkUser =()=>{
    if(!user){
      Router.push("./auth/Login")
    }
  }
  useEffect(()=>{
      checkUser()
  },[user,loading])

  const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    const signOut =(event)=>{
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
      auth.signOut();
    }



  return (
    <div className='text-white mb-3 bg-[#1e293b]' >
    <nav className=' flex justify-between items-center h-[50px] py-10 mx-3' >
      
        <Link href="/"><button className='text-lg font-meduim'>Creative Minds</button></Link>
        
        <ul className='flex items-center gap-10'>
         {!user &&(
<Link href="/auth/Login"  ><a className='bg-cyan-500 px-4 rounded-lg font-medium text-white ml-8 py-2'>Join Now</a></Link>
      )} 
      {user&&(
       <div className='flex gap-6 items-center'>
        <Link href={"/Post"}>
        <button className='font-medium bg-[#6B728E] text-white py-2 px-4 rounded-lg'>
          New post
        </button></Link>
        <img src={user.photoURL} className="rounded-full w-10 cursor-pointer" ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            referrerPolicy='no-referrer'/>
        <div>
          
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <Link href={"/Dashboard"}><MenuItem onClick={handleClose}>{user.displayName}</MenuItem></Link>
                      <MenuItem onClick={signOut}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
       </div>
      )}
        </ul>
    </nav>

    </div>
  )
}
