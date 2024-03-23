import { kv } from "@vercel/kv";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const isPosterSharing = true;
  const randomKvData = (await kv.hgetall("1LNXsqJ")) as Record<string, string>;
  const { image, pattern, prompt } = randomKvData || {};
  console.log(randomKvData);

  if (isPosterSharing) {
    return {
      image: (
        <div tw="flex w-full h-full bg-slate-700 text-white justify-center items-center">
          SHARE COVER
          {image ? (
            <img src={image} alt="randomImage" width={150} height={150} />
          ) : null}
        </div>
      ),
      buttons: [
        <Button key="launch" action="post" target="share">
          VIEW
        </Button>,
      ],
    };
  } else {
    return {
      image: (
        <div tw="flex w-full h-full bg-slate-700 text-white justify-center items-center">
          FRAME COVER
        </div>
      ),
      buttons: [
        <Button key="launch" action="post" target="game">
          LAUNCH
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
