// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################
const SQLSTATEMENT = `
DROP EVENT IF EXISTS RefreshShopDaily;

SET GLOBAL event_scheduler = ON;

CREATE EVENT RefreshShopDaily
ON SCHEDULE EVERY 1 DAY
STARTS (Now())
DO
CALL RefreshShopItems();`;

// ##############################################################
// RUN SQL STATEMENTS
//
// Creating Event Scheduler
// ##############################################################
pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating Event Scheduler:", error);
  } else {
    console.log("Event Scheduler created successfully");
  }
  process.exit();
});
