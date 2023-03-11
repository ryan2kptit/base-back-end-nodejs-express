
const StatusCode = {
    FORBIDDEN: 403,
    BAD_REQUEST: 400
}

const MessageError = {
    FORBIDDEN: '',
    BAD_REQUEST: 'Bad request error'
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

module.exports = {
    BadRequestError
}