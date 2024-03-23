import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  console.log(ctx);

  if (!ctx.message) {
    return {
      image: (
        <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
          COVER
        </div>
      ),
      buttons: [<Button action="post">LAUNCH</Button>],
    };
  }

  return {
    image: (
      <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
        MAIN APP
      </div>
    ),
    buttons: [
      <Button action="post">BENCHMARK</Button>,
      <Button action="post">TRAIN</Button>,
      <Button action="post">DISTRIBUTE</Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
