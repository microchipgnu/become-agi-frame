import { join } from "path";
import * as fs from "fs";
import { ImageResponse } from "next/server";

const fontRegularPath = join(process.cwd(), "./app/FiraCode-Regular.ttf");
const fontBoldPath = join(process.cwd(), "./app/FiraCode-Bold.ttf");
export const fontDataRegular = fs.readFileSync(fontRegularPath);
export const fontDataBold = fs.readFileSync(fontBoldPath);

export const defaultImageOptions = {
  aspectRatio: "1:1" as const,
  fonts: [
    {
      data: fontDataRegular,
      name: "Fira Code",
      style: "normal",
      weight: 400,
    },
    {
      data: fontDataBold,
      name: "Fira Code",
      style: "normal",
      weight: 700,
    },
  ],
} as any;
