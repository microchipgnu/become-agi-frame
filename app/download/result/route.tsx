import { createFrames, Button } from "frames.js/next";
import { fetchSingleData, getOrCreateUserWithMap } from "@/core/db/queries";
import { APP_URL, defaultImageOptions } from "@/app/config";
import { createShareHash } from "@/core/db/actions";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const injectNoise = ctx?.searchParams?.injectNoise === "true";
  const { requesterFid } = ctx?.message || {};

  const { dataset } = await getOrCreateUserWithMap(ctx?.message?.requesterFid);
  const { hash, position } = dataset.accessedRow;

  const shareHash = await createShareHash({
    sourceFid: requesterFid,
    gameHash: hash,
    position,
    hasNoise: injectNoise,
  });

  // Manually encode the URL part that needs to be a value of the embeds[] parameter
  const encodedUrlValue = encodeURIComponent(`${APP_URL}/share/${shareHash}`);

  // Construct the full URL and manually encode the brackets for the embeds[] parameter
  const shareFrameUrl = `https://warpcast.com/~/compose?embeds%5B%5D=${encodedUrlValue}`;

  return {
    accepts: [
      {
        id: "farcaster",
        version: "vNext",
      },
      {
        id: "xmtp",
        version: "vNext",
      },
    ],
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
      <Button key="b1" action="link" target={shareFrameUrl}>
        DISTRIBUTE
      </Button>,
      <Button key="b2" action="post" target="game">
        HOME
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
