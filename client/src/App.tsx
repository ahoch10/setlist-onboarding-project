import React, { FC, useState, useEffect } from 'react'
import AllSetlists from './AllSetlists'

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=> {
    fetch('/isloggedin').then(res=> res.json()).then(data => {
      if (data["user_email"]) {
        setIsLoggedIn(true)
      }
    })
  })

  if (isLoggedIn) return (<AllSetlists />)
  else return (
    <div>
    <h1 className="welcome">Welcome</h1>
    <a href="http://localhost:5000/login">Login with Spotify</a>
    </div>
  )

}

export default App
