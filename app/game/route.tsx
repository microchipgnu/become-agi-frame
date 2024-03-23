import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw="flex w-full h-full bg-slate-700 text-white justify-center items-center">
        GAME IMAGE 2-INFINITY
      </div>
    ),
    buttons: [
      <Button key={"launch"} action="post">
        GAME BUTTON
      </Button>,
      <Button key={"distribute"} action="post" target={"share"}>
        DISTRIBUTE
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
