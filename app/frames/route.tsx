import { createFrames, Button } from "frames.js/next";
import Train from "../../core/ui/train/screen";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  if (!ctx.message) {
    return {
      image: (
        <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
          COVER
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [<Button action="post">LAUNCH</Button>],
    };
  }

  return {
    image: <Train />,
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="post">BENCHMARKS</Button>,
      <Button action="post">TRAIN</Button>,
      <Button action="post">DISTRIBUTE</Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
