// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE MODEL To Retrieve All the Users from USER table
// ##############################################################
module.exports.selectAllShopItem = (callback) => {
  const SQLSTATMENT = `
    SELECT Shop.item_id, Shop.pet_type, PetWiki.name AS species, PetWiki.price, Shop.refresh_date FROM Shop
    JOIN PetWiki ON Shop.pet_type = PetWiki.type_number;
    `;

  pool.query(SQLSTATMENT, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve Shop Item by item_id from Shop table
// ##############################################################
module.exports.selectShopItemByItemId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM Shop
    Join PetWiki on Shop.pet_type = PetWiki.type_number
    WHERE Shop.item_id = ?;
    `;

  const VALUES = [data.item_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};
