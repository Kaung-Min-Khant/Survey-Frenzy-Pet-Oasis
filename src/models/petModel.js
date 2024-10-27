// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE MODEL To Retrieve All the Pets from Pet table
// ##############################################################
module.exports.selectAllPet = (callback) => {
  const SQLSTATMENT = `
    SELECT Pet.pet_id, PetWiki.name As species, Pet.creation_date, Pet.owner_id, User.username As owner FROM Pet
    INNER Join PetWiki ON PetWiki.type_number = Pet.type
    INNER Join User ON User.id = Pet.owner_id
    ;
    `;

  pool.query(SQLSTATMENT, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve Pet by owner_id from Pet table
// ##############################################################
module.exports.selectAllPetByOwnerId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT Pet.pet_id, PetWiki.name As species, Pet.creation_date, Pet.owner_id, User.username As owner FROM Pet
    INNER Join PetWiki ON PetWiki.type_number = Pet.type
    INNER Join User ON User.id = Pet.owner_id
    WHERE owner_id = ?;
    `;

  const VALUES = [data.owner_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve Pet by pet_id from Pet table
// ##############################################################
module.exports.selectPetByPetId = (data, callback) => {
  const SQLSTATMENT = `
  SELECT Pet.pet_id, PetWiki.name As species, Pet.creation_date, Pet.owner_id, User.username As owner FROM Pet
  INNER Join PetWiki ON PetWiki.type_number = Pet.type
  INNER Join User ON User.id = Pet.owner_id
  WHERE pet_id = ?;
  `;

  const VALUES = [data.pet_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve Pet by owner_id from Pet table
// ##############################################################
module.exports.selectAllPetWithHungerStatsByOwnerId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT Pet.pet_id, PetWiki.name As species, Pet.creation_date, Pet.owner_id, User.username As owner, Pet.hunger FROM Pet
    INNER Join PetWiki ON PetWiki.type_number = Pet.type
    INNER Join User ON User.id = Pet.owner_id
    WHERE owner_id = ?;
    `;

  const VALUES = [data.owner_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Reduce hunger_level of Pet by Time difference from Pet table
// ##############################################################
module.exports.reduceHungerLevelOfPetByTimeDiff = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE Pet
    SET hunger = GREATEST(hunger - TIMESTAMPDIFF(HOUR, last_hunger_update_on, CURRENT_TIMESTAMP) ,0),
	  last_hunger_update_on = CURRENT_TIMESTAMP
    WHERE owner_id = ? AND TIMESTAMPDIFF(HOUR, last_hunger_update_on, CURRENT_TIMESTAMP) >= 1;
    `;

  const VALUES = [data.owner_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Count userAnswer by participant_id From UserAnswer table
// ##############################################################
module.exports.countUserPetsByOwnerId = (data, callback) => {
  const SQLSTATMENT = `
        SELECT COUNT(pet_id) AS pet_count FROM Pet
        WHERE owner_id = ?;
        `;

  const VALUES = [data.user_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Insert Pet record Into Pet table
// ##############################################################
module.exports.insertSinglePet = (data, callback) => {
  const SQLSTATMENT = `
  INSERT INTO Pet (type, owner_id)
  VALUES (?, ?);
  `;

  const VALUES = [data.type, data.owner_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL to Increase hunger_level of Pet by owner_id from Pet table
// ##############################################################
module.exports.increaseHungerLevelOfPetByFoodAmount = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE Pet
  SET hunger = LEAST(hunger + ? , 100),
  last_hunger_update_on = CURRENT_TIMESTAMP
  WHERE pet_id = ?;
  `;

  const VALUES = [data.food_amount, data.pet_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve Pet by pet_id from Pet table 
// ##############################################################
module.exports.selectPetHungerByPetId = (data, callback) => {
  const SQLSTATMENT = `
  SELECT Pet.pet_id, Pet.owner_id, Pet.hunger, User.food_amt FROM Pet
  INNER Join User ON User.id = Pet.owner_id
  WHERE pet_id = ?;
  `;

  const VALUES = [data.pet_id];
  pool.query(SQLSTATMENT, VALUES, callback);
}