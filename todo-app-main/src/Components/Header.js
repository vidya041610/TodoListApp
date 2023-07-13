import React from 'react'
import  logo  from "../Images/icons8-checklist-53.png";

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-light bg-warning">
  <div className="container-fluid">
    <div className="navbar-brand">
      <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top" />
      To-Do App
    </div>
  </div>
</nav>
    </>
  )
}

export default Header