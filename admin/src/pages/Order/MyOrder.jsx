import { useEffect, useState } from "react"
import axios from 'axios'
import "./MyOrder.css"
import { assets } from "../../../public/admin_assets/assets.js"
import { toast } from "react-toastify"

const MyOrder = ({ url }) => {

  const [order, setOrder] = useState([]);

  const FetchOrder = async () => {
    try {

      const userOrder = await axios.get(`${url}/api/order/list`,);

      if (userOrder.data.success) {

        setOrder(userOrder.data.data)
      }
      else {
        toast.warn("Order did not Fetching!")
      }

    } catch (error) {

      console.log("Order error!")

    }
  }

  useEffect(() => {

    FetchOrder();

  }, [])

  const statusHandler = async (e, _id) => {

    const response = await axios.post(`${url}/api/order/status`, {
      _id : _id,
      status : e.target.value
    } )

    if(response.data.success){
      await FetchOrder()
    }

  }

  return (
    <div className="order additem flex-col">
      <h2>Orders Page</h2>
      <div className="order-list">
        {order.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " X " + item.quantity
                      }
                      else {
                        return item.name + " X " + item.quantity + ", "
                      }
                    })
                  }
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street}</p>
                  <p>{order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>Amount : ${order.amount}</p>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
                  
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrder
