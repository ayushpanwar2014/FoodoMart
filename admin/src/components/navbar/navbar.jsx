import "./navbar.css"

import {assets} from "../../../public/admin_assets/assets.js"

const navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-name">
      <img className="logo" src={assets.logo} alt="" />
      <p>Admin Panel</p>
      </div>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  )
}

export default navbar
