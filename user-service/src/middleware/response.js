module.exports = (app) => {
    app.response.sendSucess = function (statusCode = 200, message = 'SUCCESS', data = null) {
        const status = 1;
        const responseObj = { statusCode, status, message, data };
        return this.status(statusCode).send(responseObj);
    };

    app.response.sendError = function (statusCode = 400, error = 'ERROR', req = null) {
        const status = 0;
        let message = 'SOMETHING WENT WRONG';
        if (error && error.message) {
            message = error.message;
        }

        return this.status(statusCode).send({ statusCode, status, message, error: error.cause || error });
    };
};
