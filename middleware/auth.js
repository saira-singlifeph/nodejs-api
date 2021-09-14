const JWT = require("jsonwebtoken");
const Session = require("../models/session.model");

const verifyToken = (req, res, next) => {

    let token;
    const headerAuth = req.headers.authorization;
    const userId = req.headers.userid;

    // headerAuth and userId are required
    if (headerAuth && userId) {
        token = headerAuth.substring(7);
    } else {
        return res.status(400).json({
            success: false,
            message: "No token found."
        });
    }

    try {
        // token from the header,
        // secret key stored in env
        // callback function
        JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // if error decoding the token
            if (err) return res.status(400).json({ success: false, message: err });

            // check if the stored userid in the token is same with the requesting user
            if (decoded.userid === userId) {
                // check the session db if the user id exists
                Session.findOne({ userId }).then((ses) => {
                    // if the userId not exists
                    if (!ses || ses.token !== token) return res.status(401).json({ success: false, message: "Invalid Token"});
                     // return if success decoding
                     return next();
                });
            } else {
                // return invalid token if not same
                //401 is invalid token , not authorize to access api
                return res.status(401).json({
                    success: false,
                    message: "Invalid User"
                });
            }
        });
    } catch (err) {
        //401 is invalid token , not authorize to access api
        return res.status(401).send({
            success: false,
            message: err
        });
    }
   
}

module.exports = verifyToken;