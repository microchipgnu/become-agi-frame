import { createFrames, Button } from "frames.js/next";
import Benchmark from "@/core/ui/benchmark";
import { defaultImageOptions } from "@/app/config";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  return {
    image: <Benchmark />,
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post" target="game">
        HOME
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
