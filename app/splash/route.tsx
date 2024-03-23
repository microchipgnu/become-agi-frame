import { createFrames, Button } from "frames.js/next";
import { defaultImageOptions } from "@/app/config";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const isPosterSharing = false;

  if (isPosterSharing) {
    return {
      image: (
        <div tw="flex w-full h-full bg-[#020C17] text-white justify-center items-center">
          SHARE COVER
        </div>
      ),
      imageOptions: {
        ...defaultImageOptions,
      },
      buttons: [
        <Button key="b1" action="post" target="share">
          VIEW
        </Button>,
      ],
    };
  } else {
    return {
      image: (
        <div tw="flex w-full h-full bg-[#020C17] text-white justify-center items-center">
          FRAME COVER
        </div>
      ),
      imageOptions: {
        ...defaultImageOptions,
      },
      buttons: [
        <Button key="b1" action="post" target="game">
          LAUNCH
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
