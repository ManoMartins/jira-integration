"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const fs = require("node:fs");
// const cloudId = "823d4cf1-5e56-4678-bf3e-d971639c97c7";
const cloudId = "b80e561d-d656-439e-ae6f-36e10227ac9b";
const api = axios_1.default.create({
    baseURL: `https://api.atlassian.com/ex/jira/${cloudId}`,
});
let token = "";
api.interceptors.request.use((config) => {
    if (!token) {
        const data = fs.readFileSync("credentials.json", "utf8");
        try {
            const jsonData = JSON.parse(data);
            token = jsonData.token;
        }
        catch (parseError) {
            console.error("Error parsing JSON:", parseError);
        }
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
exports.default = api;
