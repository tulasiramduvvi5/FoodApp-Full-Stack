import React,{useContext, useState,useEffect} from 'react'
import {assets} from '../../assets/assets'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { storeContext } from '../../context/storeContext'
import {useNavigate} from 'react-router-dom'

const Navbar = ({showLogin,setShowLogin}) => {

  const [menu,setMenu]=useState('home')
  const {getTotalCartAmount,token,setToken,setCartItems} = useContext(storeContext)
  const navigate = useNavigate()
  const logout=async()=>{
    localStorage.removeItem("token");
    setToken("")
    navigate('/')
     setCartItems({});
  }

  

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <ul className='navbar-menu'>
        < Link to='/' onClick={()=>setMenu("home")} className={menu=="home"?"active":""}>Home</Link>
         <a href="#explore-menu"><li onClick={()=>setMenu("menu")} className={menu=="menu"?"active":""}>Menu</li></a>
          <a href="#footer"><li onClick={()=>setMenu("contact-us")} className={menu=="contact-us"?"active":""}>Contact</li></a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-basket-icon">
          <Link to="/cart" ><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {
          !token
          ?<button onClick={()=>setShowLogin(true)}>Sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <Link to="/myorder"><img src={assets.bag_icon} alt="" /><p>Orders</p></Link>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar