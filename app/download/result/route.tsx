import { defaultImageOptions } from "@/app/config";
import { sendEvent } from "@/core/analytics/pinata";
import { getDownloadDataFromShareHash } from "@/core/db/actions";
import { fetchByteDataById, updatePoints } from "@/core/db/queries";
import {
  NOISE_SLASH,
  abilityToChanceAndReward,
  byteStatusToColor,
} from "@/core/ui/train/screen";
import { fetchUserData } from "@/core/utils/fetch-social";
import { getFrameMessage } from "frames.js";
import { openframes } from "frames.js/middleware";
import { Button, createFrames } from "frames.js/next";

const frames = createFrames({
  middleware: [
    openframes({
      clientProtocol: {
        id: "farcaster",
        version: "vNext",
      },
      handler: {
        isValidPayload: (body: JSON) => true,
        getFrameMessage: async (body: JSON) => {
          sendEvent(
            "download-data",
            {
              ...body,
            },
            "becomeagi",
          );

          return {
            ...body,
          };
        },
      },
    }),
  ],
});

const handleRequest = frames(async (ctx) => {
  const hash = ctx?.searchParams?.hash;
  const { fid } = ctx?.message?.untrustedData || {};

  const data = await getDownloadDataFromShareHash(hash!);
  const sourceUserData = await fetchUserData(
    Number(data.sourceFid),
    process.env.PINATA_API_KEY!,
  );
  const { position, accesses, status } = await fetchByteDataById(data.id);

  // @ts-ignore
  const rarity = abilityToChanceAndReward[status].rarity;
  const integrity = byteStatusToColor(accesses).name;

  const points =
    byteStatusToColor(accesses).reward *
    // @ts-ignore
    abilityToChanceAndReward[status].reward;

  // TODO: finish like, follow logic before incrementing and decrementing the points
  updatePoints(
    fid,
    status === "Noise" ? NOISE_SLASH : points,
    status === "Noise" ? "decrement" : "increment",
  );

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
      <div
        tw={`flex w-full h-full flex-col ${data.hasNoise ? "bg-[#FF5C5C]" : "bg-[#4FCC4E]"}`}
      >
        <div tw="flex flex-col flex-grow justify-between border bg-[#020C17] m-12 p-12 rounded-xl">
          <div tw="flex flex-col">
            <div tw="flex text-white">{data?.position}</div>
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
            <div tw="flex text-white">
              <span tw="text-[#6D88C7]">SOURCE:</span>{" "}
              <span tw="text-[#D7BB8E]">@{sourceUserData?.data?.username}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post" target="benchmarks">
        BENCHMARKS
      </Button>,
      <Button key="b2" action="post" target="game">
        TRAIN
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
