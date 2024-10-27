// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE MODEL To Retrieve All the Gacha Rewards from GachaReward table
// ##############################################################
module.exports.selectAllGachaReward = (callback) => {
  const SQLSTATMENT = `
    SELECT * FROM GachaReward;
    `;

  pool.query(SQLSTATMENT, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve Gacha Reward by item_id from GachaReward table
// ##############################################################
module.exports.selectGachaRewardByItemId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM GachaReward
    WHERE item_id = ?;
    `;

  const VALUES = [data.item_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};
