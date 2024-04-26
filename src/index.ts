import { Command } from "commander";
import { writeFileSync } from "fs";
import { Packer, Document, ISectionPropertiesOptions } from "docx";

import getAllSprint from "./services/jira/board/get-all-sprint";
import GetAllSprint from "./services/jira/board/get-all-sprint.interface";
import getBoardIssuesForSprint from "./services/jira/sprint/get-board-issues-for-sprint";

import summarySection from "./generate-doc/summary";
import releaseSection from "./generate-doc/release";
import coverPageSection from "./generate-doc/cover-page";
import introductionSection from "./generate-doc/introduction";
import revisionsHistorySection from "./generate-doc/revisions-history";

export const defaultProperties: ISectionPropertiesOptions = {
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

const program = new Command();

function getClosedSprints(sprints: GetAllSprint) {
  return sprints.values.filter((sprint) => sprint.state === "closed");
}

function getSprintsBySquad(closedSprints: GetAllSprint["values"]) {
  return closedSprints.reduce((acc, sprint) => {
    if (!acc[sprint.originBoardId]) {
      acc[sprint.originBoardId] = [];
    }
    acc[sprint.originBoardId].push(sprint);
    return acc;
  }, {} as Record<number, GetAllSprint["values"]>);
}

async function getLastSprintsBySquad(
  sprintsBySquad: Record<number, GetAllSprint["values"]>
) {
  return await Promise.all(
    Object.values(sprintsBySquad).map(async (sprints) => {
      //@ts-ignore
      sprints.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

      const lastSprint = sprints[0];

      const sprintIssues = await getBoardIssuesForSprint(lastSprint.id);

      if (!sprintIssues) {
        return {
          sprint: lastSprint,
          issues: [],
        };
      }

      const name = Object.entries(sprintIssues.names).find(
        ([, name]) => name === "Módulo Comunix"
      );

      const issueSummaries = sprintIssues.issues.map((issue) => {
        // @ts-ignore
        const module = name ? issue.fields[name[0]]?.value : null;

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
    })
  );
}

program
  .version("1.0.0")
  .description("A simple CLI created with Node.js and commander.js")
  .option("--token <name>", "Greet the user with a custom name")
  .action(async (options: any[]) => {
    const sprints = await getAllSprint();

    if (!sprints) return;

    const closedSprints = getClosedSprints(sprints);
    const sprintsBySquad = getSprintsBySquad(closedSprints);
    const lastSprintsBySquad = await getLastSprintsBySquad(sprintsBySquad);

    const doc = new Document({
      sections: [
        coverPageSection(),
        revisionsHistorySection(),
        summarySection(),
        introductionSection(lastSprintsBySquad),
        releaseSection(lastSprintsBySquad),
      ],
    });

    Packer.toBuffer(doc)
      .then((buffer) => {
        // Write the buffer to a file
        writeFileSync("example.docx", buffer);
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
