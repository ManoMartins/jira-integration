"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProperties = void 0;
const chalk_1 = require("chalk");
const commander_1 = require("commander");
const fs_1 = require("fs");
const docx_1 = require("docx");
const get_all_sprint_1 = require("./services/jira/board/get-all-sprint");
const get_board_issues_for_sprint_1 = require("./services/jira/sprint/get-board-issues-for-sprint");
const summary_1 = require("./generate-doc/summary");
const release_1 = require("./generate-doc/release");
const cover_page_1 = require("./generate-doc/cover-page");
const introduction_1 = require("./generate-doc/introduction");
const revisions_history_1 = require("./generate-doc/revisions-history");
const { log } = console;
exports.defaultProperties = {
    page: {
        margin: {
            header: '0cm',
            footer: '0cm',
            top: '3.5cm',
            bottom: '3.5cm',
            right: '2cm',
            left: '3cm',
        },
    },
};
const program = new commander_1.Command();
function getClosedSprints(sprints) {
    return sprints.values.filter((sprint) => sprint.state === 'closed');
}
async function getLastSprintsBySquad(sprints) {
    // return await Promise.all(
    // Object.values(sprintsBySquad).map(async (sprints) => {
    // @ts-expect-error @ts-ignore
    sprints.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    const lastSprint = sprints[0];
    const sprintIssues = await (0, get_board_issues_for_sprint_1.default)(lastSprint.originBoardId, lastSprint.id);
    if (!sprintIssues
        || sprintIssues.issues.length === 0
        || !sprintIssues.names) {
        return {
            sprint: lastSprint,
            issues: [],
        };
    }
    const fieldModule = Object.entries(sprintIssues.names).find(([, name]) => name === 'Módulo Comunix');
    const fieldReleaseDocument = Object.entries(sprintIssues.names).find(([, name]) => name === 'Doc Liberação');
    const issueSummaries = sprintIssues.issues
        .filter((issue) => {
        var _a;
        const isReleaseDocument = fieldReleaseDocument
            // @ts-expect-error @ts-ignore
            ? (_a = issue.fields[fieldReleaseDocument[0]]) === null || _a === void 0 ? void 0 : _a.value
            : null;
        return isReleaseDocument === 'Sim' || !isReleaseDocument;
    })
        .map((issue) => {
        var _a;
        // @ts-expect-error @ts-ignore
        const module = fieldModule ? (_a = issue.fields[fieldModule[0]]) === null || _a === void 0 ? void 0 : _a.value : null;
        return {
            key: issue.key,
            module,
            summary: issue.fields.summary,
            parent: issue.fields.parent
                ? {
                    key: issue.fields.parent.key,
                    summary: issue.fields.parent.fields.summary,
                }
                : undefined,
        };
    });
    return {
        sprint: lastSprint,
        issues: issueSummaries,
    };
    // })
    // );
}
async function getSprints(sprints) {
    const sprintIssues = await Promise.all(sprints.map(async (sprint) => {
        const closedSprints = getClosedSprints(sprint);
        return getLastSprintsBySquad(closedSprints);
    }));
    return sprintIssues;
}
program
    .version('1.0.0')
    .description('A simple CLI created with Node.js and commander.js')
    .option('--token <name>', 'Greet the user with a custom name')
    .action(async () => {
    const sprintIds = [40, 41, 42, 45];
    log(chalk_1.default.blue('Getting all sprints...'));
    const sprints = await Promise.all(sprintIds.map(async (sprintId) => (0, get_all_sprint_1.default)(sprintId)));
    const hasUndefined = sprints.some((item) => item === undefined);
    if (hasUndefined)
        return;
    log(chalk_1.default.blue('Getting last sprints closed by squad...'));
    const sprintsBySquad = await getSprints(sprints.filter((sprint) => !!sprint));
    log(chalk_1.default.blue('Creating the Word document...'));
    const doc = new docx_1.Document({
        sections: [
            (0, cover_page_1.default)(),
            (0, revisions_history_1.default)(),
            (0, summary_1.default)(),
            (0, introduction_1.default)(sprintsBySquad),
            (0, release_1.default)(sprintsBySquad),
        ],
    });
    docx_1.Packer.toBuffer(doc)
        .then((buffer) => {
        // Write the buffer to a file
        (0, fs_1.writeFileSync)('example.docx', buffer);
        log(chalk_1.default.blue('Word document created successfully.'));
    })
        .catch((error) => {
        console.log('Error occurred while creating the Word document:', error);
    });
})
    .parse(process.argv);
// if (program.opts().token) {
//   console.log(`Hello, ${program.opts().token}!`);
// } else {
//   console.log("No token provided.");
// }
