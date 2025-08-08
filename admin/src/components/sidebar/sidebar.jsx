import "./sidebar.css"
import {assets} from "../../../public/admin_assets/assets.js"
import { NavLink } from "react-router-dom"
const sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
          <NavLink to={'/additem'}className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
          </NavLink>
        <NavLink to={'/'} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to={'/order'} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default sidebar
