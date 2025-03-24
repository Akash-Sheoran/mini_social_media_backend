import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
const app = express();
import { connect_db } from "./Database/connection.js";
const port = process.env.PORT || 2222;
import routes from "./Routes/api.routes.js";
import { is_logged_in } from "./Middleware/is_logged_in.middleware.js";
import User from "./Models/user.model.js";

//swagger
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi  from "swagger-ui-express";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API DOCS',
      version: '1.0.0',
    },
  },
  apis: ['./Routes/application_routes/auth.route.js' , './Routes/application_routes/post.route.js'],
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


app.use(cors({
  origin:[
    "http://localhost:5173",
  ],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

// connection to db
connect_db();

app.get("/api/auth-check", is_logged_in , async (req, res) => {
  try {
    let data = await User.findOne({_id : req.user_id});
    return res.status(200).json({ message: "user is logged in" , logged_in : req.logged_in , data});
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
});

app.use("/api/upload", async (req, res, next) => {
  try {
    const fileUploadRouter = (await import("./Routes/application_routes/file_upload.route.js"))
      .default;
    return fileUploadRouter(req, res, next);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error (file upload)", error: error?.message });
  }
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
