import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
        MAIN APP
      </div>
    ),
    buttons: [
      <Button key="benchmark" action="post">
        BENCHMARK
      </Button>,
      <Button key="train" action="post">
        TRAIN
      </Button>,
      <Button key="distribute" action="post">
        DISTRIBUTE
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
