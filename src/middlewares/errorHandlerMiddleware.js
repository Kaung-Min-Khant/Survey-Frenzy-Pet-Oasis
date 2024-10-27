//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const ResponseStatusCode = require("../utils/httpStatusCode");

// ##############################################################
// DEFINE errorHandler FUNCTION FOR HANDLING ERROR
// ##############################################################

const errorHandler = (error, req, res, next) => {
    // if client request json does not have correct json format
    if ('body' in error) {
        console.error("Error at errorHandler:", error);
        res.status(ResponseStatusCode.Bad_Request).json({
            message: "request JSON body error"
        });
    }
    // if normal server side internal error
    else {
        console.error("Error at errorHandler:", error);
        res.status(ResponseStatusCode.Internal_Server_Error).json({
            message: "Internal Server error"
        })
    }
}

//////////////////////////////////////////////////////
// EXPORT errorHandler
//////////////////////////////////////////////////////
module.exports = errorHandler;