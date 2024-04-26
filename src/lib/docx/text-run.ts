import { IRunOptions, TextRun } from "docx";

function textRun({ size = 22, font = "Eurostile LT Std", ...rest }: IRunOptions) {
  return new TextRun({ size, font, ...rest });
}

export default textRun
