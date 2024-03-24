import { createFrames, Button } from "frames.js/next";
import Benchmark from "@/core/ui/benchmark";
import { defaultImageOptions } from "@/app/config";
import { fetchBenchmark } from "@/core/db/queries";
import { fetchUserData } from "@/core/utils/fetch-social";

const frames = createFrames();

// Function to fetch all users data in parallel
async function fetchAllUsersData(users: any, token: string) {
  const promises = users.map((user: { fid: number }) =>
    fetchUserData(user.fid, token),
  );
  try {
    const results = await Promise.all(promises);

    return results;
  } catch (err) {
    console.error("An error occurred while fetching user data:", err);
  }
}

function combineUserInfo(topUsers: any, fetchResults: any[]) {
  return topUsers.map((user: { fid: any; rank: any; points: any }) => {
    const fetchData = fetchResults.find(
      (result) => result.data.fid === user.fid,
    );
    if (fetchData) {
      return {
        rank: user.rank,
        fid: user.fid,
        pfpUrl: fetchData.data.pfp_url,
        username: fetchData.data.username,
        points: user.points,
      };
    }
    // If no matching data is found, return some default or partial data
    return {
      rank: user.rank,
      fid: user.fid,
      pfpUrl: undefined,
      username: undefined,
      points: user.points,
    };
  });
}

const handleRequest = frames(async (ctx) => {
  const benchmark = await fetchBenchmark(ctx?.message?.requesterFid);
  const userData = await fetchAllUsersData(
    benchmark.topUsers,
    process.env.PINATA_API_KEY!,
  );
  const combinedData = combineUserInfo(benchmark.topUsers, userData!);

  const isUserTop10 = Number(benchmark?.userPosition?.rank) < 11;

  let loserData = undefined;

  if (!isUserTop10) {
    const userData = await fetchUserData(
      ctx?.message?.requesterFid,
      process.env.PINATA_API_KEY!,
    );

    loserData = {
      rank: benchmark?.userPosition?.rank,
      points: benchmark?.userPosition?.points,
      userData: userData?.data,
    };
  }

  return {
    image: (
      <Benchmark
        topUsers={combinedData || []}
        isUserTop10={isUserTop10}
        loserData={loserData}
        currentFid={ctx?.message?.requesterFid}
      />
    ),
    imageOptions: {
      ...defaultImageOptions,
    },
    buttons: [
      <Button key="b1" action="post" target="benchmark">
        REFRESH
      </Button>,
      <Button key="b1" action="post" target="game">
        TRAIN
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
