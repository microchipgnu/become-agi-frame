import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

export const handleShareRequest = frames(async (ctx) => {
  console.log("share ctx.message", ctx?.message);
  const { requesterFid } = ctx?.message || {};
  return {
    image: (
      <div tw="flex w-full h-full bg-slate-700 text-white justify-center items-center">
        SHARE PAGE IMAGE
      </div>
    ),
    buttons: [
      <Button key={"launch"} action="post">
        SHARE BUTTON
      </Button>,
    ],
  };
});

export const GET = handleShareRequest;
export const POST = handleShareRequest;
