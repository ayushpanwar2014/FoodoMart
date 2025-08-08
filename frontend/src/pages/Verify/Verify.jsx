import { useSearchParams } from "react-router-dom"
import "./Verify.css"
import { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId")
    const { url } = useContext(StoreContext);
    

    const verifyPayment = async () => {

        const response = await axios.post(`${url}/api/order/verify`, {
            success, orderId
        })

        if (response.data.success) {
            window.location.replace('/myorders');
        }
        else {
            window.location.replace('/');
        }
    }

    useEffect(() => {
        verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className="verify">
            <div style={{ display: success === true ? '' : 'none' }} className="spinner"></div>
            {success &&
                <>
                    <h1> Order Not Placed -:</h1>
                    <h2>Sorry, Go back to FoodoMart and Order Again !</h2>
                </>
            }
        </div>
    )
}

export default Verify
