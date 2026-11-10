const express = require("express");
const bcrypt = require("bcryptjs"); // password in some other format and secure
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); // checking for the validation of user
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Rishiisagoodb$boy";
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Create a user using: POST "api/auth/createUser". Doesn't require auth
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    // If there are validation errors, return BAD REQUEST
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create user in Database
      let user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // Prepare payload for JWT
      const data = {
        user: {
          id: user.id,
        },
      };

      //Asign Token and send back
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      return res.json({ success, authToken });
    } catch (err) {
      // If MongoDB rejects the creation because the email isn't unique
      if (err.code === 11000) {
        success = false;
        return res.status(400).json({
          success,
          error: "Sorry, a user with this email address already exists!",
        });
      }

      // Fallback for any other random server errors
      console.error(err.message); // This helps you debug in your console
      return res.status(500).send("Internal server error");
    }
  },
);

// ROUTE 2
// Authenticate a user using POST: "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  },
);
//ROUT 3
//Get logged in User details, POST "/api/auth/getUser". Login required
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    // If MongoDB rejects the creation because the email isn't unique
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Sorry, a user with this email address already exists!",
      });
    }

    // Fallback for any other random server errors
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
