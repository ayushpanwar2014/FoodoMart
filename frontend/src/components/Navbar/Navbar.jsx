import "./Navbar.css"
import {assets} from "../../../public/assets/frontend_assets/assets" 
import { useContext, useState } from "react"
import {Link} from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { useProgress } from "../../Context/ProgressContext";

// eslint-disable-next-line react/prop-types
const Navbar = ({setShowLogin}) => {
  const { startProgress, completeProgress } = useProgress();
  const [menu, setMenu] = useState("home");
  const [open, setOpen] = useState('none');
  const {getTotalCartAmount, token, setToken, user} = useContext(StoreContext);

  const logout = () => {
    startProgress();
    localStorage.removeItem('token')
    setToken("");
    completeProgress();
    window.location.replace('/');
  } 

  const handleClick = () => {
    if(open === 'flex'){
      setOpen('none');
    }
    else if(open === 'none'){
      setOpen('flex');
    }
  }


  return (
    <div className="navbar">
      <Link to="/">
            <img src={assets.logo} className="logo" alt="" />
      </Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")}  className={menu === "home" ? "active1" : ""}>Home</Link>
                <a href="#explore-menu" onClick={() =>setMenu("menu")} className={menu === "menu" ? "active1" : ""}>Menu</a>
                <a href="#app-download" onClick={() =>setMenu("mobile-app")} className={menu === "mobile-app" ? "active1" : ""}>Mobile-App</a>
                <a href="#footer" onClick={() =>setMenu("contact-us")} className={menu === "contact-us" ? "active1" : ""}>Contact us</a>
            </ul>

            <div className="navbar-right">

                <p style={{color: "gray"}}>{user.username}</p>

                <div className="navbar-search-icon">
                  <Link to="/cart">
                    <img src={assets.basket_icon} alt="" />
                  </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {
                  !token ? <button onClick={() => setShowLogin(true)} className="navbar-btn" >Sign In</button> : 
                  <div onClick={handleClick} className="navbar-profile">
                    <img src={assets.profile_icon} alt="" />
                    <ul style={{display: open}} className="navbar-profile-dropdown">
                      <Link to={'/myorders'}>
                      <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                      </Link>
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
