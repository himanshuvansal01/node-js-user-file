// routes/userRoutes.js
const express = require('express');
const { initiateFile, completeFile, fetchFileById } = require('../controller/file-controller');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const validate = require('../middleware/validate');


const router = express.Router();

router.post('/initiate', auth, initiateFile);
router.post('/complete', auth, completeFile);
router.get('/:fileId', auth, fetchFileById);



module.exports = router;