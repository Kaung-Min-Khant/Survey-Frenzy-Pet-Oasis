// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################
const SQLSTATEMENT = `
DROP PROCEDURE IF EXISTS RefreshShopItems;

CREATE PROCEDURE RefreshShopItems()
BEGIN
    DECLARE num_items INT DEFAULT 4; -- Number of items to refresh each day

    -- Remove today's entries if they exist
    DELETE FROM Shop;

    -- Reset Auto Increment Value
    ALTER TABLE Shop AUTO_INCREMENT = 0;

    -- Insert new items for today
    INSERT INTO Shop (pet_type, refresh_date)
    SELECT type_number, CURRENT_DATE()
    FROM PetWiki
    ORDER BY RAND()
    LIMIT num_items;
END;`

// ##############################################################
// RUN SQL STATEMENTS
//
// Creating PROCEDURE
// ##############################################################
pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating Procedures:", error);
    } else {
        console.log("Procedures created successfully");
    }
    process.exit();
});