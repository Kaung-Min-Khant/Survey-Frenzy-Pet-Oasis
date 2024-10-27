// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const shopController = require("../controllers/shopController");
const userController = require("../controllers/userController");
const petController = require("../controllers/petController");

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get("/", jwtMiddleware.verifyToken, shopController.readAllShopItem);
router.post("/:item_id/pet", jwtMiddleware.verifyToken, shopController.readShopItemByItemId, userController.canUserPurchaseItem, petController.createNewPet, userController.reduceUserPointsByPrice, petController.readPetById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;