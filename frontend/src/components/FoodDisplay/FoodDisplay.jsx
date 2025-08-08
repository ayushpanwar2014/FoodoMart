/* eslint-disable react/prop-types */
import { useContext } from "react"
import "./FoodDisplay.css"
import {StoreContext} from "../../Context/StoreContext"
import FoodItem from "../FoodItem/FoodItem"

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
    
  return (
    <div className="food_display" id="food_display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {
            food_list.filter((item) => category === "All" ? true : item.category === category).map( (item,index) => {


                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>


            })
        }
      </div>
    </div>
  )
}

export default FoodDisplay
