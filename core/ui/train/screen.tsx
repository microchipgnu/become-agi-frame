import { incrementAccesses, updatePoints } from "@/core/db/queries";

const byteStatusToColor = (numberAccesses: number) => {
  if (numberAccesses === 0) {
    return { color: "#04162A", name: "pristine", reward: 1 }; // 100%
  } else if (numberAccesses === 1) {
    return { color: "#051D38", name: "optimal", reward: 0.5 };
  } else if (numberAccesses === 2) {
    return {
      color: "#062241",
      name: "diminished",
      reward: 0.25,
    };
  } else if (numberAccesses === 3) {
    return {
      color: "#07294F",
      name: "compromised",
      reward: 0.125,
    };
  } else if (numberAccesses === 4) {
    return {
      color: "#083262",
      name: "degraded",
      reward: 0.0625,
    };
  } else if (numberAccesses === 5) {
    return {
      color: "#09376C",
      name: "corrupted",
      reward: 0.03125,
    };
  } else {
    return {
      color: "#09376C",
      name: "corrupted",
      reward: 0.03125,
    };
  }
};

const abilityToChanceAndReward = {
  Perception: { chance: 40, reward: 1, rarity: "Common" },
  "Pattern Recognition": { chance: 10, reward: 2, rarity: "Uncommon" },
  "Decision Making": { chance: 10, reward: 2, rarity: "Uncommon" },
  Noise: { chance: 10, reward: -10, rarity: "Uncommon" },
  "Problem-Solving": { chance: 10, reward: 3, rarity: "Rare" },
  "Emotion Recognition": { chance: 10, reward: 3, rarity: "Rare" },
  Creativity: { chance: 4.5, reward: 4, rarity: "Very Rare" },
  "Adaptive Learning": { chance: 4.5, reward: 4, rarity: "Very Rare" },
  Strategy: { chance: 1, reward: 5, rarity: "Legendary" },
};

const GridItem = ({
  isRed,
  isCurrentPosition,
  accesses,
}: {
  isRed: boolean;
  isCurrentPosition: boolean;
  accesses: number;
}) => {
  const color = byteStatusToColor(accesses);
  return (
    <div
      tw={`w-24 h-24 rounded-lg ${isRed ? "bg-[#FF5C5C]" : `bg-[${color.color}]`} m-0.5 flex items-center justify-center ml-2`}
    >
      {isCurrentPosition && (
        <div tw="w-10 h-10 rounded-full bg-[#D6FA58]"></div>
      )}
    </div>
  );
};

const Divider = ({
  orientation = "horizontal",
  color = "gray-200",
  thickness = "1",
}) => {
  // Classes for the divider based on props
  const baseClass = `bg-${color}`;
  const sizeClass =
    orientation === "horizontal"
      ? `h-${thickness} w-full`
      : `w-${thickness} h-full`;

  return <div tw={`${baseClass} ${sizeClass}`}></div>;
};

