//////////////////////////////////////////////////////
// HTTP response status code to prevent typo error
//////////////////////////////////////////////////////

const statusCode = {
    OK: 200,
    Created: 201,
    No_Content: 204,
    Bad_Request: 400,
    Unauthorized: 401,
    Payment_Required: 402,
    Forbidden: 403,
    Not_Found: 404,
    Conflict: 409,
    Internal_Server_Error: 500
}

//////////////////////////////////////////////////////
// EXPORT statusCode
//////////////////////////////////////////////////////
module.exports = statusCode;