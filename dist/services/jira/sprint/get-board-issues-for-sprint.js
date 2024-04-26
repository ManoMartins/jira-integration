"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../api");
async function getBoardIssuesForSprint(sprintId) {
    try {
        const response = await api_1.default.get(
        // `/rest/agile/1.0/board/3/sprint/${sprintId}/issue?jql=type in (Story, Task) and status = Done ORDER BY created DESC&expand=names`,
        `/rest/agile/1.0/board/3/sprint/${sprintId}/issue?jql=type in (Story, Task) and status = Done ORDER BY created DESC&expand=names`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = getBoardIssuesForSprint;
