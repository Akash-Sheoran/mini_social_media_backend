import { Router } from "express";
const router = Router();

import { auth_verify } from "../../Middleware/auth_verify.middleware.js";

import {
  create,
  update,
  remove,
  get,
  get_by_user,
} from "../../Controllers/post.controller.js";

/**
 * @swagger
 * /api/post:
 *   post:
 *     tags: [Post]
 *     summary: Create a new Post
 *     description: creates a post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - title
 *               - content
 *               - image
 *             properties:
 *               user:
 *                 type: ObjectId
 *                 example: asd3434
 *                 description: user object id
 *               title:
 *                 type: string
 *                 example: Dummy
 *                 description: The post title
 *               content:
 *                 type: string
 *                 example: Dummy
 *                 description: The post content
 *               image:
 *                 type: string
 *                 example: Dummy
 *                 description: The post image url/filename
 *     responses:
 *       200:
 *         description: Post created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post created succesfully
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
router.route("/").post(auth_verify, create);

/**
 * @swagger
 * /api/post:
 *   put:
 *     tags: [Post]
 *     summary: edit a new Post
 *     description: edits a post
 *     parameters:
 *       - in: query
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: update _id to update the post
 *         example: post _id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *                 example: Dummy
 *                 description: The post title
 *               content:
 *                 type: string
 *                 example: Dummy
 *                 description: The post content
 *               image:
 *                 type: string
 *                 example: Dummy
 *                 description: The post image url/filename
 *     responses:
 *       200:
 *         description: Post edited succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post edited succesfully
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
router.route("/").put(auth_verify, update);

/**
 * @swagger
 * /api/post:
 *   delete:
 *     tags: [Post]
 *     summary: delete a new Post
 *     description: deleted a post
 *     parameters:
 *       - in: query
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: post _id to delete the post
 *         example: post _id
 *     responses:
 *       200:
 *         description: Post deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted succesfully
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
router.route("/").delete(auth_verify, remove);

/**
 * @swagger
 * /api/post:
 *   get:
 *     tags: [Post]
 *     summary: get all post
 *     description: fetch all post
 *     responses:
 *       200:
 *         description: all post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *                 user:
 *                   type: string
 *                   example: 67890
 *                 title:
 *                   type: string
 *                   example: My First Post
 *                 content:
 *                   type: string
 *                   example: This is the content of my first post.
 *                 image:
 *                   type: string
 *                   example: image path
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
router.route("/").get(get);

/**
 * @swagger
 * /api/post/by-user:
 *   get:
 *     tags: [Post]
 *     summary: get all post by user
 *     description: fetch all post by user
 *     parameters:
 *       - in: query
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: user _id
 *         example: user _id
 *     responses:
 *       200:
 *         description: Post deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *                 user:
 *                   type: string
 *                   example: 67890
 *                 title:
 *                   type: string
 *                   example: My First Post
 *                 content:
 *                   type: string
 *                   example: This is the content of my first post.
 *                 image:
 *                   type: string
 *                   example: image path
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
router.route("/by-user").get(auth_verify, get_by_user);

export default router;
