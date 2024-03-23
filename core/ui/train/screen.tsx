const GridItem = ({ isRed }: { isRed: boolean }) => (
  <div
    tw={`w-24 h-24 rounded ${isRed ? "bg-red-500" : "bg-blue-800"} m-0.5`}
  ></div>
);

const TrainInterface = () => {
  const gridRows = 8;
  const gridCols = 4;

  const grid = Array.from({ length: gridRows }, (_, rowIndex) =>
    Array.from({ length: gridCols }, (_, colIndex) => ({
      isRed: Math.random() < 0.3,
    })),
  );
  const progress = 23;

  return (
    <div tw="flex w-full h-full flex-col">
      <div tw="flex flex-row flex-grow w-full">
        <div tw="flex justify-between">
          {/* Dataset Grid */}
          <div tw="flex flex-col">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} tw="flex">
                {row.map((cell, cellIndex) => (
                  <GridItem key={cellIndex} isRed={cell.isRed} />
                ))}
              </div>
            ))}
          </div>

          {/* Data Stats */}
          <div tw="flex flex-col flex-grow border border-black justify-between">
            <div tw="flex">
              <div tw="flex flex-col mb-6">
                <div tw="flex flex-col mb-2">
                  <div tw="flex text-sm">DATASET</div>
                  <div tw="flex text-lg font-bold">b8...7d9772</div>
                </div>
                <div tw="flex flex-col mb-2">
                  <div tw="flex text-sm">INTEGRITY</div>
                  <div tw="flex text-lg font-bold">Pristine-100%</div>
                </div>
                <div tw="flex flex-col mb-2">
                  <div tw="flex text-sm">FRESH DATASET</div>
                  <div tw="flex text-lg font-bold">09:05:02</div>
                </div>
              </div>
            </div>

            <div tw="flex flex-col">
              <div tw="flex flex-col mb-2">
                <div tw="flex text-sm">BYTE</div>
                <div tw="flex text-lg font-bold">0x01</div>
              </div>
              <div tw="flex flex-col mb-2">
                <div tw="flex text-sm">TYPE</div>
                <div tw="flex text-lg font-bold">Perception</div>
              </div>
              <div tw="flex flex-col mb-2">
                <div tw="flex text-sm">RARITY</div>
                <div tw="flex text-lg font-bold">Common-30%</div>
              </div>
              <div tw="flex flex-col mb-2">
                <div tw="flex text-sm">INTEGRITY</div>
                <div tw="flex text-lg font-bold">Pristine-100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ProgressBar */}
      <div tw="p-12 w-full flex">
        <div tw="flex items-center w-full">
          <img
            src="https://wrpcd.net/cdn-cgi/image/fit=contain,f=auto,w=168/https%3A%2F%2Fi.imgur.com%2FhvaOPrU.jpg"
            tw="h-20 w-20 mr-4 rounded"
          />
          <div tw="flex bg-blue-800 h-full rounded items-center border flex-grow">
            <div
              tw="bg-blue-600 h-full rounded"
              style={{ width: `${progress}%` }}
            ></div>
            <div tw="ml-4 text-white">10%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainInterface;
