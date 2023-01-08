import Nav from "./Nav";
import React from 'react'

export default function Layout({children}) {
  return (
    <div className="">
        
        <main>
            {children}
        </main>
    </div>
  )
}
