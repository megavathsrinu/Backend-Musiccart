const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const app = express();

app.use(cors());

app.use(express.json());

const VerifyAuthentication = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "invalid token" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong", errorMessage: error });
  }
};

module.exports = VerifyAuthentication;
