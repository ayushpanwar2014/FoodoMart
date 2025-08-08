import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from './components/Footer/Footer'
import Login from './components/LoginPopUp/Login'
import Verify from './pages/Verify/Verify'
import MyOrder from './pages/Order/MyOrder'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrder />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </>
  )
}

export default App
