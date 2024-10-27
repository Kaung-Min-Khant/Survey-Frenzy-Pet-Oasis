// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE MODEL To Retrieve All the Reviews from Reviews table
// ##############################################################
module.exports.selectAll = (callback) => {
  const SQLSTATMENT = `
    SELECT Reviews.id, Reviews.review_amt, Reviews.user_id, User.username, User.email FROM Reviews
    INNER Join User ON Reviews.user_id = User.id;
    `;

  pool.query(SQLSTATMENT, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve a Review by ID from Reviews table
// ##############################################################
module.exports.selectById = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM Reviews
    WHERE id = ?;
    `;
  const VALUES = [data.id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve a Review by ID from Reviews table
// ##############################################################
module.exports.selectAllByOwnerId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT Reviews.id, Reviews.review_amt, Reviews.user_id, User.username, User.email FROM Reviews
    INNER Join User ON Reviews.user_id = User.id
    WHERE user_id = ?;
    `;
  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To insert a Review record into Reviews table
// ##############################################################
module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO Reviews (review_amt, user_id)
    VALUES (?, ?);
    `;
  const VALUES = [data.review_amt, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Update a Review record in Reviews table
// ##############################################################
module.exports.updateById = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE Reviews 
    SET review_amt = ?, user_id = ?
    WHERE id = ?;
    `;
  const VALUES = [data.review_amt, data.user_id, data.id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Delete a Review record from Reviews table
// ##############################################################
module.exports.deleteById = (data, callback) => {
  const SQLSTATMENT = `
    DELETE FROM Reviews 
    WHERE id = ?;
    `;
  const VALUES = [data.id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL To Retrieve all the Statstiics from Reviews table
// ##############################################################
module.exports.selectReviewStats = (callback) => {
  const SQLSTATMENT = `
    SELECT COUNT(id) AS count_reviews, ROUND(AVG(review_amt), 1) AS avg_review_amt, SUM(review_amt) As total_review_amt FROM Reviews;
    `;

  pool.query(SQLSTATMENT, callback);
};
