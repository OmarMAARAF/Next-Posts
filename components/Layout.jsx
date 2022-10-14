import Nav from "./Nav";
import React from 'react'

export default function Layout({children}) {
  return (
    <div>
        <Nav />
        <main>
            {children}
        </main>
    </div>
  )
}
