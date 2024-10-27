// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/questionModel");
const responseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL Questions
// ##############################################################
module.exports.readAllQuestion = (req, res, next) => {
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllQuestion:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no questions in SurveyQuestion table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Questions not found",
        });
      }

      // if there are questions in SurveyQuestion table in SQL server
      else res.status(responseStatusCode.OK).json(results);
    }
  };

  model.selectAllQuestions(callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL Questions by Creator ID
// ##############################################################
module.exports.readAllQuestionByCreatorId = (req, res, next) => {
  const data = {
    creator_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllQuestionByCreatorId:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Question not found",
        });
      } else res.status(responseStatusCode.OK).json(results);
    }
  };

  model.selectAllByCreatorId(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Create new Question
// #########################################################################
module.exports.createNewQuestion = (req, res, next) => {
  // if question or user_id is missing in request body
  if (req.body.question == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: question is undefined",
    });
    return;
  }

  if (res.locals.user_id == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: userId is undefined",
    });
    return;
  }

  const data = {
    question: req.body.question,
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error createNewQuestion:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    }
    // if question is successfully created in SurveyQuestion table
    else {
      res.status(responseStatusCode.Created).json({
        message: "Question Created Successfully",
      });
    }
  };

  model.insertSingleQuestion(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING Question BY question_id
// ##############################################################
module.exports.readQuestionById = (req, res, next) => {
  const data = {
    question_id: req.params.question_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readQuestionById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no question in SurveyQuestion table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Question not found",
        });
      } else {
        //  if there is question in SurveyQuestion table in SQL server
        res.status(responseStatusCode.OK).json(results[0]);
      }
    }
  };

  model.selectQuestionById(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Check User Exist from USER table
// #########################################################################
module.exports.checkQuestionWithQuestionIdExist = (req, res, next) => {
  const data = {
    question_id: req.params.question_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error checkQuestionWithQuestionIdExist:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if question does not exist
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Question not found",
        });
      }
      // if question exist
      else {
        next();
      }
    }
  };

  model.selectQuestionById(data, callback);
};

// ##############################################################
// DEFINE DELETE OPERATIONS FOR Question by question_id in SurveyQuestion table
// ##############################################################
module.exports.deleteQuestionById = (req, res, next) => {
  const data = {
    question_id: req.params.question_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error deleteQuestionById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if question does not exist
      if (results.affectedRows === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Question not found",
        });
      }
      // if question is successfully deleted in SurveyQuestion table
      else {
        next();
      }
    }
  };

  model.deleteQuestionById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CHECK Question OWNERSHIP
// ##############################################################
module.exports.verifyQuestionOwnerShip = (req, res, next) => {
  const data = {
    question_id: req.params.question_id,
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error verifyQuestionOwnerShip:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error.",
      });
    } else {
      // if question does not exist
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Question not found",
        });
      }

      // if question does not belong to user
      else if (results[0].creator_id != data.user_id) {
        res.status(responseStatusCode.Forbidden).json({
          message: "Question does not belong to User",
        });
      }
      // if question belong to user
      else {
        next();
      }
    }
  };

  model.selectQuestionById(data, callback);
};

// ##################################################################
// DEFINE CONTROLLER FUNCTION TO Count all the Question user Created
// ##################################################################
module.exports.countUserCreatedQuestions = (req, res, next) => {
  const data = {
    user_id: req.params.user_id || res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error countUserCreatedQuestions:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if user created answers are successfully counted

      res.locals.created_questions = results[0].question_count;
      next();
    }
  };

  model.countUserQuestionsByCreatorId(data, callback);
};
