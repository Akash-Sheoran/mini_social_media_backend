import { Router } from "express";
const router = Router();

import auth from "./application_routes/auth.route.js";
import post from "./application_routes/post.route.js";


router.use('/auth',auth);
router.use('/post',post);

export default router;