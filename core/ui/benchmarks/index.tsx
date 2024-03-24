const Benchmarks = ({
  topUsers,
  isUserTop10,
  loserData,
  currentFid,
}: {
  topUsers: any;
  isUserTop10: boolean;
  loserData: any;
  currentFid: number;
}) => {
  return (
    <div tw="flex flex-col w-full h-full bg-[#020C17] p-20">
      <div tw="flex justify-between items-center w-full h-12 px-4">
        <div tw="flex text-[#6D88C7]">MODEL</div>
        <div tw="flex text-[#6D88C7]">PROGRESS</div>
      </div>
      <div tw="flex border border-[#09376C] my-4" />
      <div tw="flex flex-col w-full h-full">
        {topUsers.map(
          (
            data: {
              fid: number;
              points: number;
              rank: string;
              username: string;
              pfpUrl: string;
            },
            index: number,
          ) => (
            <div
              key={`data-${index}`}
              tw="flex justify-between items-center w-full h-12 my-2"
            >
              <div tw="flex">
                <div tw="flex text-[#6D88C7]">
                  {data.rank.toString().padStart(3, "0")}
                </div>
                <img src={data.pfpUrl} alt="user" tw="w-12 h-12 rounded ml-8" />
                <div
                  tw={`flex ml-8 ${currentFid === data.fid ? "text-white" : "text-[#D7BB8E]"}`}
                >
                  @{data.username}
                </div>
              </div>
              <div tw="flex text-[#D6FA58]">
                {Math.min(Math.round(data.points), 100)}%
              </div>
            </div>
          ),
        )}
        {!isUserTop10 && loserData && (
          <div tw="flex border border-[#09376C] my-4" />
        )}
        {!isUserTop10 && loserData && (
          <div tw="flex justify-between items-center w-full h-12 my-2">
            <div tw="flex">
              <div tw="flex text-[#6D88C7]">
                {loserData?.rank.toString().padStart(3, "0")}
              </div>
              <img
                src={loserData?.userData?.pfp_url}
                alt="loser"
                tw="w-12 h-12 rounded ml-8"
              />
              <div tw="flex text-white font-bold ml-8">
                @{loserData?.userData?.username}
              </div>
            </div>
            <div tw="flex text-[#D6FA58]">{loserData?.points}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Benchmarks;
