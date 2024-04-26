"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../api");
async function getAllSprint() {
    try {
        const response = await api_1.default.get(
        // "/rest/agile/1.0/board/3/sprint",
        "/rest/agile/1.0/board/3/sprint");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = getAllSprint;
