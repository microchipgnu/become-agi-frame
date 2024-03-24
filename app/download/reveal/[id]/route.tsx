import { defaultImageOptions } from "@/app/config";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  console.log("share ctx.message", ctx?.message);

  const { requesterFid } = ctx?.message || {};
  return {
    image: (
      <div tw="flex flex-col w-full h-full bg-[#020C17] text-white justify-center items-center">
        <p>User {requesterFid}</p>
        <p>SHARE RESULT IMAGE</p>
      </div>
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post">
        HOME
      </Button>,
      <Button key="b2" action="post">
        BENCHMARKSS
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
