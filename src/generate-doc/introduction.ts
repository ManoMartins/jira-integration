import { defaultProperties } from "../index";
import { ISectionOptions } from "docx";

import GetAllSprint from "../services/jira/board/get-all-sprint.interface";

import { textRun, paragraph } from "../lib/docx";

function introductionSection(
  lastSprintsBySquad: {
    sprint: GetAllSprint["values"][0];
    issues: {
      key: string;
      module: any;
      summary: string;
      parent: {
        key: string;
        summary: string;
      };
    }[];
  }[]
): ISectionOptions {
  return {
    properties: {
      ...defaultProperties,
    },

    children: [
      paragraph({
        heading: "Heading1",
        spacing: {
          after: 200,
        },
        children: [
          textRun({
            text: "1 Introdução",
            bold: true,
            size: 32,
          }),
        ],
      }),
      paragraph({
        indent: {
          firstLine: `1.25cm`,
        },

        children: [
          textRun({
            text: "Esse documento traz a liberação da versão 0.0.17.61 do Comunix desenvolvida de 18/03/2024 até 29/03/2024.",
          }),
        ],
      }),
      ...lastSprintsBySquad.map((sprintBySquad) => {
        return paragraph({
          alignment: "both",
          indent: {
            firstLine: `1.25cm`,
          },
          children: [
            textRun({
              text: sprintBySquad.sprint.goal,
            }),
          ],
        });
      }),
    ],
  };
}

export default introductionSection;
