//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db");

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME
//////////////////////////////////////////////////////
module.exports.selectByUsername = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;

  const VALUES = [data.username];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////
module.exports.selectByUsernameOrEmail = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ? OR email = ?;
    `;

  const VALUES = [data.username, data.email];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// SELECT USER BY ID
//////////////////////////////////////////////////////
module.exports.selectUserById = (data, callback) => {
  const SQLSTATMENT = `
        SELECT id, username, email, created_on, updated_on, last_login_on, points, food_amt FROM User
        WHERE id = ?;
        `;

  const VALUES = [data.user_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve All the Users from USER table
// ##############################################################
module.exports.selectAllUser = (callback) => {
  const SQLSTATMENT = `
    SELECT id, username, email, created_on, updated_on, last_login_on FROM User;
    `;

  pool.query(SQLSTATMENT, callback);
};

//////////////////////////////////////////////////////
// INSERT USER
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
        INSERT INTO User (username, email, password)
        VALUES (?, ?, ?);
        `;

  const VALUES = [data.username, data.email, data.hashPassword];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Update Last Login Time of User From USER table
// ##############################################################
module.exports.updateUserLastLogin = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE User
    SET last_login_on = CURRENT_TIMESTAMP
    WHERE id = ?;
    `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Add 5 Points of User From USER table
// ##############################################################
module.exports.AddFivePointsToUser = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE User
    SET points = points + 5
    WHERE id = ?;
    `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Reduce Points of User From USER table
// ##############################################################
module.exports.reducePointsOfUserByPrice = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE User
  SET points = points - ?
  WHERE id = ?;
  `;

  const VALUES = [data.price, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Increase Food Amount of Food Inventory By Gacha Reward From FoodInventory table
// ##############################################################
module.exports.increaseUserFoodAmountByGachaReward = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE User
  SET food_amt = food_amt + ?
  WHERE id = ?;
  `;

  const VALUES = [data.food_amount, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Reduce Food Amount of Food Inventory By Owner_id From FoodInventory table
// ##############################################################
module.exports.reduceFoodAmountOfFoodInventoryByFoodIntake = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE User
  SET food_amt = food_amt - ?
  WHERE id = ?;
  `;

  const VALUES = [data.food_intake, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve User by username from USER table
// ##############################################################
module.exports.selectUserByUsername = (data, callback) => {
  const SQLSTATMENT = `
  SELECT * FROM User
  WHERE username = ?;
  `;

  const VALUES = [data.username];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Update Username of User From USER table
// ##############################################################
module.exports.updateUsernameById = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE User
  SET username = ?, updated_on = CURRENT_TIMESTAMP
  WHERE id = ?;
  `;

  const VALUES = [data.username, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};
