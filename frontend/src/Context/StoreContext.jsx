import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { useProgress } from "./ProgressContext";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [user, setUser] = useState("");
    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState("");
    const { startProgress, completeProgress } = useProgress();

    const [food_list, setFoodList] = useState([]);
    

    const getUser = async (token) => { 
        const response = await axios.get(`${url}/api/user/getUser`,{headers: {token}});

        if(response.data.success){
          setUser(response.data.data);
        } 
  }


    const addToCart = async (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            await axios.post(`${url}/api/cart/addtocart`, { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {

        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if (token) {
            await axios.post(`${url}/api/cart/removetocart`, { itemId }, { headers: { token } })
        }
    }



    const getTotalCartAmount = (itemId) => {
        let totalAmount = 0;
        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    const fetchfood_list = async () => {
        startProgress();
        const response = await axios.get(`${url}/api/food/foodlist`);

        setFoodList(response.data.data)
        completeProgress()
    }

    const loadCartData = async (token) => {

        const response = await axios.post('http://localhost:8800/api/cart/fetchcart', {}, { headers: { token } });

        setCartItems(response.data.cartData);

    }

    useEffect(() => {

        async function loadData() {

            await fetchfood_list();

            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
                await getUser(localStorage.getItem('token'));
            }
        }

        loadData();

    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        url,
        user
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;