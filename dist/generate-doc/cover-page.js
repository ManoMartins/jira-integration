"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docx_1 = require("docx");
const fs_1 = require("fs");
const docx_2 = require("../lib/docx");
function coverPageSection() {
    return {
        headers: {
            default: new docx_1.Header({
                children: [
                    (0, docx_2.paragraph)({
                        alignment: "center",
                        children: [
                            new docx_1.ImageRun({
                                data: (0, fs_1.readFileSync)("./header.png"),
                                transformation: {
                                    width: 390.4879474069,
                                    height: 110.2731921114,
                                },
                            }),
                        ],
                    }),
                ],
            }),
        },
        footers: {
            default: new docx_1.Footer({
                children: [
                    (0, docx_2.paragraph)({
                        // alignment: "center",
                        children: [
                            new docx_1.ImageRun({
                                data: (0, fs_1.readFileSync)("./footer.png"),
                                transformation: {
                                    width: 759,
                                    height: 139,
                                },
                                floating: {
                                    horizontalPosition: { align: "center" },
                                    verticalPosition: { align: "bottom" },
                                },
                            }),
                        ],
                    }),
                ],
            }),
        },
        children: [],
    };
}
exports.default = coverPageSection;
