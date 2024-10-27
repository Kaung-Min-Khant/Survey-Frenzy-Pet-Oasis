// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE MODEL To Retrieve All the Answer of the Question from UserAnswer table
// ##############################################################
module.exports.selectAllAnswerByQuestionId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT UserAnswer.participant_id, User.username AS participant, UserAnswer.answer, UserAnswer.created_at, UserAnswer.additional_notes FROM UserAnswer
    INNER Join User ON UserAnswer.participant_id = User.id
    WHERE answered_question_id = ?
    ORDER BY UserAnswer.created_at DESC;
    `;

  const VALUES = [data.question_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Insert Answer record Into UserAnswer table
// ##############################################################
module.exports.insertSingleAnswer = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO UserAnswer (answered_question_id, participant_id, answer, additional_notes)
    VALUES (?,?,?,?);
    `;

  const VALUES = [data.answered_question_id, data.participant_id, data.answer, data.additional_notes];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve Answer by answer_id from SurveyQuestion table
// ##############################################################
module.exports.selectAnswerById = (data, callback) => {
  const SQLSTATMENT = `
        SELECT answer_id, answered_question_id, participant_id, answer, DATE(created_at) AS creation_date, additional_notes FROM UserAnswer
        WHERE answer_id = ?; 
        `;

  const VALUES = [data.answer_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE DELETE OPERATIONS FOR UserAnswer by answered_question_id
// ##############################################################
module.exports.deleteAnswerByQuestionId = (data, callback) => {
  const SQLSTATMENT = `
        DELETE FROM UserAnswer
        WHERE answered_question_id = ?;
        `;

  const VALUES = [data.question_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Count userAnswer by participant_id From UserAnswer table
// ##############################################################
module.exports.countUserAnswersByParticipantId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT COUNT(answer_id) AS answer_count FROM UserAnswer
    WHERE participant_id = ?;
    `;

  const VALUES = [data.user_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};
