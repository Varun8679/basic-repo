const jwt = require("jsonwebtoken");

const jwtauthMiddleware = (req, res, next) => {
  //extract jwt token logic from request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ Error: "unauthorized" });
  }

  try {
    //verify jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECERET);

    //attach user information to the request object

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ Error: "invalid token" });
  }
};

//function to generate jwt token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECERET);
};

module.exports = { jwtauthMiddleware, generateToken };
