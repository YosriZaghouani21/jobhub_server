const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) return res.status(403).json("Invalid token");
      req.user = user;
      // req.user = await User.findById(user.id);
      // console.log(req.user)
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  if (req.user && (req.user.id || req.user.isAdmin)) {
    next();
  } else {
    res.status(403).json("You are restricted from performing this operation");
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
