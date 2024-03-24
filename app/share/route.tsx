import { createFrames, Button } from "frames.js/next";
import { defaultImageOptions } from "@/app/config";
import { fetchByteDataById } from "@/core/db/queries";
import {
  abilityToChanceAndReward,
  byteStatusToColor,
} from "@/core/ui/train/screen";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const { requesterFid } = ctx?.message || {};
  const byteDbId = ctx?.searchParams?.bid;

  const { hash, position, status, accesses } = await fetchByteDataById(
    Number(byteDbId),
  );

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
              <span tw="text-3xl text-[#FF5C5C]">Inject Noise?</span>
            </div>
            <div tw="flex text-white mt-8">
              <span tw="text-3xl text-[#6D88C7]">
                By default both you and the user that interacts with your frame
                gain knowledge. When noise is injected the interacting user
                looses knowledge while you stay neutral.
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button
        key="b1"
        action="post"
        target={`share/result?injectNoise=true&bid=${byteDbId}`}
      >
        INJECT NOISE
      </Button>,
      <Button
        key="b2"
        action="post"
        target={`share/result?injectNoise=false&bid=${byteDbId}`}
      >
        MAINTAIN INTEGRITY
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
