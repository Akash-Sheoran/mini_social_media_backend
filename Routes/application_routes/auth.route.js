import { Router } from "express";
const router = Router();

import { signup, login , logout} from "../../Controllers/auth.controller.js";

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Creates a new user account with a username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *                 description: The username for the new user
 *               password:
 *                 type: string
 *                 example: Password!
 *                 description: The password for the new user
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Registered Successfully
 *       400:
 *         description: user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Already Exist
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: server error
 *                 error:
 *                   type: object
 *                   example: {}
 */
router.route("/signup").post(signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log In
 *     description: Checks the user login and returns a cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *                 description: The username for the new user
 *               password:
 *                 type: string
 *                 example: Password!
 *                 description: The password for the new user
 *     responses:
 *       200:
 *         description: User Logged In successfully
 *         Set-Cookie:
 *             schema:
 *               type: string
 *               example: auth_token=abc123; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Logged In Successfully
 *       400:
 *         description: user doesnt exists or invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user doesnt exists or invalid password
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: server error
 *                 error:
 *                   type: object
 *                   example: {}
 */
router.route("/login").post(login);

router.route("/logout").get(logout);

export default router;
