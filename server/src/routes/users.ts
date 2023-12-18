import { logIn, signUp,google ,signOut} from '../controllers/users';
import express from 'express';
import userVerification from '../middleware/authMiddleware';

const router = express.Router();


router.post("/login",logIn);
router.post("/signup",signUp);
router.post("/google",google);
router.get("/signout",signOut);



export default router;