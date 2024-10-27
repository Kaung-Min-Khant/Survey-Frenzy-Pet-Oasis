// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/shopModel");
const responseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL Shop Items
// ##############################################################

module.exports.readAllShopItem = (req, res, next) => {

    const callback = (error, results, fields) => {

        // if there is something wrong with SQL server or SQL query
        if (error) {
            console.error("Error readAllShopItem:", error);
            res.status(responseStatusCode.Internal_Server_Error).json({
                message: "Internal Server error"
            });
        }

        else {
            // if there is no shop items in Shop table in SQL server
            if (results.length === 0) {
                res.status(responseStatusCode.Not_Found).json({
                    message: "Items not found"
                });
            }

            // if there are shop items in Shop table in SQL server
            else res.status(responseStatusCode.OK).json(results);
        }
    }

    model.selectAllShopItem(callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING Shop Item BY item_id
// ##############################################################

module.exports.readShopItemByItemId = (req, res, next) => {

    const data = {
        item_id: req.params.item_id
    }

    const callback = (error, results, fields) => {

        // if there is something wrong with SQL server or SQL query
        if (error) {
            console.error("Error readShopItemByItemId:", error);
            res.status(responseStatusCode.Internal_Server_Error).json({
                message: "Internal Server error"
            });
        }

        else {
            // if there is no shop item in Shop table in SQL server
            if (results.length === 0) {
                res.status(responseStatusCode.Not_Found).json({
                    message: "Shop Item not found"
                });
            }
            // if there is shop item in Shop table in SQL server
            else {
                res.locals.pet_type = results[0].pet_type;
                res.locals.price = results[0].price;
                next();
            }

        }
    }

    model.selectShopItemByItemId(data, callback);
}