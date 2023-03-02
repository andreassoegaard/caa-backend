const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  if (req.headers && req.headers["authorization"]) {
    //get token from request header
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    if (token == null)
      res.status(403).json({
        message: "You're not allowed here",
      });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({
          message: "You're not allowed here",
        });
      } else {
        req.user = user;
        next(); //proceed to the next action in the calling function
      }
    }); //end of jwt.verify()
  } else {
    res.status(403).json({
      message: "You're not allowed here",
    });
  }
};

module.exports = validateToken;
