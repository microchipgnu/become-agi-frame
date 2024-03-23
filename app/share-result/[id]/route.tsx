import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

export const handleShareRequest = frames(async (ctx) => {
  console.log("share ctx.message", ctx?.message);
  const { requesterFid } = ctx?.message || {};
  return {
    image: (
      <div tw="flex w-full h-full bg-slate-700 text-white justify-center items-center">
        {requesterFid} SHARE IMAGE 2-INFINITY
      </div>
    ),
    buttons: [
      <Button key="b1" action="post">
        SHARE BUTTON
      </Button>,
    ],
  };
});

export const GET = handleShareRequest;
export const POST = handleShareRequest;
