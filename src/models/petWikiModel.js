// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE MODEL To Retrieve All the Pet Type and Price from PetCatalog table
// ##############################################################
module.exports.selectAllPetWiki = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM PetWiki;
    `;

    pool.query(SQLSTATMENT, callback);
}

