import "./AppDownload.css"
import {assets} from "../../../public/assets/frontend_assets/assets"

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
        <p>For Better Experience Download <br/> FoodoMart App</p>
        <div className="app-download-platforms">
            <img src={assets.app_store} alt="" />
            <img src={assets.play_store} alt="" />
        </div>
    </div> 
  )
}

export default AppDownload
