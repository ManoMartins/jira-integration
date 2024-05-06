"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../api");
async function getBoardIssuesForSprint(boardId, sprintId) {
    try {
        const response = await api_1.default.get(`/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue?jql=type in (Story, Task) and status = Concluído ORDER BY created DESC&expand=names`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = getBoardIssuesForSprint;
