import React, { useState, useEffect } from 'react'
import AllSetlists from './AllSetlists'

type Status = 'loading' | 'logged-in' | 'not-logged-in'

const App = () => {
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    fetch('/user_info')
      .then((res) => res.json())
      .then((data) => {
        if (data['user_email']) {
          setStatus('logged-in')
        } else {
          setStatus('not-logged-in')
        }
      })
      .catch(() => setStatus('not-logged-in'))
  }, [])

  if (status === 'loading') return <>Loading...</>
  if (status === 'logged-in') return <AllSetlists />
  return (
    <div>
      <h1 className="welcome">Welcome to My Setlists</h1>
      <a className="login" href="http://localhost:5000/login">Login with Spotify</a>
    </div>
  )
}

export default App
