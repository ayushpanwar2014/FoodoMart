
import { StoreContext } from "../../Context/StoreContext"
import { Link } from "react-router-dom"
import "./Cart.css"
import { useContext } from "react"

const cart = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url } = useContext(StoreContext);
  
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index) => {
          if (cartItems[item._id] > 0) {
            return (<>
              <div key={index} className='cart-items-title cart-items-item'>
                <img src={url + "/images/" + item.image} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={() => addToCart(item._id)} className='add'>+</p>
                <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
            </>
            )
          }
        })}
      </div>
        {getTotalCartAmount() === 0 && 
        <>
        <h1 style={{color: 'red', textAlign: 'center', marginTop: "40px"}}  >Your Cart is Empty!</h1>
        </> }
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : 2 + getTotalCartAmount()}</b>
            </div>
          </div>

          <Link to="/order">
            <button>PROCEED TO CHECKOUT</button>
          </Link>

        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default cart
