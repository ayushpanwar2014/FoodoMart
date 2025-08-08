import UserModel from "../model/UserModel.js"
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"


//Register
export const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        let existUser = await UserModel.findOne({ email: email });

        if (existUser) return res.status(404).json({ success: false, message: "User already Exist!" });

        //Validating email format & strong password

        if (!validator.isEmail(email)) return res.status(404).json({ success: false, message: "Please enter a valid email!" });
        if (password.length < 5) return res.status(404).json({ success: false, message: "Please enter a Strong password!" });

        //Hashed Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = await new UserModel({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await createUser.save();

        const data = {
            user: {
                id: createUser._id
            }
        }

        const token = jwt.sign(data, process.env.JWT_SECRET);

        res.status(200).json({ success: true, token });

    } catch (error) {

        res.status(404).json({ success: false, message: "User is not Created!" });

    }
}

//Login
export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        let user = await UserModel.findOne({ email: email });

        if (!user) return res.status(404).json({ success: false, message: "User Not Found!" });

        const verifypassword = await bcrypt.compare(password, user.password);

        if (!verifypassword) return res.status(404).json({ success: false, message: "Wrong Password!" });

        const data = {
            user: {
                id: user._id
            }
        };


        const token = jwt.sign(data, process.env.JWT_SECRET,
        );

        res.status(200).json({ success: true, token });


    } catch (error) {

        res.status(404).json({ success: false, message: "User is not Login!" });

    }

}

export const getUser = async (req, res) => {

    try {

        const getUser = await UserModel.findById(req.userId);
        if (!getUser) res.status(400).json({ success: false, message: "User Not Get from database!" });

        const data = {
            username: getUser.username
        }

        res.status(200).json({ success: true, data: data });

    } catch (error) {
        res.status(404).json({ success: false, message: "There is no User with this ID!" });
    }
}
