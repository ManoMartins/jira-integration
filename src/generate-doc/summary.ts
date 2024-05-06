import {
  ISectionOptions, Paragraph, TableOfContents, TextRun,
} from 'docx';

function summarySection(): ISectionOptions {
  return {
    children: [
      new Paragraph({
        spacing: {
          after: 300,
          before: 300,
        },
        children: [
          new TextRun({
            text: 'Sumário',
            bold: true,
            size: 32,
            font: 'Arial',
          }),
        ],
      }),
      new TableOfContents('Summary', {
        hyperlink: true,
        headingStyleRange: '1-5',
      }),
    ],
  };
}

export default summarySection;
