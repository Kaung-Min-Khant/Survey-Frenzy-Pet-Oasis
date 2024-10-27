//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const userController = require('../controllers/userController');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const petWikiRoutes =require('./petWikiRoutes');
const petRoutes = require('./petRoutes');
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const questionRoutes = require('./questionRoutes');
const shopRoutes = require('./shopRoutes');
const gachaRoutes = require('./gachaRoutes');
//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.post("/login", userController.login, bcryptMiddleware.comparePassword, userController.updateLastLogin, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.use("/petWiki", petWikiRoutes);
router.use("/pets", petRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);
router.use("/questions", questionRoutes);
router.use("/shop", shopRoutes);
router.use("/gacha", gachaRoutes);
//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;