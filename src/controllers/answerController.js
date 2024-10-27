// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/answerModel");
const responseStatusCode = require("../utils/httpStatusCode");

// #################################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL Answers of the Question
// #################################################################
module.exports.readAllAnswerByQuestionId = (req, res, next) => {
  const data = {
    question_id: req.params.question_id,
  };
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllAnswerByQuestionId:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no answer related to question in UserAnswer table
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Answer not found",
        });
      }
      // if there are answers related to question in UserAnswer table
      else {
        results.forEach((result) => {
          if (result.answer == true) {
            result.answer = "Yes";
          } else if (result.answer == false) {
            result.answer = "No";
          }
        });
        res.status(responseStatusCode.OK).json(results);
      }
    }
  };

  model.selectAllAnswerByQuestionId(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Create new Answer
// #########################################################################
module.exports.createNewAnswer = (req, res, next) => {
  // if answer is missing in request body
  if (req.body.answer == undefined) {
    res.status(responseStatusCode.Bad_Request).send("Error: answer is undefined");
    return;
  }

  const data = {
    answered_question_id: req.params.question_id,
    participant_id: res.locals.user_id,
    answer: req.body.answer,
    additional_notes: req.body.additional_notes || "",
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error createNewAnswer:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    }

    // if answer is successfully created in UserAnswer table
    else {
      res.locals.answer_id = results.insertId;
      res.locals.created = true;
      next();
    }
  };

  model.insertSingleAnswer(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING Answer BY answer_id
// ##############################################################
module.exports.readAnswerById = (req, res, next) => {
  const data = {
    answer_id: res.locals.answer_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAnswerById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no answer in UserAnswer table
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Answer not found",
        });
      }
      // if reading back the answer that just created
      else if (res.locals.created === true) {
        results[0].answer = Boolean(results[0].answer);
        res.status(responseStatusCode.Created).json(results[0]);
      }
      //  if there is the answer in UserAnswer table
      else {
        results[0].answer = Boolean(results[0].answer);
        res.status(responseStatusCode.OK).json(results[0]);
      }
    }
  };

  model.selectAnswerById(data, callback);
};

// ##############################################################
// DEFINE DELETE OPERATIONS FOR Answer by question_id in UserAnswer table
// ##############################################################
module.exports.deleteAnswerByQuestionId = (req, res, next) => {
  const data = {
    question_id: req.params.question_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error deleteAnswerByQuestionId:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    }

    // if answers are successfully deleted in UserAnswer table
    else {
      res.status(responseStatusCode.No_Content).send();
    }
  };

  model.deleteAnswerByQuestionId(data, callback);
};

// ##################################################################
// DEFINE CONTROLLER FUNCTION TO Count all the Question user Created
// ##################################################################
module.exports.countUserCompletedQuestions = (req, res, next) => {
  const data = {
    user_id: req.params.user_id || res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error countUserCompletedQuestions:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if user completed answers are successfully counted

      res.locals.answered_questions = results[0].answer_count;
      next();
    }
  };

  model.countUserAnswersByParticipantId(data, callback);
};
