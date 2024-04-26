import { defaultProperties } from "../index";
import { flatMap, groupBy } from "lodash";
import { ExternalHyperlink, ISectionOptions, ISpacingProperties } from "docx";

import { textRun, paragraph } from "../lib/docx";

import GetAllSprint from "services/jira/board/get-all-sprint.interface";

function generateIssueParagraph(
  key: string,
  summary: string,
  bulletLevel: number,
  spacing?: ISpacingProperties
): ReturnType<typeof paragraph> {
  return paragraph({
    spacing,
    children: [
      new ExternalHyperlink({
        link: `https://manoel-martins.atlassian.net/browse/${key}`,
        children: [textRun({ style: "Hyperlink", text: key, bold: true })],
      }),
      textRun({ text: ` - ${summary}` }),
    ],
    bullet: { level: bulletLevel },
  });
}

function releaseSection(
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
            text: "2 Liberação",
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
            text: "A liberação da versão 0.0.17.61 do Comunix para o ambiente do WEB traz a implementação dos seguintes itens: ",
          }),
        ],
      }),
      ...flatMap(
        Object.entries(groupBy(lastSprintsBySquad[0].issues, "module")).map(
          ([key, issues]) => {
            const paragraphs = [];

            const title = paragraph({
              indent: {
                firstLine: `1.25cm`,
              },
              spacing: {
                after: 200,
                before: 200,
              },
              children: [
                textRun({
                  text: `Módulo ${key}`,
                  bold: true,
                }),
              ],
            });
            paragraphs.push(title);

            Object.entries(groupBy(issues, "parent.key")).forEach(
              ([parentKey, i]) => {
                paragraphs.push(
                  generateIssueParagraph(parentKey, i[0].parent.summary, 0, {
                    before: 240,
                    after: 120,
                  })
                );

                i.forEach((issue) => {
                  paragraphs.push(
                    generateIssueParagraph(issue.key, issue.summary, 1)
                  );
                });
              }
            );

            return paragraphs;
          }
        )
      ),
      paragraph({
        alignment: "center",
        spacing: {
          before: 240,
        },
        children: [
          textRun({
            text: "A versão está disponível para homologação em: ",
          }),
          new ExternalHyperlink({
            link: "https://homolog.comunix.com",
            children: [
              textRun({
                text: "https://homolog.comunix.com",
                style: "Hyperlink",
              }),
            ],
          }),
        ],
      }),
      paragraph({
        alignment: "center",
        children: [
          textRun({
            text: "A versão está disponível para produção em: ",
          }),
          new ExternalHyperlink({
            link: "https://adm.comunix.com",
            children: [
              textRun({
                text: "https://adm.comunix.com",
                style: "Hyperlink",
              }),
            ],
          }),
        ],
      }),
    ],
  };
}

export default releaseSection;
