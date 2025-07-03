import React,{useContext} from 'react'
import { storeContext } from '../../context/storeContext'
import FoodCart from '../FoodCart/FoodCart';
import "./FoodDisplay.css"
const FoodDisplay = ({category}) => {
    const {food_list} = useContext(storeContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes Near You</h2>
        <div className="food-display-list">
            {
                food_list.map((item,index)=>{
                    if(category==="All" || category===item.category)
                    return <FoodCart id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
                })
            }
        </div>
    </div>
  )
}

export default FoodDisplay