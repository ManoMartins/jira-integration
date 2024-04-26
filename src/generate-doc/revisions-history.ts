import {
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
  convertInchesToTwip,
  ISectionOptions,
} from "docx";

import { textRun, paragraph } from "../lib/docx";

function cellHeader(text: string) {
  return new TableCell({
    shading: {
      type: "pct65",
      color: "#FF9000",
      fill: "#FF9000",
    },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      paragraph({
        alignment: "center",
        children: [
          textRun({
            text,
            bold: true,
          }),
        ],
      }),
    ],
  });
}

function createHeader() {
  return new TableRow({
    tableHeader: true,
    children: [
      cellHeader("VERSÃO"),
      cellHeader("RESPONSÁVEL"),
      cellHeader("DESCRIÇÃO"),
      cellHeader("DATA"),
    ],
  });
}

function cell(text: string) {
  return new TableCell({
    children: [
      paragraph({
        alignment: "center",
        children: [
          textRun({
            text,
          }),
        ],
      }),
    ],
  });
}

function createRow(
  version: string,
  responsible: string,
  description: string,
  date: Date
) {
  return new TableRow({
    children: [
      cell(version),
      cell(responsible),
      cell(description),
      cell(date.toLocaleDateString()),
    ],
  });
}

function revisionsHistorySection(): ISectionOptions {
  return {
    children: [
      paragraph({
        alignment: "center",
        spacing: {
          after: 300,
          before: 200,
        },
        children: [
          textRun({
            text: "HISTÓRICO DE REVISÕES",
            size: 26,
            bold: true,
          }),
        ],
      }),
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        margins: {
          top: convertInchesToTwip(0.1),
          bottom: convertInchesToTwip(0.1),
          right: convertInchesToTwip(0.1),
          left: convertInchesToTwip(0.1),
        },
        rows: [
          createHeader(),
          createRow("1", "João", "Criação do sistema", new Date(2022, 1, 1)),
        ],
      }),
    ],
  };
}

export default revisionsHistorySection;
