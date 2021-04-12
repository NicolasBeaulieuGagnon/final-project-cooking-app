const questions = require("../questions.json");

const getAllQuestions = (req, res) => {
  res.status(200).json({ status: 200, data: questions });
};

module.exports = {
  getAllQuestions,
};
