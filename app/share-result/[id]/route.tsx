import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

export const handleShareRequest = frames(async (ctx) => {
  console.log("share ctx.message", ctx?.message);

  const { requesterFid } = ctx?.message || {};
  return {
    image: (
      <div tw="flex flex-col w-full h-full bg-slate-700 text-white justify-center items-center">
        <p>User {requesterFid}</p>
        <p>SHARE RESULT IMAGE</p>
      </div>
    ),
    buttons: [
      <Button key="b1" action="post">
        REFRESH
      </Button>,
      <Button key="b2" action="post">
        DOWNLOAD DATA
      </Button>,
    ],
  };
});

export const GET = handleShareRequest;
export const POST = handleShareRequest;
