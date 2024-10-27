// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/gachaDrawModel");
const responseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATING A REVIEW
// ##############################################################
module.exports.createGachaDraw = (req, res, next) => {
  // if user_id is missing in token
  if (res.locals.user_id == undefined) {
    res.status(responseStatusCode.Bad_Request).json({ message: "Error: user_id is undefined" });
    return;
  }
  // if reward_item is missing in res.locals
  else if (res.locals.item_id == undefined) {
    res.status(responseStatusCode.Bad_Request).json({ message: "Error: user_id is undefined" });
    return;
  }

  const data = {
    user_id: res.locals.user_id,
    item_id: res.locals.item_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error createGachaDraw:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error",
      });
    }
    // if gacha draw info is successfully created
    else {
      next();
    }
  };

  model.insertSingle(data, callback);
};
