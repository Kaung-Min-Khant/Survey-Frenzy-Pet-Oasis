// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const controller = require("../controllers/reviewController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get("/", controller.readAllReview);
router.get("/stats", controller.readAllReviewStats);
router.get("/owner", jwtMiddleware.verifyToken, controller.readAllReviewByOwnerId);
router.post("/", jwtMiddleware.verifyToken, controller.createReview);

router.get("/:id", controller.readReviewById);
router.put("/:id", jwtMiddleware.verifyToken, controller.verifyReviewOwnerShip, controller.updateReviewById);
router.delete("/:id", jwtMiddleware.verifyToken, controller.verifyReviewOwnerShip, controller.deleteReviewById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