const TrainInterface = ({ dataset, user }: { dataset: any; user: any }) => {
  if (!dataset || !user) {
    return (
      <div tw="w-full h-full bg-[#020C17] text-white justify-center items-center">
        NO DATA
      </div>
    );
  }
  const userCurrentRow = dataset?.accessedRow;
  const rows = dataset?.rows;
  const gridRows = 8;
  const gridCols = 4;

  incrementAccesses(userCurrentRow?.id);

  const points =
    byteStatusToColor(userCurrentRow?.accesses).reward *
    // @ts-ignore
    abilityToChanceAndReward[userCurrentRow?.status].reward;

  updatePoints(
    user.fid,
    userCurrentRow.status === "Noise" ? 10 : points,
    userCurrentRow.status === "Noise" ? "decrement" : "increment",
  );

  let userPoints =
    userCurrentRow.status === "Noise" ? user.points - 10 : user.points + points;

  const grid = Array.from({ length: gridRows }, () =>
    Array.from({ length: gridCols }, () => ({
      isNoise: false, // default value
      isCurrentPosition: false, // default value
      accesses: 0,
    })),
  );

  rows?.forEach(
    (row: {
      id: number;
      status: string;
      position: string;
      accesses: number;
    }) => {
      const rowIndex = Math.floor((row.id - 1) / gridCols);
      const colIndex = (row.id - 1) % gridCols;

      // @ts-ignore
      grid[rowIndex][colIndex].isNoise = row?.status === "Noise";
      // @ts-ignore
      grid[rowIndex][colIndex].isCurrentPosition =
        row?.position === userCurrentRow?.position;
      // @ts-ignore
      grid[rowIndex][colIndex].accesses = row?.accesses || 0;
    },
  );

  return (
    <div tw="flex w-full h-full flex-col bg-[#020C17]">
      <div tw="flex flex-row flex-grow w-full items-center justify-between px-12">
        <div tw="flex justify-between">
          <div tw="flex flex-col">
            {grid?.map((row, rowIndex) => (
              <div key={rowIndex} tw="flex mt-2">
                {row?.map((cell, cellIndex) => (
                  <GridItem
                    key={cellIndex}
                    accesses={cell?.accesses || 0}
                    isRed={cell?.isNoise}
                    isCurrentPosition={cell?.isCurrentPosition}
                  />
                ))}
              </div>
            ))}
          </div>

          <div tw="flex flex-col flex-grow border border-black justify-between ml-12 w-[572px]">
            <div tw="flex flex-col">
              <div tw="flex flex-col mb-6">
                <div tw="flex flex-col mb-2">
                  <div tw="flex items-center justify-between">
                    <div tw="flex text-3xl text-[#6D88C7]">DATASET</div>
                    <div tw="flex text-3xl text-white">
                      {`${userCurrentRow?.hash?.slice(0, 4)}...${userCurrentRow?.hash?.slice(-4)}` ||
                        ""}
                    </div>
                  </div>
                  <Divider color="[#09376C]" />
                </div>
                <div tw="flex flex-col mb-2 mt-8">
                  <div tw="flex items-center justify-between">
                    <div tw="flex text-3xl text-[#6D88C7]">FRESH DATASET</div>
                    <div tw="flex text-3xl text-[#6D88C7]">09:05:02</div>
                  </div>
                </div>
              </div>
            </div>

            <div tw="flex flex-col">
              <div tw="flex flex-col mb-2">
                <div tw="flex items-center justify-between">
                  <div tw="flex text-3xl text-[#6D88C7]">BYTE</div>
                  <div tw="flex text-3xl text-white">
                    {userCurrentRow?.position}
                  </div>
                </div>
                <Divider color="[#09376C]" />
              </div>
              <div tw="flex flex-col mb-2 mt-8">
                <div tw="flex items-center justify-between">
                  <div tw="flex text-3xl text-[#6D88C7] justify-between">
                    TYPE
                  </div>
                  <div
                    tw={`flex text-3xl ${userCurrentRow?.status === "Noise" ? "text-[#FF5C5C]" : "text-[#4FCC4E]"}`}
                  >
                    {userCurrentRow?.status}
                  </div>
                </div>
              </div>
              <div tw="flex flex-col mb-2">
                <div tw="flex items-center justify-between">
                  <div tw="flex text-3xl text-[#6D88C7] justify-between">
                    RARITY
                  </div>
                  <div tw="flex text-3xl text-[#6D88C7]">
                    <span tw="text-[#D7BB8E]">
                      {/** @ts-ignore */}
                      {abilityToChanceAndReward[userCurrentRow.status].rarity}
                    </span>
                    =
                    <span tw="text-[#D6FA58]">
                      {/** @ts-ignore */}
                      {abilityToChanceAndReward[userCurrentRow.status].chance}%
                    </span>
                  </div>
                </div>
              </div>
              <div tw="flex flex-col mb-12">
                <div tw="flex items-center justify-between">
                  <div tw="flex text-3xl text-[#6D88C7] justify-between">
                    INTEGRITY
                  </div>
                  <div tw="flex text-3xl text-[#6D88C7]">
                    {userCurrentRow.status === "Noise" ? (
                      <div tw="flex">null</div>
                    ) : (
                      <div tw="flex">
                        <span tw="text-[#D7BB8E] capitalize">
                          {byteStatusToColor(userCurrentRow.accesses).name}
                        </span>
                        =
                        <span tw="text-[#D6FA58]">
                          {byteStatusToColor(userCurrentRow.accesses).reward *
                            100}
                          %
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Divider color="[#09376C]" />

              <div tw="flex flex-col mb-2 mt-12">
                <div tw="flex items-center justify-between">
                  <div tw="flex text-3xl text-[#6D88C7] justify-between">
                    UPDATE
                  </div>
                  <div tw="flex text-3xl text-[#6D88C7]">
                    {userCurrentRow.status === "Noise" ? (
                      <div tw="flex text-[#FF5C5C]">- 10%</div>
                    ) : (
                      <div tw="flex text-[#4FCC4E]">+ {points}%</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ProgressBar */}
      <div tw="p-12 w-full flex">
        <div tw="flex items-center w-full">
          {user?.userData?.pfp_url ? (
            <img
              src={user.userData.pfp_url}
              alt="user"
              tw="h-20 w-20 mr-4 rounded"
            />
          ) : (
            <div tw="h-20 w-20 mr-4 rounded bg-[#09376C]"></div>
          )}
          <div tw="flex h-full rounded items-center border flex-grow bg-[#051D38]">
            <div
              tw="bg-[#09376C] h-full rounded "
              style={{ width: `${userPoints}%` }}
            ></div>
            <div tw="ml-4 text-white flex text-[#D7BB8E] text-3xl">
              {userPoints.toString()}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainInterface;
