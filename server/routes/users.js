const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers, createUser, deleteUser } = require('../controllers/userController');

router.get('/', auth, getUsers);
router.post('/', auth, createUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
