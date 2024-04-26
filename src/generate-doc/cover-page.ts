import { Footer, Header, ImageRun, ISectionOptions } from "docx";
import { readFileSync } from "fs";

import { paragraph } from "../lib/docx";

function coverPageSection(): ISectionOptions {
  return {
    headers: {
      default: new Header({
        children: [
          paragraph({
            alignment: "center",

            children: [
              new ImageRun({
                data: readFileSync("./header.png"),
                transformation: {
                  width: 390.4879474069,
                  height: 110.2731921114,
                },
              }),
            ],
          }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          paragraph({
            // alignment: "center",

            children: [
              new ImageRun({
                data: readFileSync("./footer.png"),
                transformation: {
                  width: 759,
                  height: 139,
                },
                floating: {
                  horizontalPosition: { align: "center" },
                  verticalPosition: { align: "bottom" },
                },
              }),
            ],
          }),
        ],
      }),
    },
    children: [],
  };
}

export default coverPageSection;
