import { defaultImageOptions } from "@/app/config";
import { getDownloadDataFromShareHash } from "@/core/db/actions";
import { byteStatusToColor } from "@/core/ui/train/screen";
import { fetchUserData } from "@/core/utils/fetch-social";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const shareHash = ctx?.searchParams?.id;
  const { requesterFid } = ctx?.message || {};

  if (!shareHash) {
    throw new Error("No shareHash found in URL");
  }

  const data = await getDownloadDataFromShareHash(shareHash);
  const sourceUserData = await fetchUserData(
    Number(data.sourceFid),
    process.env.PINATA_API_KEY!,
  );
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

  const integrity = byteStatusToColor(data?.accesses).name;

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
            <div tw="flex text-white">{data?.position}</div>
            <div tw="flex text-white mt-8">
              <span tw="text-[#6D88C7]">TYPE:</span> <span>?</span>
            </div>
            <div tw="flex text-white">
              <span tw="text-[#6D88C7]">RARITY:</span>{" "}
              <span tw="text-[#D7BB8E]">?</span>
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
      // <Button key="b1" action="post">
      //   REFRESH
      // </Button>,
      <Button
        key="b2"
        action="post"
        target={`download/result?hash=${shareHash}`}
      >
        DOWNLOAD DATA
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
