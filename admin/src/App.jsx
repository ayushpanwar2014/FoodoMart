import Navbar from "./components/navbar/navbar"
import Sidebar from "./components/sidebar/sidebar"
import { Route, Routes } from "react-router-dom"
import AddItem from "./pages/Additem/additem"
import ListFood from "./pages/ListFood/listfood"
import MyOrder from "./pages/Order/MyOrder"
import "./index.css"
import { ToastContainer} from 'react-toastify';

function App() {
  const url = import.meta.env.VITE_BACKEND_URL;
  return (
    <div>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route exact path={'/additem'} element={<AddItem url={url}/>} />
          <Route exact path={'/'} element={<ListFood url={url}/>} />
          <Route exact path={'/order'} element={<MyOrder url={url}/>} />
        </Routes>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App
