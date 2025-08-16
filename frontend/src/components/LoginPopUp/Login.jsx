import { useContext, useState } from "react"
import "./Login.css"
import { assets } from "../../../public/assets/frontend_assets/assets";
import axios from "axios"
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import { useProgress } from "../../Context/ProgressContext";

const Login = ({ setShowLogin }) => {

  const [currState, setCurrState] = useState("Login");
  const { setToken, url } = useContext(StoreContext);
  const { startProgress, completeProgress } = useProgress();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      startProgress();
      const response = await axios.post(`${url}/api/user/login`, {
        email,
        password
      })

      if (response.data.success) {

        setShowLogin(false);
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        completeProgress();
        window.location.replace('/')
      }

    } catch (error) {
      completeProgress();
      console.log(error);
      toast.error("Wrong Credentials");
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      startProgress();
      const response = await axios.post(`${url}/api/user/register`, {
        username,
        email,
        password
      })

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setShowLogin(false);
        completeProgress();
        toast.success('Account Created!');
      }

    } catch (error) {

      console.log(error);
      toast.error("Wrong Credentials");
      completeProgress();

    }
  }

  return (
    <div className="login-popup">
      <form onSubmit={currState === 'Sign Up' ? handleSignUp : handleLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name="username" type="text" placeholder="User Name" required />
          }
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {
          currState === "Login" ? <p >Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            : <p >Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }

      </form>
    </div>
  )
}

export default Login
