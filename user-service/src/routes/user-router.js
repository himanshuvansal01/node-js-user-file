// routes/userRoutes.js
const express = require('express');
const { register, login, refreshToken, getProfile } = require('../../src/controller/user-controller');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validators/joi-validator');


const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refreshToken);
router.get('/me', auth, getProfile);

module.exports = router;