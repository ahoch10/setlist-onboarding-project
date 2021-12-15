import React, { FC } from 'react'

const App: FC = () => {

  const handleLogin = () => {
    fetch("/login")
  }

  return (
    <div>
    <h1 className="welcome">Welcome</h1>
    <button type="button" onClick={handleLogin}>Login with Spotify</button>
    </div>
  )

}

export default App
