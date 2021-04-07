const router = express.Router();
import express from 'express'
import { userById, read, update } from '../controllers/user'
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";

router.param('userId', userById)
router.get('/user/:userId', read);
router.put('/user/:userId', update);

module.exports = router;