// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const questionController = require("../controllers/questionController");
const answerController = require("../controllers/answerController");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get("/", jwtMiddleware.verifyToken, questionController.readAllQuestion);
router.get("/creator", jwtMiddleware.verifyToken, questionController.readAllQuestionByCreatorId);
router.post("/", jwtMiddleware.verifyToken, questionController.createNewQuestion);

router.get("/:question_id", jwtMiddleware.verifyToken, questionController.readQuestionById);
router.delete("/:question_id", jwtMiddleware.verifyToken, questionController.verifyQuestionOwnerShip, questionController.deleteQuestionById, answerController.deleteAnswerByQuestionId);

router.post("/:question_id/answers", jwtMiddleware.verifyToken, questionController.checkQuestionWithQuestionIdExist, userController.checkUserWithUserIdExist, answerController.createNewAnswer, userController.addUserPoints, answerController.readAnswerById);
router.get("/:question_id/answers", jwtMiddleware.verifyToken, answerController.readAllAnswerByQuestionId);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
