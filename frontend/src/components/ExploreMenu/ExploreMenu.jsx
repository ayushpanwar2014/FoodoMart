/* eslint-disable react/prop-types */
import "./ExploreMenu.css"
import { menu_list } from "../../../public/assets/frontend_assets/assets"

const ExploreMenu = ({category, setCategory}) => {
    return (
        <div className="explore-menu" id="explore-menu">
            <h1 onClick={() => setCategory("All")} >Explore our menu</h1>
            <p className="explore-menu-text">Satisfy your cravings with just a few clicks! 🍔🍕 Order your favorite dishes here and enjoy a delightful culinary experience, delivered straight to your doorstep. Your taste buds deserve the best! 😋🍽️</p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item,index) => {

                        return (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu
