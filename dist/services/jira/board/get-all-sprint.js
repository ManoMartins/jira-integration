"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../api");
async function getAllSprint(boardId) {
    try {
        const response = await api_1.default.get(`/rest/agile/1.0/board/${boardId}/sprint`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = getAllSprint;
