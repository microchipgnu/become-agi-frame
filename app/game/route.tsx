import { createFrames, Button } from "frames.js/next";
import TrainInterface from "@/core/ui/train/screen";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  return {
    image: <TrainInterface />,
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button key="b1" action="post">
        BENCHMARK
      </Button>,
      <Button key="b2" action="post">
        TRAIN
      </Button>,
      <Button key="b3" action="post" target="share">
        DISTRIBUTE
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
