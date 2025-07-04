import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  
  const [data,setData] =  useState([]);
  const {url,token,currency} = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.data)
  }

  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>Мои заказы</h2>
      <div className="container">
        {data.length === 0 ? (
          <div className="no-orders">
            <p>У вас пока нет заказов</p>
          </div>
        ) : (
          data.map((order, index) => {
            return (
              <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}</p>
                <p>Количество: {order.items.length}</p>
                <p>{currency}{order.amount}.00</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MyOrders
