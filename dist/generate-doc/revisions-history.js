"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docx_1 = require("docx");
const docx_2 = require("../lib/docx");
function cellHeader(text) {
    return new docx_1.TableCell({
        shading: {
            type: "pct65",
            color: "#FF9000",
            fill: "#FF9000",
        },
        verticalAlign: docx_1.VerticalAlign.CENTER,
        children: [
            (0, docx_2.paragraph)({
                alignment: "center",
                children: [
                    (0, docx_2.textRun)({
                        text,
                        bold: true,
                    }),
                ],
            }),
        ],
    });
}
function createHeader() {
    return new docx_1.TableRow({
        tableHeader: true,
        children: [
            cellHeader("VERSÃO"),
            cellHeader("RESPONSÁVEL"),
            cellHeader("DESCRIÇÃO"),
            cellHeader("DATA"),
        ],
    });
}
function cell(text) {
    return new docx_1.TableCell({
        children: [
            (0, docx_2.paragraph)({
                alignment: "center",
                children: [
                    (0, docx_2.textRun)({
                        text,
                    }),
                ],
            }),
        ],
    });
}
function createRow(version, responsible, description, date) {
    return new docx_1.TableRow({
        children: [
            cell(version),
            cell(responsible),
            cell(description),
            cell(date.toLocaleDateString()),
        ],
    });
}
function revisionsHistorySection() {
    return {
        children: [
            (0, docx_2.paragraph)({
                alignment: "center",
                spacing: {
                    after: 300,
                    before: 200,
                },
                children: [
                    (0, docx_2.textRun)({
                        text: "HISTÓRICO DE REVISÕES",
                        size: 26,
                        bold: true,
                    }),
                ],
            }),
            new docx_1.Table({
                width: {
                    size: 100,
                    type: docx_1.WidthType.PERCENTAGE,
                },
                margins: {
                    top: (0, docx_1.convertInchesToTwip)(0.1),
                    bottom: (0, docx_1.convertInchesToTwip)(0.1),
                    right: (0, docx_1.convertInchesToTwip)(0.1),
                    left: (0, docx_1.convertInchesToTwip)(0.1),
                },
                rows: [
                    createHeader(),
                    createRow("1", "João", "Criação do sistema", new Date(2022, 1, 1)),
                ],
            }),
        ],
    };
}
exports.default = revisionsHistorySection;
