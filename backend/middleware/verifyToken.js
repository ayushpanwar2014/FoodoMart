import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {

    const { token } = req.headers;

    if (token) {

        try {
            const validToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = validToken.user.id;
            next();

        } catch (error) {

            return res.status(404).json({ success: false, message: 'Please authenticate using a valid token' })

        }

    }
    else if (!token) {
        return res.status(404).json({ success: false, message: 'Please authenticate using a valid token' })
    }
}