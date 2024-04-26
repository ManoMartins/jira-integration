"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docx_1 = require("../lib/docx");
function releaseScopeSection(lastSprintsBySquad) {
    return {
        properties: {},
        children: [
            (0, docx_1.paragraph)({
                children: [
                    (0, docx_1.textRun)({
                        text: "Escopo da Liberação",
                        bold: true,
                        size: 32,
                    }),
                ],
            }),
            (0, docx_1.paragraph)({
                children: [
                    (0, docx_1.textRun)({
                        text: "Esta liberação atende as demandas listadas abaixo:",
                    }),
                ],
            }),
            (0, docx_1.paragraph)({
                children: [
                    (0, docx_1.textRun)({
                        text: "Features (Sprint):",
                        bold: true,
                    }),
                ],
            }),
            ...lastSprintsBySquad[0].issues.map((issue) => (0, docx_1.paragraph)({
                children: [
                    (0, docx_1.textRun)({
                        text: `${issue.key} - ${issue.summary}`,
                        bold: true,
                    }),
                ],
                bullet: {
                    level: 0,
                },
            })),
        ],
    };
}
exports.default = releaseScopeSection;
