import "./additem.css";
import { assets } from "../../../public/admin_assets/assets";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";


const additem = (props) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  })

  const changeHandler = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    const formdata = new FormData();

    formdata.append('name', data.name);
    formdata.append('description', data.description);
    formdata.append('price', Number(data.price));
    formdata.append('category', data.category);
    formdata.append('image', image);

    const response = await axios.post(`${props.url}/api/food/addfood`, formdata);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      })
      setImage(false);
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }

  }

  return (
    <div className="additem">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={changeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={changeHandler} value={data.description} name="description" id="description" rows="6" placeholder="Write content here" required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={changeHandler} value={data.category} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={changeHandler} value={data.price} type="Number" name="price" placeholder="$0" required />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  )
}

export default additem
