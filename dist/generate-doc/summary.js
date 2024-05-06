"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docx_1 = require("docx");
function summarySection() {
    return {
        children: [
            new docx_1.Paragraph({
                spacing: {
                    after: 300,
                    before: 300,
                },
                children: [
                    new docx_1.TextRun({
                        text: 'Sumário',
                        bold: true,
                        size: 32,
                        font: 'Arial',
                    }),
                ],
            }),
            new docx_1.TableOfContents('Summary', {
                hyperlink: true,
                headingStyleRange: '1-5',
            }),
        ],
    };
}
exports.default = summarySection;
