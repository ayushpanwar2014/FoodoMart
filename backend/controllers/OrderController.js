import OrderModel from "../model/OrderModel.js";
import UserModel from "../model/UserModel.js"
import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51QuEHrF3TpqoxVxvUHPJBz61f4NhexykhZdtk0Pb4WO0MR5MGNzBeTStV3IUPoYs3JG2aUkOVaY2tIHGv9jRcVJh00L0cfpGFZ");

//Place Order for Frontend
export const placeOrder = async (req, res) => {

    const frontend_url = process.env.FRONTEND_URL;

    try {

        //new Order
        const newOrder = new OrderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        //Save
        await newOrder.save();
        //Empty the User CartData
        await UserModel.findByIdAndUpdate(req.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Deliver Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.status(200).json({ success: true, session_url: session.url, newOrder })

    } catch (error) {

        res.status(400).json({ success: false, message: "Order not Placed!" })

    }

}

//verifyOrder

export const verifyOrder = async (req, res) => {

    const { orderId, success } = req.body;

    try {

        if (success === 'true') {

            await OrderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: "Paid" })
        }
        else {
            await OrderModel.findByIdAndDelete({ _id: orderId });
            res.status(500).json({ success: false, message: "Not Paid" })
        }

    } catch (error) {

        res.status(400).json({ success: false, message: "Payment Not Proceed!" })
    }
}

//user orders for frontend
export const userOrders = async (req, res) => {

    try {


        const data = await OrderModel.find({ userId: req.userId });

        res.status(200).json({ success: true, data });


    } catch (error) {

        res.status(400).json({ success: false, message: "User Not made any Order" });

    }
}


//Fetch Order for admin panel
export const fectchAllOrder = async (req, res) => {
    try {

        const orders = await OrderModel.find({});
        res.status(200).json({ success: true, data: orders });

    } catch (error) {
        res.status(400).json({ success: false, message: "Cannot Fetch Order!" });
    }
}

//updating Status of order for admin panel
export const updateStatus = async (req, res) => {

    const { _id, status } = req.body;

    try {

         await OrderModel.findByIdAndUpdate(_id, { status: status });

        res.status(200).json({ success: true, message: "Status Updated" });


    } catch (error) {
        res.status(400).json({ success: false, message: "Cannot Update Status Order!" });
    }

}

export const removeOrder = async (req, res) => {


    try {
        
        const removeOrder = await OrderModel.findById({_id : req.body.id});

        if(!removeOrder) return res.status(400).json({ success: false, message: "There is no order with this ID!" });

        await OrderModel.findByIdAndDelete({_id: req.body.id});

        res.status(200).json({ success: true, message: "Order Removed" });
        
    } catch (error) {
        res.status(400).json({ success: false, message: "Cannot remove Order!" });
    }
}   

