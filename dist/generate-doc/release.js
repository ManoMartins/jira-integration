"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const docx_1 = require("docx");
const chalk = require("chalk");
const docx_2 = require("../lib/docx");
const index_1 = require("../index");
function generateIssueParagraph(key, summary, bulletLevel, spacing) {
    return (0, docx_2.paragraph)({
        spacing,
        children: [
            new docx_1.ExternalHyperlink({
                link: `https://comunix-tech-team.atlassian.net/browse/${key}`,
                children: [(0, docx_2.textRun)({ style: 'Hyperlink', text: key, bold: true })],
            }),
            (0, docx_2.textRun)({ text: ` - ${summary}` }),
        ],
        bullet: { level: bulletLevel },
    });
}
function groupIssuesByModule(lastSprintsBySquad) {
    const issues = (0, lodash_1.flatMap)(lastSprintsBySquad.map((i) => i.issues));
    console.log({ lastSprintsBySquad });
    return (0, lodash_1.groupBy)(issues, 'module');
}
function releaseSection(lastSprintsBySquad) {
    console.log(chalk.blue('Creating release...'));
    return {
        properties: Object.assign({}, index_1.defaultProperties),
        children: [
            (0, docx_2.paragraph)({
                heading: 'Heading1',
                spacing: {
                    after: 200,
                },
                children: [
                    (0, docx_2.textRun)({
                        text: '2 Liberação',
                        bold: true,
                        size: 32,
                    }),
                ],
            }),
            (0, docx_2.paragraph)({
                indent: {
                    firstLine: '1.25cm',
                },
                children: [
                    (0, docx_2.textRun)({
                        text: 'A liberação da versão 0.0.17.61 do Comunix para o ambiente do WEB traz a implementação dos seguintes itens: ',
                    }),
                ],
            }),
            ...(0, lodash_1.flatMap)(Object.entries(groupIssuesByModule(lastSprintsBySquad)).map(([key, issues]) => {
                const paragraphs = [];
                const title = (0, docx_2.paragraph)({
                    indent: {
                        firstLine: '1.25cm',
                    },
                    spacing: {
                        after: 200,
                        before: 200,
                    },
                    children: [
                        (0, docx_2.textRun)({
                            text: `Módulo ${key}`,
                            bold: true,
                        }),
                    ],
                });
                paragraphs.push(title);
                const groupedIssues = (0, lodash_1.groupBy)(issues, 'parent.key');
                const sortedGroupedIssues = (0, lodash_1.sortBy)((0, lodash_1.toPairs)(groupedIssues), ([parentKey]) => {
                    // Se a chave for undefined, ela vem primeiro
                    if (parentKey === undefined)
                        return -1;
                    // Caso contrário, ordena alfabeticamente
                    return parentKey;
                });
                Object.entries((0, lodash_1.fromPairs)(sortedGroupedIssues)).forEach(([parentKey, i]) => {
                    if (parentKey && i[0].parent) {
                        paragraphs.push(generateIssueParagraph(parentKey, i[0].parent.summary, 0, {
                            before: 240,
                            after: 120,
                        }));
                    }
                    i.forEach((issue) => {
                        const isUndefined = parentKey === 'undefined';
                        paragraphs.push(generateIssueParagraph(issue.key, issue.summary, isUndefined ? 0 : 1, {
                            before: isUndefined ? 240 : 120,
                            after: isUndefined ? 120 : 60,
                        }));
                    });
                });
                return paragraphs;
            })),
            (0, docx_2.paragraph)({
                alignment: 'center',
                spacing: {
                    before: 240,
                },
                children: [
                    (0, docx_2.textRun)({
                        text: 'A versão está disponível para homologação em: ',
                    }),
                    new docx_1.ExternalHyperlink({
                        link: 'https://homolog.comunix.com',
                        children: [
                            (0, docx_2.textRun)({
                                text: 'https://homolog.comunix.com',
                                style: 'Hyperlink',
                            }),
                        ],
                    }),
                ],
            }),
            (0, docx_2.paragraph)({
                alignment: 'center',
                children: [
                    (0, docx_2.textRun)({
                        text: 'A versão está disponível para produção em: ',
                    }),
                    new docx_1.ExternalHyperlink({
                        link: 'https://adm.comunix.com',
                        children: [
                            (0, docx_2.textRun)({
                                text: 'https://adm.comunix.com',
                                style: 'Hyperlink',
                            }),
                        ],
                    }),
                ],
            }),
        ],
    };
}
exports.default = releaseSection;
