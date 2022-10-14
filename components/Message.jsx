import React from 'react'

export default function Message({children,avatar,username,description,timestamp}) {
  return (
    <div className='bg-white p-8 border-b-2 rounded-lg'>
        <div className='flex items-center justify-start gap-2'>
            <img src={avatar} className="rounded-full w-10 "/>
            <h2 className='text-sm  '>{username}</h2>
        </div>
        <div className='py-4 mt-2'>
            <p>{description}</p>
            
        </div>
        {children}
    </div>
  )
}
