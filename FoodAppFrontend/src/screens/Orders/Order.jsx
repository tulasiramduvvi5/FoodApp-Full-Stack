import React from 'react'
import './Order.css'
import { useEffect,useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
const Order = ({url}) => {

  const [orders,setOrders] = useState([])
  const fetchAllOrder = async()=>{
    try {
      const response = await axios.get(url+"/api/order/list")
    setOrders(response.data.data)
    console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async(e,orderId)=>{
    try {
      const response = await axios.post(url+"/api/order/status",{orderId,status:e.target.value})
      await fetchAllOrder()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAllOrder()
  },[])
  return (
     <div className="screen order">
            <h1>Order Page</h1>
            <div className="order-list">
                {orders.map((order, index) => {
                    return (
                        <div key={index} className="order-item">
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <p className="order-item-food">
                                    {order.items.map((item, itemIndex) => {
                                        if (itemIndex === order.items.length - 1) {
                                            return item.name + " x " + item.quantity;
                                        } else {
                                            return item.name + " x " + item.quantity + ", ";
                                        }
                                    })}
                                </p>
                                <p className="order-item-name">{order.address.first_name + " " + order.address.last_name}</p>
                                <div className="order-item-address">
                                    <p>{order.address.street + ", "}</p>
                                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zip_code +", "}</p>
                                </div>
                                <p className="order-item-phone">{order.address.phone}</p>
                            </div>
                            <p>Items: {order.items.length}</p>
                            <p>₹{order.amount}</p>
                            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
  )
}

export default Order