import React from 'react'

const Header = () => {
  return (
    <div className="flex border-b justify-between px-5 py-2">
      <div>
        <h1 className="text-xl font-bold">
          <span className="text-blue-500">Todo</span>ing
        </h1>
      </div>
      <div>

      </div>
      <div>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Header