// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/petWikiModel");
const responseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READING ALL Pet Encyclopedia
// ##############################################################
module.exports.readAllPetWiki = (req, res, next) => {

    const callback = (error, results, fields) => {

        // if there is something wrong with SQL server or SQL query
        if (error) {
            console.error("Error readAllPetWiki:", error);
            res.status(responseStatusCode.Internal_Server_Error).json({
                message: "Internal Server error"
            });
        }

        else {
            // if there is no pet info in PetWiki table in SQL server
            if (results.length === 0) {
                res.status(responseStatusCode.Not_Found).json({
                    message: "Pet Wikipedia Info not found"
                });
            }

            // if there are pet info in PetWiki table in SQL server
            else res.status(responseStatusCode.OK).json(results);
        }
    }

    model.selectAllPetWiki(callback);
}