import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

export const handleShareRequest = frames(async (ctx) => {
  const injectNoise = ctx?.searchParams?.injectNoise;
  console.log("share ctx.message", ctx?.message);

  const { requesterFid } = ctx?.message || {};
  return {
    image: (
      <div tw="flex flex-col w-full h-full bg-slate-700 text-white justify-center items-center">
        <p>User {requesterFid} DISTRIBUTING DATA</p>
        <p>INJECT NOISE: {injectNoise}</p>
      </div>
    ),
    buttons: [
      <Button
        key="b1"
        action="link"
        target={`https://warpcast.com/~/compose?embeds%5B%5D=https%3A%2F%2Fframes.airstack.xyz%2Ftt&text=hihi%2C+see+what+tokens+are+trending+right+now+on+Farcaster`}
      >
        DISTRIBUTE
      </Button>,
      <Button key="b2" action="post" target="game">
        HOME
      </Button>,
    ],
  };
});

export const GET = handleShareRequest;
export const POST = handleShareRequest;
