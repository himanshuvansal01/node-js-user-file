const path = require('path');
const STATUS_CODE = require(path.resolve('./src/constants/status-code'));
const {UserService} = require('../../src/service');


exports.register = async (request, response) => {
    try {
        const { email, password } = request.body;
        const register = await UserService.register(email, password);

        response.sendSucess(STATUS_CODE.OK, 'Success', register);
    } catch (error) {
        response.sendError(STATUS_CODE.BAD_REQUEST, error);
    }
};

exports.login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const login = await UserService.login(email, password);

        response.sendSucess(STATUS_CODE.OK, 'Success', login);
    } catch (error) {
        response.sendError(STATUS_CODE.BAD_REQUEST, error);
    }
};

exports.refreshToken = async (request, response) => {
    try {
        const {refreshToken} = request.body;
        const refresh = await UserService.refreshToken(refreshToken);

        response.sendSucess(STATUS_CODE.OK, 'Success', refresh);
    } catch (error) {
        response.sendError(STATUS_CODE.BAD_REQUEST, error);
    }
};

exports.getProfile = async (request, response) => {
    try {
        const userId = request.user.id
        const profile = await UserService.getProfile(userId);

        response.sendSucess(STATUS_CODE.OK, 'Success', profile); // ✅ fixed
    } catch (error) {
        response.sendError(STATUS_CODE.BAD_REQUEST, error);
    }
};