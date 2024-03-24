import { createFrames, Button } from "frames.js/next";
import { defaultImageOptions } from "@/app/config";
import { vercelURL } from "../utils";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const isPosterSharing = false;

  if (isPosterSharing) {
    return {
      image: (
        <div tw="flex w-full h-full bg-[#020C17] text-white justify-center items-center">
          VIEW DATA COVER
        </div>
      ),
      imageOptions: {
        ...defaultImageOptions,
      },
      buttons: [
        <Button key="b1" action="post" target="share">
          VIEW DATA
        </Button>,
      ],
    };
  } else {
    return {
      image: `${vercelURL()}/assets/cover.png`,
      imageOptions: {
        ...defaultImageOptions,
      },
      buttons: [
        <Button key="b1" action="post" target="game">
          LAUNCH
        </Button>,
        <Button key="b2" action="post" target="benchmarks">
          BENCHMARKS
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
