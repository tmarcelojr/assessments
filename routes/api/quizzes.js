const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/quizzes');

// POST /api/quizzes
router.post('/', usersController.createQuiz);

module.exports = router;
