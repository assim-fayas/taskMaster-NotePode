// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];


        if (!token) {
            return res.status(401).json({
                auth: false,
                status: "failed",
                message: "No token provided",
            });
        }


        jwt.verify(token, process.env.JWT_USER_SECERETKEY, (err, decoded) => {
            console.log("decodeee", decoded);
            console.log("error", err);
            if (err) {
                console.log("user Authentication faild");
                return res.status(401).json({
                    auth: false,
                    status: "failed",
                    message: "Failed to authenticate",
                });
            } else {

                req.headers.userId = decoded._id; // user ID is stored in '_id'
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
        });
    }


}
module.exports = authMiddleware