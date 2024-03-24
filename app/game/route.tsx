import { defaultImageOptions } from "@/app/config";
import { sendEvent } from "@/core/analytics/pinata";
import { getOrCreateUserWithMap } from "@/core/db/queries";
import TrainInterface from "@/core/ui/train/screen";
import { fetchUserData } from "@/core/utils/fetch-social";
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
            "train",
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
          REFRESH
        </Button>,
      ],
    };
  }

  const { dataset, user } = await getOrCreateUserWithMap(
    ctx?.message.untrustedData.fid,
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
      <Button key="b1" action="post" target="benchmarks">
        BENCHMARKS
      </Button>,
      <Button key="b2" action="post" target="share">
        DISTRIBUTE
      </Button>,
      <Button key="b3" action="post">
        TRAIN
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
