class ApiError extends Error {
    constructor(
        statusCode,
        message = "Some thing went wrong",
        error = [message],
        stack = ""

    ) {
        super(message)
        this.statusCode = statusCode,
            this.message = message,
            this.success = false,
            this.data = null,
            this.error = error

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }