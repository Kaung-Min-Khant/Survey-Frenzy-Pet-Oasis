// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const userController = require("../controllers/userController");
const petController = require("../controllers/petController");
const questionController = require("../controllers/questionController");
const answerController = require("../controllers/answerController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

router.get("/", userController.readAllUser);
router.get("/token", jwtMiddleware.verifyToken, jwtMiddleware.checkUserIdExistInToken, questionController.countUserCreatedQuestions, answerController.countUserCompletedQuestions, petController.countUserPets, userController.readUserById);
router.get("/token/pets", jwtMiddleware.verifyToken, petController.reducePetHungerByTimeDiff, petController.readAllPetWithHungerStatsByOwnerId);
router.put("/token/username", jwtMiddleware.verifyToken, jwtMiddleware.checkUserIdExistInToken, userController.checkUserWithUsernameExist, userController.updateUsername, userController.readUserById); 
router.get("/:user_id", jwtMiddleware.verifyToken, questionController.countUserCreatedQuestions, answerController.countUserCompletedQuestions, petController.countUserPets, userController.readUserById);
router.get("/:user_id/pets", userController.checkUserWithUserIdExist, petController.readAllPetByOwnerId);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
