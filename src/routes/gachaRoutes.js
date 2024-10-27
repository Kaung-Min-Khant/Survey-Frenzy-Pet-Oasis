// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const gachaRewardController = require("../controllers/gachaRewardController");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const gachaDraw = require("../controllers/gachaDrawController");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

router.put("/draw", jwtMiddleware.verifyToken, userController.canUserDrawGacha, gachaRewardController.drawGacha, userController.increaseFoodAmountByGachaReward, userController.reduceUserPointsByPrice, gachaDraw.createGachaDraw, gachaRewardController.readGachaRewardByItemId);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;