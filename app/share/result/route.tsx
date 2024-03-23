import { createFrames, Button } from "frames.js/next";
import { fetchUser } from "@/core/db/queries";
import { defaultImageOptions } from "@/app/config";

const frames = createFrames();

export const handleShareRequest = frames(async (ctx) => {
  const injectNoise = ctx?.searchParams?.injectNoise;
  console.log("share ctx.message", ctx?.message);

  // create share request on db
  const user = await fetchUser(ctx?.message?.requesterFid);
  console.log("user", user);

  const { requesterFid } = ctx?.message || {};
  return {
    image: (
      <div tw="flex flex-col w-full h-full bg-[#020C17] text-white justify-center items-center">
        <p>User {requesterFid} DISTRIBUTING DATA</p>
        <p>INJECT NOISE: {injectNoise}</p>
      </div>
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
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
