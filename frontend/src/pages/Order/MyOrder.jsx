import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import "./MyOrder.css"
import { StoreContext } from "../../Context/StoreContext"
import { assets } from "../../../public/assets/frontend_assets/assets"
import { toast } from 'react-toastify';

const MyOrder = () => {

  const [order, setOrder] = useState([]);
  const { url, token } = useContext(StoreContext);

  const FetchOrder = async () => {
    try {

      const userOrder = await axios.post(`${url}/api/order/userorder`, {}, { headers: { token } });
      setOrder(userOrder.data.data)

    } catch (error) {

      console.log("Order error!" + error)
    }
  }

  const handleToRemove = async (id) => {
    try {

      const response = await axios.post(`${url}/api/order/removeOrder`, { id });

      if (response.data.success) {
        toast.success("Order Removes!")
        FetchOrder();
      }

    } catch (error) {
      toast.error("Order not removed!" + error)
    }
  }

  useEffect(() => {
    if (token) {
      FetchOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div className="my-order">
      <h2>My Orders</h2>
      <div className="container">
        {order.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity
                }
                else {
                  return item.name + " x " + item.quantity + ", "
                }
              })}</p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={FetchOrder}>Track Order</button>
              <button onClick={() => { handleToRemove(order._id) }}>Remove</button>
            </div>
          )
        })}
        {
          order.length === 0 &&
          <>
            <h1 style={{ color: 'red', textAlign: 'center' }}>You Have not Orderd Yet!</h1>
          </>
        }
      </div>
    </div>
  )
}

export default MyOrder