import { createContext, useState } from "react";
import { food_list } from "../assets/assets";
import axios from 'axios'
import { useEffect } from "react";
export const storeContext = createContext();

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    const [food_list, setFoodList] = useState([])
    const url = 'https://foodapp-full-stack.onrender.com'
    const [token, setToken] = useState("")

    const fetchFoodList = async () => {
        const response = await axios.get(url + '/api/food/list')
        setFoodList(response.data.data)
    }
    useEffect(() => {
    async function loadData() {
        await fetchFoodList()
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
    }

    loadData(); 
}, []);
useEffect(() => {
    if (token) {
        loadCartData(token);
    } else {
        setCartItems({});
    }
}, [token]);

    const loadCartData = async(token)=>{
        const response = await axios.get(url+"/api/cart/get",{headers:{token}})
        setCartItems(response.data.cartData)
    }



const addToCart =async (itemId) => {
    if (!cartItems[itemId])
        setCartItems({ ...cartItems, [itemId]: 1 })
    else {
        setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 })
    }
    if(token){
        try {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        } catch (error) {
            console.log(error)
        }
    }

}

const removeFromCart = async (itemId) => {
    setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });

    if (token) {
        try {
            await axios.delete(`${url}/api/cart/remove`, {
                headers: { token },
                params: { itemId }
            });
        } catch (error) {
            console.log(error);
        }
    }
};


const getTotalCartAmount = () => {
    let total = 0;
    for (let item in cartItems) {
        if (cartItems[item] > 0) {
            let itemInfo = food_list.find(food => food._id === item)
            total += itemInfo.price * cartItems[item];
        }
    }
    return total;
}

const contextValues = {
    food_list,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData
}
return (
    <storeContext.Provider value={contextValues}>
        {props.children}
    </storeContext.Provider>
)
}

export default StoreContextProvider;
