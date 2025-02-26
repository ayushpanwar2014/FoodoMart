import UserModel from '../model/UserModel.js';

//Add Items to user cart
export const addToCart = async (req, res) => {

    try {

        let userData = await UserModel.findById({ _id: req.userId });
        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }

        await UserModel.findByIdAndUpdate(req.userId, { cartData });
        res.status(200).json({ success: true, message: "Added to Cart" });

    } catch (error) {

        res.status(400).json({ success: false, message: "Not Added to Cart" });

    }

}

//Remove Items to user cart
export const removeToCart = async (req, res) => {

    try {

        let userData = await UserModel.findById({ _id: req.userId });
        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

        }
        await UserModel.findByIdAndUpdate(req.userId, { cartData });
        res.status(200).json({ success: true, message: "Remove from Cart" });

    } catch (error) {

        res.status(400).json({ success: false, message: "Not Remove from Cart" });

    }
}

//Fetch User Cart
export const fetchCart = async (req, res) => {

    try {


        let userData = await UserModel.findById({_id: req.userId});
        let cartData = userData.cartData;

        res.status(200).json({ success: true, cartData});
        
    } catch (error) {
        res.status(400).json({ success: false, message: "Not Fetch Cart Data" });

    }

}



