"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const docx_1 = require("../lib/docx");
function introductionSection(lastSprintsBySquad) {
    return {
        properties: Object.assign({}, index_1.defaultProperties),
        children: [
            (0, docx_1.paragraph)({
                heading: "Heading1",
                spacing: {
                    after: 200,
                },
                children: [
                    (0, docx_1.textRun)({
                        text: "1 Introdução",
                        bold: true,
                        size: 32,
                    }),
                ],
            }),
            (0, docx_1.paragraph)({
                indent: {
                    firstLine: `1.25cm`,
                },
                children: [
                    (0, docx_1.textRun)({
                        text: "Esse documento traz a liberação da versão 0.0.17.61 do Comunix desenvolvida de 18/03/2024 até 29/03/2024.",
                    }),
                ],
            }),
            ...lastSprintsBySquad.map((sprintBySquad) => {
                return (0, docx_1.paragraph)({
                    alignment: "both",
                    indent: {
                        firstLine: `1.25cm`,
                    },
                    children: [
                        (0, docx_1.textRun)({
                            text: sprintBySquad.sprint.goal,
                        }),
                    ],
                });
            }),
        ],
    };
}
exports.default = introductionSection;
