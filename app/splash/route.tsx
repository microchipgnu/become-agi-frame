import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
        COVER
      </div>
    ),
    buttons: [
      <Button key={"launch"} action="post" target={"redirect"}>
        LAUNCH
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
