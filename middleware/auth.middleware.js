import jwt from "jsonwebtoken";

// Fungsi untuk membuat token
export const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

// Middleware untuk membaca token dari header
export const readToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, msg: "Token not valid !" }); //
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({ success: false, msg: "Token has expired" });
    req.user = user;
    next();
  });
};
