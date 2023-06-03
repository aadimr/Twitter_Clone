import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import style from './Footer.module.css'


const Footer = () => {
  const navigate = useNavigate()

  function handleLogout(){
    const userDetails = JSON.parse(localStorage.getItem('userData')) || []
  const userName = userDetails.find((name) => name.active.isActive === true)

  if(userName){
    userName.active.isActive = false
    localStorage.setItem('userData', JSON.stringify(userDetails))
    navigate('/login')
  }

  }
  return (
    <div className={style.container}>
         <div className={style.title}>
         <h1>Dont't miss What happing</h1>
            <p>People on Twitter are the first to know.</p>
         </div>
        <div className={style.userField}>
            <NavLink to='/login'className={style.login}>Sig In</NavLink>
            <NavLink to='/signup'className={style.register}>Sign Up</NavLink>
            <NavLink onClick={handleLogout} className={style.register}>Log out</NavLink>
        </div>
    </div>
  )
}

export default Footer