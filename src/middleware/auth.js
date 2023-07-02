const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = async (res, req, next) => {
    // console.log(res, req.query); return
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("An authenticated token is required.");
    }

    try {
        const decodedToken = await jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodedToken;
    } catch (error) {
        return res.status(401).send("Invalid token provided");
    }

    return next();
}

module.exports = verifyToken;