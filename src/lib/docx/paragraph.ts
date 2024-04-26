import { IParagraphOptions, Paragraph } from "docx";

function paragraph({ ...rest }: IParagraphOptions) {
  return new Paragraph({ ...rest });
}

export default paragraph
