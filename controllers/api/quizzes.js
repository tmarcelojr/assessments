const Quiz = require('../../models/Quiz')

exports.createQuiz = async (req, res) => {
    try {
        const createdQuiz = await Quiz.create(req.body)
        res.json(createdQuiz)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}