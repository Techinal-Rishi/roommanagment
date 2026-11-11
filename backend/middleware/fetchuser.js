var jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and add it to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const data = jwt.verify(token, secret);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;