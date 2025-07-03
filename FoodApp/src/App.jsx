import React, { useState } from 'react'
import "./index.css"
import Navbar from './components/Navbar/Navbar.jsx';
import {Route,Routes} from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx';
import Cart from './screens/Cart/Cart.jsx'
import Home from './screens/Home/Home.jsx'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder.jsx';
import LoginPopUp from './components/LoginPopUp/LoginPopUp.jsx';
import { ToastContainer } from 'react-toastify';
import Verify from './screens/Verify/Verify.jsx';
import MyOrders from './screens/MyOrders/MyOrders.jsx';

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    <ToastContainer />
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>}
    <div className="app">
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={<PlaceOrder/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path='/myorders' element={<MyOrders/>} ></Route>
      </Routes>
    </div>
    <Footer />
     
    </>
    
  )
}

export default App