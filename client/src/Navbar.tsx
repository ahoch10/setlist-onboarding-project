import React from 'react'

const Navbar = () => {
  const logout = () => {
    fetch('/logout')
      .then((res) => console.log(res))
      .catch((err) => console.log('error logging out', err))
  }

  return <div className="navbar" onClick={logout}>Logout</div>
}

export default Navbar
