import { ISectionOptions } from "docx";

import { textRun, paragraph } from "../lib/docx";
import GetAllSprint from "../services/jira/board/get-all-sprint.interface";

function releaseScopeSection(
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
    properties: {},
    children: [
      paragraph({
        children: [
          textRun({
            text: "Escopo da Liberação",
            bold: true,
            size: 32,
          }),
        ],
      }),
      paragraph({
        children: [
          textRun({
            text: "Esta liberação atende as demandas listadas abaixo:",
          }),
        ],
      }),
      paragraph({
        children: [
          textRun({
            text: "Features (Sprint):",
            bold: true,
          }),
        ],
      }),
      ...lastSprintsBySquad[0].issues.map(
        (issue) =>
          paragraph({
            children: [
              textRun({
                text: `${issue.key} - ${issue.summary}`,
                bold: true,
              }),
            ],
            bullet: {
              level: 0,
            },
          })
      ),
    ],
  };
}

export default releaseScopeSection;
