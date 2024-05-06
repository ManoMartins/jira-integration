import * as chalk from 'chalk';
import { ISectionOptions } from 'docx';
import { defaultProperties } from '../index';

import GetAllSprint from '../services/jira/board/get-all-sprint.interface';

import { textRun, paragraph } from '../lib/docx';

function introductionSection(
  lastSprintsBySquad: {
    sprint: GetAllSprint['values'][0];
    issues: {
      key: string;
      module: string;
      summary: string;
      parent?: {
        key: string;
        summary: string;
      };
    }[];
  }[],
): ISectionOptions {
  console.log(chalk.blue('Creating introduction...'));
  return {
    properties: {
      ...defaultProperties,
    },

    children: [
      paragraph({
        heading: 'Heading1',
        spacing: {
          after: 200,
        },
        children: [
          textRun({
            text: '1 Introdução',
            bold: true,
            size: 32,
          }),
        ],
      }),
      paragraph({
        indent: {
          firstLine: '1.25cm',
        },

        children: [
          textRun({
            text: `Esse documento traz a liberação da versão 0.0.17.61 do Comunix desenvolvida de ${lastSprintsBySquad[0].sprint.startDate} até ${lastSprintsBySquad[0].sprint.endDate}`,
          }),
        ],
      }),
      ...lastSprintsBySquad.map((sprintBySquad) => paragraph({
        alignment: 'both',
        indent: {
          firstLine: '1.25cm',
        },
        children: [
          textRun({
            text: sprintBySquad.sprint.goal,
          }),
        ],
      })),
    ],
  };
}

export default introductionSection;
