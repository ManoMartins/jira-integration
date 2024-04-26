"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProperties = void 0;
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
exports.defaultProperties = {
    page: {
        margin: {
            header: "0cm",
            footer: "0cm",
            top: "3.5cm",
            bottom: "3.5cm",
            right: "2cm",
            left: "3cm",
        },
    },
};
const program = new commander_1.Command();
function getClosedSprints(sprints) {
    return sprints.values.filter((sprint) => sprint.state === "closed");
}
function getSprintsBySquad(closedSprints) {
    return closedSprints.reduce((acc, sprint) => {
        if (!acc[sprint.originBoardId]) {
            acc[sprint.originBoardId] = [];
        }
        acc[sprint.originBoardId].push(sprint);
        return acc;
    }, {});
}
async function getLastSprintsBySquad(sprintsBySquad) {
    return await Promise.all(Object.values(sprintsBySquad).map(async (sprints) => {
        //@ts-ignore
        sprints.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
        const lastSprint = sprints[0];
        const sprintIssues = await (0, get_board_issues_for_sprint_1.default)(lastSprint.id);
        if (!sprintIssues) {
            return {
                sprint: lastSprint,
                issues: [],
            };
        }
        const name = Object.entries(sprintIssues.names).find(([, name]) => name === "Módulo Comunix");
        const issueSummaries = sprintIssues.issues.map((issue) => {
            var _a;
            // @ts-ignore
            const module = name ? (_a = issue.fields[name[0]]) === null || _a === void 0 ? void 0 : _a.value : null;
            return {
                key: issue.key,
                module: module,
                summary: issue.fields.summary,
                parent: {
                    key: issue.fields.parent.key,
                    summary: issue.fields.parent.fields.summary,
                },
            };
        });
        return {
            sprint: lastSprint,
            issues: issueSummaries,
        };
    }));
}
program
    .version("1.0.0")
    .description("A simple CLI created with Node.js and commander.js")
    .option("--token <name>", "Greet the user with a custom name")
    .action(async (options) => {
    const sprints = await (0, get_all_sprint_1.default)();
    if (!sprints)
        return;
    const closedSprints = getClosedSprints(sprints);
    const sprintsBySquad = getSprintsBySquad(closedSprints);
    const lastSprintsBySquad = await getLastSprintsBySquad(sprintsBySquad);
    const doc = new docx_1.Document({
        sections: [
            (0, cover_page_1.default)(),
            (0, revisions_history_1.default)(),
            (0, summary_1.default)(),
            (0, introduction_1.default)(lastSprintsBySquad),
            (0, release_1.default)(lastSprintsBySquad),
        ],
    });
    docx_1.Packer.toBuffer(doc)
        .then((buffer) => {
        // Write the buffer to a file
        (0, fs_1.writeFileSync)("example.docx", buffer);
        console.log("Word document created successfully.");
    })
        .catch((error) => {
        console.log("Error occurred while creating the Word document:", error);
    });
})
    .parse(process.argv);
// if (program.opts().token) {
//   console.log(`Hello, ${program.opts().token}!`);
// } else {
//   console.log("No token provided.");
// }
