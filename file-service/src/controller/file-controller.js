const path = require('path');
const STATUS_CODE = require(path.resolve('./src/constants/status-code'));
const {FileService} = require('../service');


exports.initiateFile = async (request, response) => {
    try {
        const filename = request.body.filename
        const size = request.body.size

        const profile = await FileService.initiateFile(filename, size);

        response.sendSucess(STATUS_CODE.OK, 'Success', profile); // ✅ fixed
    } catch (error) {
        response.sendError(STATUS_CODE.BAD_REQUEST, error);
    }
};

exports.completeFile = async (request, response) => {
    try {
        const uploadId = request.body.uploadId
        const key = request.body.key
        const parts = request.body.parts
        const profile = await FileService.completeFile(uploadId, key, parts);

        response.sendSucess(STATUS_CODE.OK, 'Success', profile); // ✅ fixed
    } catch (error) {
        response.sendError(STATUS_CODE.BAD_REQUEST, error);
    }
};

exports.fetchFileById = async (request, response) => {
    try {
        const fileId = request.params.fileId
        console.log("fileId", fileId)
        const profile = await FileService.fetchFileById(fileId);

        response.sendSucess(STATUS_CODE.OK, 'Success', profile); // ✅ fixed
    } catch (error) {
        response.sendError(STATUS_CODE.BAD_REQUEST, error);
    }
};