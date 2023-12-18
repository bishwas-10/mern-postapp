import express from "express";
import {getPosts, createPosts, updatePosts, deletePost, likePost} from "../controllers/posts";
import userVerification from "../middleware/authMiddleware";
const app = express();
const router = express.Router();


router.get('/',getPosts);
router.post('/',userVerification,createPosts);
router.patch('/:id',userVerification,updatePosts);
router.delete('/:id',userVerification,deletePost);
router.patch('/:id/likePost',userVerification,likePost);






export default router;