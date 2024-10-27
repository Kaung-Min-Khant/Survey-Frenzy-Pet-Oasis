// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/gachaRewardModel");
const responseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DRAWING GACHA
// ##############################################################
module.exports.drawGacha = (req, res, next) => {
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error drawGacha:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no gacha rewards in GachaReward table
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Gacha Rewards not found",
        });
      }

      // if there are gacha rewards in GachaReward table
      else {
        const random_number = Math.random();
        let gacha_draw_chance = 0;
        let item_got_from_gacha = undefined;

        //draw the gacha
        for (const gacha_item of results) {
          gacha_draw_chance += parseFloat(gacha_item.probability);
          if (random_number <= gacha_draw_chance) {
            item_got_from_gacha = gacha_item;
            break;
          }
        }

        // if the gacha draw is successful
        if (item_got_from_gacha !== undefined) {
          res.locals.reward_food_amount = item_got_from_gacha.reward_food_amount;
          res.locals.item_id = item_got_from_gacha.item_id;
          next();
        }
        // if the gacha draw is not successful
        else {
          res.status(responseStatusCode.Not_Found).json({
            message: "No item, Fail to draw Gacha",
          });
        }
      }
    }
  };

  model.selectAllGachaReward(callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING Gacha Reward BY item_id
// ##############################################################
module.exports.readGachaRewardByItemId = (req, res, next) => {
  const data = {
    item_id: res.locals.item_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readGachaRewardByItemId:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal Server error",
      });
    } else {
      // if there is no gacha reward in GachaReward table
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Gacha Item not found",
        });
      } else {
        //  if there is the gacha reward in GachaReward table
        res.status(responseStatusCode.OK).json(results[0]);
      }
    }
  };

  model.selectGachaRewardByItemId(data, callback);
};
