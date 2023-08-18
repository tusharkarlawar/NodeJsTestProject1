const express = require('express');
const userController= require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getmydata);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;//