const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = tokenParts[1];
    jwt.verify(token, process.env.JWT_SEC, (err, decodedUser) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({ error: "Invalid token" });
      }

      console.log("Decoded User:", decodedUser); // Log the decoded user
      req.decodedUser = decodedUser;
      next();
    });
  } else {
    return res.status(401).json({ error: "You are not authenticated!" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  const decodedUser = req.decodedUser;
  console.log(decodedUser);
  if (decodedUser && decodedUser.id) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "You are restricted from performing this operation" });
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json("You have limited access");
  }
};

const verifyTokenAndAgent = (req, res, next) => {
  if (req.user && (req.user.isAgent || req.user.isAdmin)) {
    next();
  } else {
    res.status(403).json("You are restricted from performing this operation");
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAgent,
};
