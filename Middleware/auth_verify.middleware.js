import "dotenv";
import jwt from "jsonwebtoken";

const auth_verify = async (req, res, next) => {
  try {
    let token = req.cookies["auth_token"];
    if (!token) {
      return res.status(401).json({ message: "Log In Required!" });
    }

    jwt.verify(token , process.env.JWT_SECERET , (err , decoded) => {
        if(err){
            return res.status(401).json({ message: "Invalid Token" });
        }

        let user_id = decoded?.user_id;

        req.user_id = user_id;
        next();
    })

  } catch (error) {
    return res.status(401).json({ message: "server error" });
  }
};

export { auth_verify };
