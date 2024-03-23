import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  console.log("share ctx", ctx);
  return {
    image: (
      <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
        SHARE
      </div>
    ),
    buttons: [
      <Button key={"launch"} action="post">
        SHARE BUTTON
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;