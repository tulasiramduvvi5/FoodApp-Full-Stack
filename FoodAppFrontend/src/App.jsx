import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from "react-router-dom"
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Order from './screens/Orders/Order'
import {ToastContainer} from 'react-toastify'
import "./App.css"

const url='https://foodapp-full-stack.onrender.com'

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Add url={url} />}/>
             <Route path="/add" element={<Add url={url} />}/>
          <Route path="/list" element={<List url={url} />}/>
          <Route path="/order" element={<Order url={url} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
