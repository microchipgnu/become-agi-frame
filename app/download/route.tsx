import { defaultImageOptions } from "@/app/config";
import { getDownloadDataFromShareHash } from "@/core/db/actions";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const shareHash = ctx?.searchParams?.id;
  const { requesterFid } = ctx?.message || {};

  if (!shareHash) {
    throw new Error("No shareHash found in URL");
  }

  const data = await getDownloadDataFromShareHash(shareHash);
  console.log("download data", data);
  // exampleData = {
  //   id: 2,
  //   position: '0x01',
  //   status: 'Decision Making',
  //   hash: '8f92dc0b121ddc36c6b9a95c679e7f60e1345ae1bb7087aeb5652e16fbc58f3e',
  //   accesses: 6,
  //   created_at: new Date('2024-03-24T06:16:26.000Z'),
  //   sourceFid: 281260,
  //   hasNoise: true
  // }
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
      <div tw="flex w-full h-full bg-[#020C17] text-white justify-center items-center">
        {requesterFid} SHARE IMAGE 2-INFINITY
      </div>
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post">
        SHARE BUTTON
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
