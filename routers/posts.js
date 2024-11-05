const express = require('express');
const router =  express.Router();

const PostController = require('../controllers/PostController.js');

router.get('/',PostController.index);
router.post('/', PostController.store);
router.put('/:id',PostController.update);

module.exports = router;
