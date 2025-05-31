import jwt from "jsonwebtoken";

let checkLogin = (req, res, next) => {
    let headers = req.headers.authorization;
    console.log("Auth Header:", headers);
    
    if (!headers) {
        return res.status(401).send("Authorization header is missing");
    }

    const  token = headers.split(" ")[1];
    console.log("Extracted token:", token);

    if (!token) {
        return res.status(401).send("Token is missing");
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);;
        console.log("Decoded JWT:", decoded);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
         console.error("JWT Error:", err);
        return res.status(401).send("Invalid Token");
    }
};

export default checkLogin;
