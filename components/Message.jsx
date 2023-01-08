import React from 'react'

export default function Message({children,avatar,username,description,timestamp}) {
  return (
    <div className='bg-[#e2e8f0] p-8 border-b-2 rounded-lg w-[80%]'>
        <div className='flex items-center justify-start gap-2'>
            <img src={avatar} className="rounded-full w-10 " referrerPolicy='no-referrer'/>
            <h2 className='text-sm  '>{username}</h2>
        </div>
        <div className='py-4 mt-2'>
            <p>{description}</p>
            
        </div>
        {children}
    </div>
  )
}
