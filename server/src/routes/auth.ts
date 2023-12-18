import express from "express"
import { updateUser,deleteUser } from "../controllers/userContoller";
import userVerification from "../middleware/authMiddleware";

const router = express.Router();

router.post('/update/:id',userVerification, updateUser);
router.delete('/delete/:id',userVerification,deleteUser);


export default router;

