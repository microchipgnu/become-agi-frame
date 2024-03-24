import { createFrames, Button } from "frames.js/next";
import TrainInterface from "@/core/ui/train/screen";
import { getOrCreateUserWithMap } from "@/core/db/queries";
import { defaultImageOptions } from "@/app/config";
import { fetchUserData } from "@/core/utils/fetch-social";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  if (!ctx.message) {
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
        <div tw="w-full h-full bg-[#020C17] text-white justify-center items-center">
          NO DATA
        </div>
      ),
      imageOptions: {
        ...defaultImageOptions,
      },
      buttons: [
        <Button key="b1" action="post">
          LAUNCH
        </Button>,
      ],
    };
  }

  const { dataset, user } = await getOrCreateUserWithMap(
    ctx?.message.requesterFid,
  );

  const userData = await fetchUserData(user.fid, process.env.PINATA_API_KEY!);

  return {
    image: (
      <TrainInterface
        dataset={dataset}
        user={{ ...user, userData: userData?.data }}
      />
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post" target="benchmark">
        BENCHMARKS
      </Button>,
      <Button key="b3" action="post" target="share">
        DISTRIBUTE
      </Button>,
      <Button key="b2" action="post">
        TRAIN
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
