const model = require("../models/reviewModel.js");
const responseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATING A REVIEW
// ##############################################################
module.exports.createReview = (req, res, next) => {
  // if review_amt is missing in request body
  if (req.body.review_amt == undefined) {
    res.status(responseStatusCode.Bad_Request).json({ message: "Error: review_amt is undefined" });
    return;
  }
  // if review_amt is not between 1 to 5
  else if (req.body.review_amt > 5 || req.body.review_amt < 1) {
    res.status(responseStatusCode.Bad_Request).json({ message: "Error: review_amt can only be between 1 to 5" });
    return;
  }
  // if user_id is missing in token
  else if (res.locals.user_id == undefined) {
    res.status(responseStatusCode.Bad_Request).json({ message: "Error: user_id is undefined" });
    return;
  }

  const data = {
    user_id: res.locals.user_id,
    review_amt: req.body.review_amt,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error createMessage:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error",
      });
    }
    // if there are reviews in reviews table in SQL server
    else {
      res.status(responseStatusCode.Created).json({ message: "Review created successfully" });
    }
  };

  model.insertSingle(data, callback);
};
// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING A REVIEW BY ID
// ##############################################################
module.exports.readReviewById = (req, res, next) => {
  const data = {
    id: req.params.id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readReviewById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error",
      });
    } else {
      // if there is no review in reviews table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Review not found",
        });
      }
      // if there is review in reviews table in SQL server
      else res.status(responseStatusCode.OK).json(results[0]);
    }
  };

  model.selectById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING Statistics of Reviews
// ##############################################################
module.exports.readAllReviewStats = (req, res, next) => {
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllReviewStats:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error",
      });
    }
    // send the statistics of reviews in reviews table in SQL server
    else res.status(responseStatusCode.OK).json(results[0]);
  };

  model.selectReviewStats(callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL REVIEWS
// ##############################################################
module.exports.readAllReview = (req, res, next) => {
  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllReview:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error",
      });
    } else {
      // if there is no review in reviews table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Reviews not found",
        });
      }
      // if there are reviews in reviews table in SQL server
      else {
        res.status(responseStatusCode.OK).json(results);
      }
    }
  };

  model.selectAll(callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL REVIEWS by Owner ID
// ##############################################################
module.exports.readAllReviewByOwnerId = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error readAllReviewByOwnerId:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error",
      });
    } else {
      // if there is no review in reviews table in SQL server
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Review not found",
        });
      } else res.status(responseStatusCode.OK).json(results);
    }
  };

  model.selectAllByOwnerId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATING A REVIEW BY ID
// ##############################################################
module.exports.updateReviewById = (req, res, next) => {
  // if id is missing in request params
  if (req.params.id == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: id is undefined",
    });
    return;
  }
  // if review_amt is missing in request body
  else if (req.body.review_amt == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: review_amt is undefined",
    });
    return;
  }
  // if review_amt is not between 1 to 5
  else if (req.body.review_amt > 5 || req.body.review_amt < 1) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: review_amt can only be between 1 to 5",
    });
    return;
  }
  // if user_id is missing in token
  else if (res.locals.user_id == undefined) {
    res.status(responseStatusCode.Bad_Request).json({
      message: "Error: userId is undefined",
    });
    return;
  }

  const data = {
    id: req.params.id,
    user_id: res.locals.user_id,
    review_amt: req.body.review_amt,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error updateReviewById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error",
      });
    }
    // if review_amt updated successfully
    else {
      res.status(responseStatusCode.OK).json({
        message: "Review updated successfully",
      });
    }
  };

  model.updateById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETING A REVIEW BY ID
// ##############################################################
module.exports.deleteReviewById = (req, res, next) => {
  const data = {
    id: req.params.id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error deleteReviewById:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error",
      });
    } else {
      // if review does not exist
      if (results.affectedRows == 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Review not found",
        });
      }
      // if review is successfully deleted
      else {
        res.status(responseStatusCode.No_Content).send();
      }
    }
  };

  model.deleteById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CHECK Review OWNERSHIP of USER
// ##############################################################
module.exports.verifyReviewOwnerShip = (req, res, next) => {
  const data = {
    id: req.params.id,
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    // if there is something wrong with SQL server or SQL query
    if (error) {
      console.error("Error verifyReviewOwnerShip:", error);
      res.status(responseStatusCode.Internal_Server_Error).json({
        message: "Internal server error.",
      });
    } else {
      // if review does not exist
      if (results.length === 0) {
        res.status(responseStatusCode.Not_Found).json({
          message: "Review not found",
        });
      }

      // if review does not belong to user
      else if (results[0].user_id != data.user_id) {
        res.status(responseStatusCode.Forbidden).json({
          message: "Review does not belong to User",
        });
      }
      // if review belong to user
      else {
        next();
      }
    }
  };

  model.selectById(data, callback);
};
