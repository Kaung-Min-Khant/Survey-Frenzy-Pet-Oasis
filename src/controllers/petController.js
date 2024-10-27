// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/petModel");
const responseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL Pet
// ##############################################################
module.exports.readAllPet = (req, res, next) => {
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllPet:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no pets in Pet table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Pets not found",
        });
      }

      // if there are pets in Pet table in SQL server
      else res.status(responseStatusCode.OK).json(results);
    }
  };

  model.selectAllPet(callback);
};

// #################################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL Pets By owner_id
// #################################################################
module.exports.readAllPetByOwnerId = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id || res.locals.user_id,
  };
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllPetByOwnerId:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no pet by owner in Pet table
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Pet not found",
        });
      }
      // if there are pets by owner_id in Pet table
      else {
        res.status(responseStatusCode.OK).json(results);
      }
    }
  };

  model.selectAllPetByOwnerId(data, callback);
};

// #################################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL Pets With Hunger Stats By owner_id
// #################################################################
module.exports.readAllPetWithHungerStatsByOwnerId = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id || res.locals.user_id,
  };
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllPetWithHungerStatsByOwnerId:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no pet by owner in Pet table
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Pet not found",
        });
      }
      // if there are pets by owner_id in Pet table
      else {
        res.status(responseStatusCode.OK).json(results);
      }
    }
  };

  model.selectAllPetWithHungerStatsByOwnerId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING Pet BY pet_id
// ##############################################################
module.exports.readPetHungerStatsByPetId = (req, res, next) => {

  const data = {
      pet_id: res.locals.pet_id || req.params.pet_id
  }

  const callback = (error, results, fields) => {

      // if there is something wrong with SQL server or SQL query
      if (error) {
          console.error("Error readPetHungerStatsByPetId:", error);
          res.status(responseStatusCode.Internal_Server_Error).json({
              message: "Internal Server error"
          });
      }

      else {
          // if there is no pet in Pet table in SQL server
          if (results.length === 0) {
              res.status(responseStatusCode.Not_Found).json({
                  message: "Pet not found"
              });
          }
          else {
              // if reading back the pet that just created
              if (res.locals.created === true) {
                  res.status(responseStatusCode.Created).json(results[0]);
              }

              //  if there is the pet in Pet table in SQL server
              else {
                  res.status(responseStatusCode.OK).json(results[0]);
              }
          }
      }
  }

  model.selectPetHungerByPetId(data, callback);
}

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Reduce Pet Hunger By Time Difference from Pet table
// #########################################################################
module.exports.reducePetHungerByTimeDiff = (req, res, next) => {
  const data = {
    owner_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error reducePetHungerByTimeDiff:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if hunger is successfully reduced by time difference in Pet table
      next();
    }
  };

  model.reduceHungerLevelOfPetByTimeDiff(data, callback);
};

// ##################################################################
// DEFINE CONTROLLER FUNCTION TO Count all the Pets user Created
// ##################################################################
module.exports.countUserPets = (req, res, next) => {
  const data = {
    user_id: req.params.user_id || res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error countUserPets:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if user pets are successfully counted

      res.locals.pet_count = results[0].pet_count;
      next();
    }
  };

  model.countUserPetsByOwnerId(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Create new Pet
// #########################################################################
module.exports.createNewPet = (req, res, next) => {
  // if user_id is missing
  if (res.locals.user_id === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: user_id is missing",
    });
    return;
  }

  // if pet_type is missing
  if (res.locals.pet_type === undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: pet_type is missing",
    });
    return;
  }

  const data = {
    type: res.locals.pet_type,
    owner_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error createNewPet:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    }

    // if pet is successfully created in Pet table
    else {
      res.locals.pet_id = results.insertId;
      res.locals.created = true;
      next();
    }
  };

  model.insertSinglePet(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING Pet BY pet_id
// ##############################################################
module.exports.readPetById = (req, res, next) => {
  const data = {
    pet_id: res.locals.pet_id || req.params.pet_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readPetById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no pet in Pet table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Pet not found",
        });
      } else {
        // if reading back the pet that just created
        if (res.locals.created === true) {
          res.status(responseStatusCode.Created).json(results[0]);
        }

        //  if there is the pet in Pet table in SQL server
        else {
          res.status(responseStatusCode.OK).json(results[0]);
        }
      }
    }
  };

  model.selectPetByPetId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CHECK Pet OWNERSHIP of USER
// ##############################################################
module.exports.verifyPetOwnerShip = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id,
    pet_id: req.params.pet_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error verifyPetOwnerShip:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error.",
      });
    } else {
      // if pet does not exist
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Pet not found",
        });
      }

      // if pet does not belong to user
      else if (results[0].owner_id != data.user_id) {
        res.status(responseStatusCode.Forbidden).json({
          message: "Pet does not belong to User",
        });
      }
      // if pet belong to user
      else {
        next();
      }
    }
  };

  model.selectPetByPetId(data, callback);
};

// #########################################################################
// DEFINE CONTROLLER FUNCTION FOR Increase Pet Hunger By FoodAmount from Pet table
// #########################################################################
module.exports.increasePetHungerByFoodAmount = (req, res, next) => {
  const data = {
    pet_id: req.params.pet_id,
    food_amount: res.locals.food_intake,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error increasePetHungerBy5:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if pet hunger is successfully increased by food amount
      next();
    }
  };

  model.increaseHungerLevelOfPetByFoodAmount(data, callback);
};
