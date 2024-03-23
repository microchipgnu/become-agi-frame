import { createFrames, Button } from "frames.js/next";
import TrainInterface from "@/core/ui/train/screen";
import { getOrCreateUserWithMap } from "@/core/db/queries";
import { defaultImageOptions } from "@/app/config";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  if (!ctx.message) {
    return {
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

  return {
    image: <TrainInterface dataset={dataset} user={user} />,
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post" target="benchmark">
        BENCHMARK
      </Button>,
      <Button key="b2" action="post">
        TRAIN
      </Button>,
      <Button key="b3" action="post" target="share">
        DISTRIBUTE
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
