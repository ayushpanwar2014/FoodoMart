import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import "./listfood.css"

const listfood = (props) => {
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    const response = await axios.get(`${props.url}/api/food/foodlist`);


    if (response.data.success) {

      setList(response.data.data);

      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }

  }

  const removefood = async (foodId) => {

    console.log(foodId)

    try {

      const resp = await axios.post(`${props.url}/api/food/removefood`, {
        id: foodId
      })
      await fetchlist();
      
      if (resp.data.success) {
        toast.success(resp.data.message);
        
      }
      else {
        toast.error(resp.data.message);
      }

    } catch (error) {

      console.log('Food item is not removed');
    }

  }

  useEffect(() => {
    fetchlist();

  }, [])

  return (
    <div className="list additem flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format scroll">
                <img src={`${props.url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className="cursor" onClick={() => removefood(item._id)}>Remove</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default listfood
