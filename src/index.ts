import * as chalk from 'chalk';

import { Command } from 'commander';

import { writeFileSync } from 'fs';
import { Packer, Document, ISectionPropertiesOptions } from 'docx';

import getAllSprint from './services/jira/board/get-all-sprint';
import GetAllSprint from './services/jira/board/get-all-sprint.interface';
import getBoardIssuesForSprint from './services/jira/sprint/get-board-issues-for-sprint';

import summarySection from './generate-doc/summary';
import releaseSection from './generate-doc/release';
import coverPageSection from './generate-doc/cover-page';
import introductionSection from './generate-doc/introduction';
import revisionsHistorySection from './generate-doc/revisions-history';

const { log } = console;

export const defaultProperties: ISectionPropertiesOptions = {
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

const program = new Command();

function getClosedSprints(sprints: GetAllSprint) {
  return sprints.values.filter((sprint) => sprint.state === 'closed');
}

async function getLastSprintsBySquad(sprints: GetAllSprint['values']) {
  // return await Promise.all(
  // Object.values(sprintsBySquad).map(async (sprints) => {
  // @ts-expect-error @ts-ignore
  sprints.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  const lastSprint = sprints[0];
  const sprintIssues = await getBoardIssuesForSprint(lastSprint.originBoardId, lastSprint.id);

  if (
    !sprintIssues
    || sprintIssues.issues.length === 0
    || !sprintIssues.names
  ) {
    return {
      sprint: lastSprint,
      issues: [],
    };
  }

  const fieldModule = Object.entries(sprintIssues.names).find(
    ([, name]) => name === 'Módulo Comunix',
  );
  const fieldReleaseDocument = Object.entries(sprintIssues.names).find(
    ([, name]) => name === 'Doc Liberação',
  );

  const issueSummaries = sprintIssues.issues
    .filter((issue) => {
      const isReleaseDocument = fieldReleaseDocument
      // @ts-expect-error @ts-ignore
        ? issue.fields[fieldReleaseDocument[0]]?.value
        : null;

      return isReleaseDocument === 'Sim' || !isReleaseDocument;
    })
    .map((issue) => {
      // @ts-expect-error @ts-ignore
      const module = fieldModule ? issue.fields[fieldModule[0]]?.value : null;

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

async function getSprints(sprints: GetAllSprint[]) {
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

    log(chalk.blue('Getting all sprints...'));
    const sprints = await Promise.all(
      sprintIds.map(async (sprintId) => getAllSprint(sprintId)),
    );

    const hasUndefined = sprints.some((item) => item === undefined);

    if (hasUndefined) return;

    log(chalk.blue('Getting last sprints closed by squad...'));
    const sprintsBySquad = await getSprints(sprints.filter((sprint) => !!sprint) as GetAllSprint[]);

    log(chalk.blue('Creating the Word document...'));
    const doc = new Document({
      sections: [
        coverPageSection(),
        revisionsHistorySection(),
        summarySection(),
        introductionSection(sprintsBySquad),
        releaseSection(sprintsBySquad),
      ],
    });

    Packer.toBuffer(doc)
      .then((buffer) => {
        // Write the buffer to a file
        writeFileSync('example.docx', buffer);
        log(chalk.blue('Word document created successfully.'));
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
