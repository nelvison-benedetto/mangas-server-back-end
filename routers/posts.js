const express = require('express');
const router =  express.Router();

const PostController = require('../controllers/PostController.js');
router.post('/', PostController.store);

module.exports = router;
