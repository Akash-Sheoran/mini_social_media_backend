import "dotenv";
import jwt from "jsonwebtoken";

const is_logged_in = async (req, res, next) => {
  try {
    let logged_in = false;
    let token = req.cookies["auth_token"];
    if (!token) {
      return res.status(401).json({ message: "Log In Required!" , logged_in});
    }

    jwt.verify(token , process.env.JWT_SECERET , (err , decoded) => {
        if(err){
            return res.status(401).json({ message: "Invalid Token" , logged_in });
        }

        let user_id = decoded?.user_id;

        req.user_id = user_id;
        logged_in = true;
        req.logged_in = logged_in;
        next();
    })

  } catch (error) {
    return res.status(401).json({ message: "server error" });
  }
};

export { is_logged_in };
