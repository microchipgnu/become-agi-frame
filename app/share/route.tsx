import { createFrames, Button } from "frames.js/next";
import { defaultImageOptions } from "@/app/config";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  console.log("share ctx.message", ctx?.message);
  const { requesterFid } = ctx?.message || {};
  return {
    image: (
      <div tw="flex flex-col w-full h-full bg-[#020C17] text-white justify-center items-center">
        <p>User {requesterFid}</p>
        <p>SHARE PAGE IMAGE</p>
      </div>
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post" target="share/result?injectNoise=true">
        INJECT NOISE
      </Button>,
      <Button key="b2" action="post" target="share/result?injectNoise=false">
        MAINTAIN INTEGRITY
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
