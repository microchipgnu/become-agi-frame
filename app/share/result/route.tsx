import { createFrames, Button } from "frames.js/next";
import { fetchByteDataById, getOrCreateUserWithMap } from "@/core/db/queries";
import { APP_URL, defaultImageOptions } from "@/app/config";
import { createShareHash } from "@/core/db/actions";
import {
  abilityToChanceAndReward,
  byteStatusToColor,
} from "@/core/ui/train/screen";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const injectNoise = ctx?.searchParams?.injectNoise === "true";
  const byteDbId = ctx?.searchParams?.bid;

  const { requesterFid } = ctx?.message || {};

  const { hash, position, accesses, status } = await fetchByteDataById(
    Number(byteDbId),
  );

  const shareHash = await createShareHash({
    sourceFid: requesterFid,
    gameHash: hash,
    position,
    hasNoise: injectNoise,
  });

  // Manually encode the URL part that needs to be a value of the embeds[] parameter
  const encodedUrlValue = encodeURIComponent(
    `${APP_URL}/download?id=${shareHash}`,
  );

  // Construct the full URL and manually encode the brackets for the embeds[] parameter
  const shareFrameUrl = `https://warpcast.com/~/compose?embeds%5B%5D=${encodedUrlValue}`;

  // @ts-ignore
  const rarity = abilityToChanceAndReward[status].rarity;
  const integrity = byteStatusToColor(accesses).name;

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
      <div tw="flex w-full h-full flex-col bg-[#020C17]">
        <div tw="flex flex-col flex-grow justify-between border border-[#D6FA58] p-24">
          <div tw="flex flex-col">
            <div tw="flex text-white">{position}</div>
            <div tw="flex text-white mt-8">
              <span tw="text-[#6D88C7]">TYPE:</span> <span>{status}</span>
            </div>
            <div tw="flex text-white">
              <span tw="text-[#6D88C7]">RARITY:</span>{" "}
              <span tw="text-[#D7BB8E]">{rarity}</span>
            </div>
            <div tw="flex text-white">
              <span tw="text-[#6D88C7]">INTEGRITY:</span>{" "}
              <span tw="text-[#D7BB8E] capitalize">{integrity}</span>
            </div>
          </div>
          <div tw="flex flex-col">
            <div tw="flex text-white">
              <span tw="text-3xl text-white">Ready to distribute!</span>
            </div>
          </div>
        </div>
      </div>
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post" target="game">
        TRAIN
      </Button>,
      <Button key="b2" action="link" target={shareFrameUrl}>
        DISTRIBUTE
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
