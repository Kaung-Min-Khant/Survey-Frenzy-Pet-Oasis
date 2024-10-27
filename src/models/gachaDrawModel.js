// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE MODEL To insert a Review record into Reviews table
// ##############################################################
module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
      INSERT INTO GachaDraw (player_id, reward_item)
      VALUES (?, ?);
      `;
  const VALUES = [data.user_id, data.item_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};
