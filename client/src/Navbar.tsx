import React from 'react'

const Navbar = () => {
  const logout = () => {
    fetch('/logout')
      .then((res) => window.location.reload())
      .catch((err) => console.log('error logging out', err))
  }

  return (
    <div className="navbar">
      <div className="logout" onClick={logout}>
        Logout
      </div>
    </div>
  )
}

export default Navbar
