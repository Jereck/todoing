import React from 'react'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <div className="flex border-b justify-between px-5 py-2 items-center">
      <div>
        <h1 className="text-xl font-bold">
          <span className="text-blue-500">Todo</span>ing
        </h1>
      </div>
      <div>

      </div>
      <div className="flex items-center">
        <UserButton />
      </div>
    </div>
  )
}

export default Header