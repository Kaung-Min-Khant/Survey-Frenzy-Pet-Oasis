// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const petController = require("../controllers/petController");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get("/", petController.readAllPet);
router.put("/:pet_id/feed", jwtMiddleware.verifyToken, petController.verifyPetOwnerShip, userController.canUserFeedPet, petController.increasePetHungerByFoodAmount, userController.reduceFoodAmountByFoodIntake, petController.readPetHungerStatsByPetId);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
