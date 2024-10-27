// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE MODEL To Retrieve All the Questions from SurveyQuestion table
// ##############################################################
module.exports.selectAllQuestions = (callback) => {
  const SQLSTATMENT = `
    SELECT SurveyQuestion.question_id, SurveyQuestion.question, SurveyQuestion.creator_id, User.username AS creator, SurveyQuestion.created_at FROM SurveyQuestion
    INNER Join User ON SurveyQuestion.creator_id = User.id
    ORDER BY SurveyQuestion.created_at DESC;
    `;

  pool.query(SQLSTATMENT, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve a Review by ID from Reviews table
// ##############################################################
module.exports.selectAllByCreatorId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT SurveyQuestion.question_id, SurveyQuestion.question, SurveyQuestion.creator_id, User.username AS creator, SurveyQuestion.created_at FROM SurveyQuestion
    INNER Join User ON SurveyQuestion.creator_id = User.id
    WHERE creator_id = ?
    ORDER BY SurveyQuestion.created_at DESC;
    `;
  const VALUES = [data.creator_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve Question by question_id from SurveyQuestion table
// ##############################################################
module.exports.selectQuestionById = (data, callback) => {
  const SQLSTATMENT = `
    SELECT SurveyQuestion.question_id, SurveyQuestion.question, SurveyQuestion.creator_id, User.username AS creator, SurveyQuestion.created_at FROM SurveyQuestion
    INNER Join User ON SurveyQuestion.creator_id = User.id
    WHERE question_id = ?;
    `;

  const VALUES = [data.question_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Insert question record Into SurveyQuestion table
// ##############################################################
module.exports.insertSingleQuestion = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO SurveyQuestion (creator_id, question)
    VALUES (?, ?);
    `;

  const VALUES = [data.user_id, data.question];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE DELETE OPERATIONS FOR Question by question_id
// ##############################################################
module.exports.deleteQuestionById = (data, callback) => {
  const SQLSTATMENT = `
    DELETE FROM SurveyQuestion
    WHERE question_id = ?;
    `;

  const VALUES = [data.question_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Count userAnswer by participant_id From UserAnswer table
// ##############################################################
module.exports.countUserQuestionsByCreatorId = (data, callback) => {
  const SQLSTATMENT = `
      SELECT COUNT(question_id) AS question_count FROM SurveyQuestion
      WHERE creator_id = ?;
      `;

  const VALUES = [data.user_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};
