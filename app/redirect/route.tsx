import { Button, createFrames } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  console.log("redirect ctx.message", ctx.message);
  const { requesterFid } = ctx?.message || {};

  // TODO:(if the frame poster is sharing in the current round, show share else show game)
  const isPosterSharing = false;

  if (isPosterSharing) {
    return {
      image: (
        <div tw="flex w-full h-full bg-slate-700 text-white justify-center items-center">
          {requesterFid} SHARE PAGE1
        </div>
      ),
      buttons: [
        <Button key={"launch"} action="post" target={`share`}>
          SHARE BUTTON
        </Button>,
      ],
    };
  } else {
    return {
      image: (
        <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
          GAME PAGE1
        </div>
      ),
      buttons: [
        <Button key={"launch"} action="post" target={`game`}>
          GAME BUTTON
        </Button>,
        <Button
          key={"distribute"}
          action="link"
          target={
            "https://warpcast.com/~/compose?embeds%5B%5D=https%3A%2F%2Fframes.airstack.xyz%2Ftt&text=hihi%2C+see+what+tokens+are+trending+right+now+on+Farcaster"
          }
        >
          DISTRIBUTE
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
