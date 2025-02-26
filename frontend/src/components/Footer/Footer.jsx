import "./Footer.css"
import { assets } from "../../../public/assets/frontend_assets/assets"

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" className="footer-logo"/>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non repudiandae a, magnam eum nam consequatur maxime nemo ut, labore enim atque cum minima culpa quod illum qui architecto aspernatur nostrum.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+123-456-7890</li>
                        <li>contact@foodomart.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                copyright 2025 FoodoMart.com - All Right Reserved.
            </p>
        </div>
    )
}

export default Footer
