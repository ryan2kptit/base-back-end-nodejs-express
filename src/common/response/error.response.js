const { ReasonPhrases, StatusCodes } = require("../../utils/httpStatusCode")

const StatusCode = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    BAD_REQUEST: 400
}

const MessageError = {
    FORBIDDEN: '',
    BAD_REQUEST: 'Bad request error',
    NOT_FOUND: 'Not found'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class BadRequestError extends ErrorResponse {

    constructor(message = MessageError.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

class NotFoundRequestError extends ErrorResponse {

    constructor(message = MessageError.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
        super(message, statusCode)
    }
}

module.exports = {
    BadRequestError,
    AuthFailureError,
    NotFoundRequestError
}