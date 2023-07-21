const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users');

// POST /api/users
router.post('/', usersController.createUser);
// POST /api/users/login
router.post('/login', usersController.loginUser)
// POST /api/users/logout
router.post('/logout', usersController.auth, usersController.logoutUser)
// PUT /api/users/:id
router.put('/:id', usersController.auth, usersController.updateUser)
// DELETE /api/users/:id
router.delete('/:id', usersController.auth, usersController.deleteUser)

module.exports = router;
