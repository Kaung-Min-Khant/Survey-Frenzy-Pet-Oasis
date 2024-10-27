//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const { hashPassword } = require("../middlewares/bcryptMiddleware");
const model = require("../models/userModel");
const responseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL USER
// ##############################################################

module.exports.readAllUser = (req, res, next) => {
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllUser:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no users in USER table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Users not found",
        });
      }

      // if there are users in USER table in SQL server
      else res.status(responseStatusCode.OK).json(results);
    }
  };

  model.selectAllUser(callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
  if (req.body.username === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: username is undefined",
    });
    return;
  }

  if (req.body.password === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: password is undefined",
    });
    return;
  }

  const data = {
    username: req.body.username,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error login:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      if (results.length == 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      } else {
        res.locals.userId = results[0].id;
        res.locals.hash = results[0].password;
        next();
      }
    }
  };

  model.selectByUsername(data, callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
  if (req.body.username == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: username is undefined",
    });
    return;
  }

  if (req.body.email == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: email is undefined",
    });
    return;
  }

  if (req.body.password == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: password is undefined",
    });
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
    hashPassword: res.locals.hash,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error register:", error);
      res.status(500).json(error);
    } else {
      res.locals.userId = results.insertId;
      res.locals.message = `User ${data.username} created successfully.`;
      res.locals.created = true;
      next();
    }
  };

  model.insertSingle(data, callback);
};

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
  if (req.body.username == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: username is undefined",
    });
    return;
  }

  if (req.body.email == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: email is undefined",
    });
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUsernameOrEmailExist:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      if (results.length > 0) {
        res.status(responseStatusCode.Conflict).json({
          message: "Username or email already exists",
        });
      } else {
        next();
      }
    }
  };

  model.selectByUsernameOrEmail(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING USER BY user_id
// ##############################################################
module.exports.readUserById = (req, res, next) => {
  const data = {
    user_id: req.params.user_id || res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readUserById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no user in USER table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      } else {
        //  if there is the user in USER table in SQL server
        responseData = results[0];
        responseData["created_questions"] = res.locals.created_questions;
        responseData["answered_questions"] = res.locals.answered_questions;
        responseData["collected_pets"] = res.locals.pet_count;
        res.status(responseStatusCode.OK).json(responseData);
      }
    }
  };

  model.selectUserById(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Check User Exist from USER table
// #########################################################################
module.exports.checkUserWithUserIdExist = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id || req.params.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error checkUserWithUserIdExist:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if user does not exist
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      }
      // if user exist
      else {
        next();
      }
    }
  };

  model.selectUserById(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Update User Last Login from USER table
// #########################################################################
module.exports.updateLastLogin = (req, res, next) => {
  const data = {
    user_id: res.locals.userId,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error updateLastLogin:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if user does not exist
      if (results.affectedRows === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      }
      // if user is successfully updated in USER table
      else {
        next();
      }
    }
  };

  model.updateUserLastLogin(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Add 5 Point to User
// #########################################################################
module.exports.addUserPoints = (req, res, next) => {
  // if user_id is missing in request body
  if (res.locals.user_id === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Err: user_id is undefined",
    });
    return;
  }

  const data = {
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error addUserPoints:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if user does not exist
      if (results.affectedRows === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      }
      // if the point are successfully added
      else {
        next();
      }
    }
  };

  model.AddFivePointsToUser(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Check User Can Purchase Item
// #########################################################################
module.exports.canUserPurchaseItem = (req, res, next) => {
  // if user_id is missing in request body
  if (res.locals.user_id === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Err: user_id is undefined",
    });
    return;
  }

  const data = {
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error canUserPurchaseItem:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no user in USER table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      }

      //if the user cannot buy the item From Shop
      else if (results[0].points < res.locals.price) {
        res.status(responseStatusCode.Payment_Required).json({
          message: "Not Enough Points, User Cannot Purchase Item",
        });
      }

      // if the user can buy the item From Shop
      else {
        res.locals.pet_type = res.locals.pet_type;
        next();
      }
    }
  };

  model.selectUserById(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR REDUCE POINTS FROM USER ACCORDING TO ITEM PRICE
// #########################################################################
module.exports.reduceUserPointsByPrice = (req, res, next) => {
  // if user_id is missing in request body
  if (res.locals.user_id === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Err: user_id is undefined",
    });
    return;
  }

  const data = {
    user_id: res.locals.user_id,
    price: res.locals.price,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error reduceUserPointsByPrice:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if user does not exist
      if (results.affectedRows === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      }
      // if the point are successfully reduced from user
      else {
        next();
      }
    }
  };

  model.reducePointsOfUserByPrice(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Check User Can Draw Gacha
// #########################################################################
module.exports.canUserDrawGacha = (req, res, next) => {
  // if user_id is missing in request body
  if (res.locals.user_id === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Err: user_id is undefined",
    });
    return;
  }

  const price_to_draw_gacha = 10;

  const data = {
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error canUserDrawGacha:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no user in USER table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      }

      //if the user cannot draw the gacha
      else if (results[0].points < price_to_draw_gacha) {
        res.status(responseStatusCode.Payment_Required).json({
          message: "Not Enough Points, User Cannot Draw Gacha",
        });
      }

      // if the user can draw the gacha
      else {
        res.locals.price = price_to_draw_gacha;
        next();
      }
    }
  };

  model.selectUserById(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR increase Food Amount of Food Inventory from FoodInventory table by Gacha Reward
// #########################################################################
module.exports.increaseFoodAmountByGachaReward = (req, res, next) => {
  // if user_id dis missing in req.body
  if (res.locals.user_id === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: user_id is missing",
    });
    return;
  }

  const data = {
    user_id: res.locals.user_id,
    food_amount: res.locals.reward_food_amount,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error increaseFoodAmountByGachaReward", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if Food Inventory does not exist
      if (results.affectedRows === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Food Inventory not found",
        });
      }
      // if Food Amount of Food Inventory is successfully increased in FoodInventory table
      else {
        next();
      }
    }
  };

  model.increaseUserFoodAmountByGachaReward(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Check User Have Enough Food to Feed Pet
// #########################################################################
module.exports.canUserFeedPet = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    food_required_amount_to_feed_pet = 5;
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error canUserFeedPet:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no user in USER table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      }

      //if the user don't have enough food to feed pet
      else if (results[0].food_amt < food_required_amount_to_feed_pet) {
        res.status(responseStatusCode.Forbidden).json({
          message: "Not Enough Food, User Cannot Feed Pet",
        });
      }

      // if the user have enough food to feed pet
      else {
        res.locals.food_intake = food_required_amount_to_feed_pet;
        next();
      }
    }
  };

  model.selectUserById(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR REDUCE Food Amount FROM Food Inventory ACCORDING TO Food Amount
// #########################################################################
module.exports.reduceFoodAmountByFoodIntake = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id,
    food_intake: res.locals.food_intake,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error reduceFoodAmountByFoodIntake:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if Food Inventory does not exist
      if (results.affectedRows === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User Not Found",
        });
      }
      // if the Food Amount is successfully reduced according to Food Intake
      else {
        next();
      }
    }
  };

  model.reduceFoodAmountOfFoodInventoryByFoodIntake(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Checking User with username Already Exist
// #########################################################################
module.exports.checkUserWithUsernameExist = (req, res, next) => {
  // if username is missing in request body
  if (req.body.username === undefined || req.body.username === "") {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Missing required data",
    });
    return;
  }

  const data = {
    username: req.body.username,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error checkUserExist:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is User with username already existed in USER table
      if (results.length !== 0) {
        res.status(responseStatusCode.Conflict).json({
          message: "Username Already Existed",
        });
      }

      // if there is User with username does not exist
      else {
        next();
      }
    }
  };

  model.selectUserByUsername(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Update User from USER table
// #########################################################################
module.exports.updateUsername = (req, res, next) => {
  // if username is missing in request body
  if (req.body.username === undefined || req.body.username === "") {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Missing required data",
    });
    return;
  }

  const data = {
    user_id: res.locals.user_id,
    username: req.body.username,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if user does not exist
      if (results.affectedRows === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "User not found",
        });
      }
      // if user is successfully updated in USER table
      else {
        next();
      }
    }
  };

  model.updateUsernameById(data, callback);
};
