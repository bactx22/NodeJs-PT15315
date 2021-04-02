import express from 'express'
const router = express.Router();

import { signup, signin, signout, } from "../controllers/auth"

//router.post
router.post('/signup', signup)

module.exports = router;